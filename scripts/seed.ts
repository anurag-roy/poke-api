/**
 * One-shot seed: load index.json + {id}.json from the pokeapi R2 bucket into D1.
 *
 * Objects are read from the bucket's public R2.dev host (same content as the
 * `pokeapi` R2 bucket). Writes go through `wrangler d1 execute`.
 *
 * Usage:
 *   npm run seed          # local D1
 *   npm run seed:remote   # remote D1
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import type { Pokemon } from '../src/types';

type IndexEntry = {
  id: number;
  name: string;
};

/** Public host for the `pokeapi` R2 bucket. */
const PUBLIC_BASE = 'https://pub-460ada4f152c4135a7ec0881a2cb1330.r2.dev';
const BATCH_SIZE = 25;
const MAX_RETRIES = 3;

function sqlString(value: string): string {
  return `'${value.replaceAll("'", "''")}'`;
}

function executeSql(sql: string, remote: boolean) {
  const dir = mkdtempSync(join(tmpdir(), 'poke-seed-'));
  const file = join(dir, 'batch.sql');
  writeFileSync(file, sql);

  try {
    let lastError: unknown;
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        execFileSync(
          'npx',
          [
            'wrangler',
            'd1',
            'execute',
            'poke-api',
            remote ? '--remote' : '--local',
            '--file',
            file,
          ],
          {
            stdio: ['ignore', 'pipe', 'inherit'],
            env: { ...process.env, CI: '1' },
          },
        );
        return;
      } catch (error) {
        lastError = error;
        console.warn(`  d1 execute failed (attempt ${attempt}/${MAX_RETRIES}), retrying…`);
      }
    }
    throw lastError;
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

async function loadJson<T>(key: string): Promise<T> {
  const res = await fetch(`${PUBLIC_BASE}/${key}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${key}: ${res.status}`);
  }
  return (await res.json()) as T;
}

async function main() {
  const remote = process.argv.includes('--remote');

  console.log(`Loading index.json from pokeapi R2…`);
  const index = await loadJson<IndexEntry[]>('index.json');
  console.log(
    `Found ${index.length} Pokémon. Upserting into D1 (${remote ? 'remote' : 'local'})…`,
  );

  for (let i = 0; i < index.length; i += BATCH_SIZE) {
    const slice = index.slice(i, i + BATCH_SIZE);
    const details = await Promise.all(
      slice.map((entry) => loadJson<Pokemon>(`${entry.id}.json`)),
    );

    const statements = details.map(
      (detail) =>
        `INSERT INTO pokemon (id, name, detail) VALUES (${detail.id}, ${sqlString(detail.name.toLowerCase())}, ${sqlString(JSON.stringify(detail))})
         ON CONFLICT(id) DO UPDATE SET name = excluded.name, detail = excluded.detail;`,
    );

    executeSql(statements.join('\n'), remote);
    console.log(`  upserted ${Math.min(i + BATCH_SIZE, index.length)} / ${index.length}`);
  }

  executeSql(
    `INSERT INTO meta (key, value)
     SELECT 'potd_id', CAST(id AS TEXT) FROM pokemon
     WHERE NOT EXISTS (SELECT 1 FROM meta WHERE key = 'potd_id')
     ORDER BY id ASC
     LIMIT 1;`,
    remote,
  );

  console.log('Done.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
