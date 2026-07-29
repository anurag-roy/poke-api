import type { Pokemon } from './types';

type PokemonRow = {
  detail: string;
};

export async function listPokemon(
  db: D1Database,
  offset: number,
  limit: number,
): Promise<Pokemon[]> {
  const { results } = await db
    .prepare(
      `SELECT detail FROM pokemon
       WHERE id >= ? AND id < ?
       ORDER BY id ASC`,
    )
    .bind(offset, offset + limit)
    .all<PokemonRow>();

  return results.map((row) => JSON.parse(row.detail) as Pokemon);
}

export async function getPokemonByIdOrName(
  db: D1Database,
  idOrName: number | string,
): Promise<Pokemon | null> {
  const row =
    typeof idOrName === 'number'
      ? await db
          .prepare('SELECT detail FROM pokemon WHERE id = ?')
          .bind(idOrName)
          .first<PokemonRow>()
      : await db
          .prepare('SELECT detail FROM pokemon WHERE name = ? COLLATE NOCASE')
          .bind(idOrName)
          .first<PokemonRow>();

  return row ? (JSON.parse(row.detail) as Pokemon) : null;
}

export async function getPokemonOfTheDay(db: D1Database): Promise<Pokemon | null> {
  const potd = await db
    .prepare(`SELECT value FROM meta WHERE key = 'potd_id'`)
    .first<{ value: string }>();

  if (!potd?.value) return null;

  return getPokemonByIdOrName(db, Number(potd.value));
}

export async function setPokemonOfTheDay(db: D1Database): Promise<void> {
  const countRow = await db
    .prepare('SELECT COUNT(*) AS count FROM pokemon')
    .first<{ count: number }>();

  const count = countRow?.count ?? 0;
  if (count === 0) return;

  const offset = Math.floor(Math.random() * count);
  const pick = await db
    .prepare('SELECT id FROM pokemon ORDER BY id ASC LIMIT 1 OFFSET ?')
    .bind(offset)
    .first<{ id: number }>();

  if (!pick) return;

  await db
    .prepare(
      `INSERT INTO meta (key, value) VALUES ('potd_id', ?)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
    )
    .bind(String(pick.id))
    .run();
}
