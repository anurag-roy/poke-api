/**
 * Append National Dex entries after 905: fetch from PokéAPI, composite
 * official-artwork onto a lightened dominant-color background, write WebP + JSON
 * under data/generated/, and merge into a full index.json (existing R2 + new).
 *
 * Usage:
 *   npm run generate:pokemon
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import PQueue from 'p-queue';
import sharp from 'sharp';
import type { Pokemon } from '../src/types';

const AFTER_ID = 905;
const LIGHTNESS_FACTOR = 0.4;
const PUBLIC_BASE = 'https://pub-460ada4f152c4135a7ec0881a2cb1330.r2.dev';
const POKEAPI = 'https://pokeapi.co/api/v2';
const ARTWORK_URL = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'data', 'generated');

/** Fair-use concurrency for pokeapi.co (rate limits removed; still be polite). */
const queue = new PQueue({ concurrency: 4, interval: 1000, intervalCap: 8 });

type NamedApiResource = { name: string; url: string };
type NameEntry = { name: string; language: NamedApiResource };
type FlavorEntry = {
  flavor_text: string;
  language: NamedApiResource;
  version: NamedApiResource;
};
type GenusEntry = { genus: string; language: NamedApiResource };
type EffectEntry = { effect: string; language: NamedApiResource };

type IndexSummary = {
  id: number;
  name: string;
  genus: string;
  description: string;
  imageUrl: string;
  types: string[];
  color: string;
};

const jsonCache = new Map<string, unknown>();

function unescapeFlavor(text: string): string {
  return text.replace(/[\u0000-\u001F\u007F-\u009F]/g, ' ').trim();
}

function findEn<T extends { language: NamedApiResource }>(entries: T[]): T | undefined {
  return entries.find((e) => e.language.name === 'en');
}

function rgbToHex(r: number, g: number, b: number): string {
  const h = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, '0');
  return `#${h(r)}${h(g)}${h(b)}`;
}

function lighten([r, g, b]: [number, number, number]): [number, number, number] {
  const f = LIGHTNESS_FACTOR;
  return [r * f + 255 * (1 - f), g * f + 255 * (1 - f), b * f + 255 * (1 - f)];
}

async function fetchJson<T>(url: string): Promise<T> {
  const cached = jsonCache.get(url);
  if (cached !== undefined) return cached as T;

  return queue.add(async () => {
    const again = jsonCache.get(url);
    if (again !== undefined) return again as T;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`GET ${url} → ${res.status}`);
    }
    const data = (await res.json()) as T;
    jsonCache.set(url, data);
    return data;
  }) as Promise<T>;
}

async function fetchBuffer(url: string): Promise<Buffer> {
  return queue.add(async () => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`GET ${url} → ${res.status}`);
    }
    return Buffer.from(await res.arrayBuffer());
  }) as Promise<Buffer>;
}

async function versionGroupOrder(versionUrl: string): Promise<number> {
  const version = await fetchJson<{ version_group: NamedApiResource }>(versionUrl);
  const group = await fetchJson<{ order: number }>(version.version_group.url);
  return group.order;
}

async function latestEnglishFlavor(entries: FlavorEntry[]): Promise<string> {
  const english = entries.filter((e) => e.language.name === 'en');
  if (english.length === 0) {
    throw new Error('no English flavor text');
  }

  let best = english[0]!;
  let bestOrder = -1;
  for (const entry of english) {
    const order = await versionGroupOrder(entry.version.url);
    if (order >= bestOrder) {
      bestOrder = order;
      best = entry;
    }
  }
  return unescapeFlavor(best.flavor_text);
}

/** Histogram dominant color among opaque pixels (alpha > 128). */
async function dominantRgb(png: Buffer): Promise<[number, number, number]> {
  const { data, info } = await sharp(png)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const buckets = new Map<number, { r: number; g: number; b: number; n: number }>();
  const step = 16; // quantize to reduce noise

  for (let i = 0; i < data.length; i += info.channels) {
    const a = data[i + 3] ?? 255;
    if (a < 128) continue;
    const r = data[i]!;
    const g = data[i + 1]!;
    const b = data[i + 2]!;
    const key =
      (Math.floor(r / step) << 16) | (Math.floor(g / step) << 8) | Math.floor(b / step);
    const bucket = buckets.get(key);
    if (bucket) {
      bucket.r += r;
      bucket.g += g;
      bucket.b += b;
      bucket.n += 1;
    } else {
      buckets.set(key, { r, g, b, n: 1 });
    }
  }

  if (buckets.size === 0) {
    throw new Error('no opaque pixels for dominant color');
  }

  let winner = [...buckets.values()][0]!;
  for (const bucket of buckets.values()) {
    if (bucket.n > winner.n) winner = bucket;
  }

  return [winner.r / winner.n, winner.g / winner.n, winner.b / winner.n];
}

async function discoverSpeciesIds(): Promise<number[]> {
  const ids: number[] = [];
  let url: string | null = `${POKEAPI}/pokemon-species?limit=200`;

  while (url) {
    const page = await fetchJson<{
      next: string | null;
      results: NamedApiResource[];
    }>(url);

    for (const result of page.results) {
      const match = result.url.match(/\/pokemon-species\/(\d+)\/?$/);
      if (!match) continue;
      const id = Number(match[1]);
      if (id > AFTER_ID) ids.push(id);
    }
    url = page.next;
  }

  return ids.sort((a, b) => a - b);
}

async function buildPokemon(speciesId: number): Promise<Pokemon> {
  const species = await fetchJson<{
    id: number;
    names: NameEntry[];
    genera: GenusEntry[];
    flavor_text_entries: FlavorEntry[];
    varieties: { is_default: boolean; pokemon: NamedApiResource }[];
  }>(`${POKEAPI}/pokemon-species/${speciesId}`);

  const defaultVariety = species.varieties.find((v) => v.is_default);
  if (!defaultVariety) {
    throw new Error('no default variety');
  }

  const pokemon = await fetchJson<{
    id: number;
    types: { slot: number; type: NamedApiResource }[];
    abilities: { ability: NamedApiResource }[];
    stats: { base_stat: number; stat: NamedApiResource }[];
    location_area_encounters: string;
  }>(defaultVariety.pokemon.url);

  // National Dex default form shares species id; skip odd form-only pokemon ids.
  if (pokemon.id !== species.id) {
    throw new Error(
      `default variety pokemon id ${pokemon.id} ≠ species id ${species.id} (skipped forms)`,
    );
  }

  const nameEntry = findEn(species.names);
  const genusEntry = findEn(species.genera);
  if (!nameEntry?.name) throw new Error('missing English name');
  if (!genusEntry?.genus) throw new Error('missing English genus');

  const description = await latestEnglishFlavor(species.flavor_text_entries);

  const types = await Promise.all(
    [...pokemon.types]
      .sort((a, b) => a.slot - b.slot)
      .map(async (t) => {
        const type = await fetchJson<{ names: NameEntry[] }>(t.type.url);
        const en = findEn(type.names);
        if (!en?.name) throw new Error(`missing English type for ${t.type.name}`);
        return en.name;
      }),
  );

  const abilities = await Promise.all(
    pokemon.abilities.map(async (a) => {
      const ability = await fetchJson<{
        names: NameEntry[];
        effect_entries: EffectEntry[];
        flavor_text_entries: FlavorEntry[];
      }>(a.ability.url);

      const enName = findEn(ability.names);
      if (!enName?.name) throw new Error(`missing English ability name for ${a.ability.name}`);

      const enEffect = findEn(ability.effect_entries);
      const effect = enEffect?.effect ? unescapeFlavor(enEffect.effect) : '';

      const enFlavor = findEn(ability.flavor_text_entries);
      if (!enFlavor?.flavor_text) {
        throw new Error(`missing English ability description for ${a.ability.name}`);
      }

      return {
        name: enName.name,
        effect,
        description: unescapeFlavor(enFlavor.flavor_text),
      };
    }),
  );

  const stats: Record<string, number> = {};
  for (const s of pokemon.stats) {
    const stat = await fetchJson<{ names: NameEntry[] }>(s.stat.url);
    const en = findEn(stat.names);
    if (!en?.name) throw new Error(`missing English stat for ${s.stat.name}`);
    stats[en.name] = s.base_stat;
  }

  const encounters = await fetchJson<
    { location_area: NamedApiResource }[]
  >(pokemon.location_area_encounters);

  const locationNames: string[] = [];
  for (const encounter of encounters) {
    const area = await fetchJson<{ location: NamedApiResource }>(
      encounter.location_area.url,
    );
    const location = await fetchJson<{ names: NameEntry[] }>(area.location.url);
    const en = findEn(location.names);
    if (en?.name) locationNames.push(en.name);
  }
  const locations = [...new Set(locationNames)];

  const artUrl = ARTWORK_URL(pokemon.id);
  let png: Buffer;
  try {
    png = await fetchBuffer(artUrl);
  } catch {
    throw new Error(`official artwork not available (${artUrl})`);
  }

  const dominant = await dominantRgb(png);
  const [br, bg, bb] = lighten(dominant);
  const color = rgbToHex(br, bg, bb);

  const webp = await sharp(png)
    .flatten({ background: { r: Math.round(br), g: Math.round(bg), b: Math.round(bb) } })
    .webp({ quality: 90 })
    .toBuffer();

  writeFileSync(join(OUT_DIR, `${pokemon.id}.webp`), webp);

  const imageUrl = `${PUBLIC_BASE}/${pokemon.id}.webp`;

  return {
    id: pokemon.id,
    name: nameEntry.name,
    genus: genusEntry.genus,
    description,
    imageUrl,
    types,
    color,
    abilities,
    stats,
    locations,
  };
}

function toSummary(p: Pokemon): IndexSummary {
  return {
    id: p.id,
    name: p.name,
    genus: p.genus,
    description: p.description,
    imageUrl: p.imageUrl,
    types: p.types,
    color: p.color,
  };
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  console.log(`Discovering pokemon-species with id > ${AFTER_ID}…`);
  const speciesIds = await discoverSpeciesIds();
  console.log(`Found ${speciesIds.length} species: ${speciesIds[0]}…${speciesIds.at(-1)}`);

  console.log(`Loading existing index.json from R2…`);
  const existingIndex = (await fetchJson<IndexSummary[]>(`${PUBLIC_BASE}/index.json`)).filter(
    (e) => e.id <= AFTER_ID,
  );
  if (existingIndex.length === 0) {
    throw new Error('existing index.json empty or unreadable');
  }
  console.log(`Keeping ${existingIndex.length} existing entries (id ≤ ${AFTER_ID}).`);

  const generated: IndexSummary[] = [];
  const failures: { id: number; error: string }[] = [];

  for (const id of speciesIds) {
    process.stdout.write(`  #${id}… `);
    try {
      const detail = await buildPokemon(id);
      writeFileSync(join(OUT_DIR, `${id}.json`), JSON.stringify(detail));
      generated.push(toSummary(detail));
      console.log(`ok (${detail.name}, ${detail.color})`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      failures.push({ id, error: message });
      console.log(`FAIL: ${message}`);
    }
  }

  const index = [...existingIndex, ...generated].sort((a, b) => a.id - b.id);
  writeFileSync(join(OUT_DIR, 'index.json'), JSON.stringify(index));

  console.log('');
  console.log(`Wrote ${generated.length} new Pokémon + index.json → ${OUT_DIR}`);
  console.log(`Index size: ${index.length} (was ${existingIndex.length} + ${generated.length} new)`);

  if (failures.length > 0) {
    console.error(`\n${failures.length} failure(s):`);
    for (const f of failures) {
      console.error(`  #${f.id}: ${f.error}`);
    }
    process.exit(1);
  }

  console.log('\nUpload new objects + index.json to the pokeapi R2 bucket, then:');
  console.log('  npm run seed:remote');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
