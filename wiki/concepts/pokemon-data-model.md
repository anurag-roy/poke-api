---
title: Pokémon data model
tags: [concept, data]
updated: 2026-07-29
---

# Pokémon data model

TypeScript shape: [`src/types.ts`](../../src/types.ts). Stored as JSON text in D1 `pokemon.detail`.

| Field | Type | Notes |
| --- | --- | --- |
| `id` | number | National Dex |
| `name` | string | Display casing in JSON; D1 `name` column is lowercased |
| `genus` | string | |
| `description` | string | English flavor text (new rows: latest game version in PokéAPI) |
| `types` | string[] | |
| `imageUrl` | string | Public R2 `.webp` URL |
| `color` | string | Lightened dominant color hex (factor 0.4 over white) — also baked into the WebP |
| `abilities` | `{ name, effect, description }[]` | |
| `stats` | `Record<string, number>` | Keys like `HP`, `Attack`, … |
| `locations` | string[] | |

Catalog size is whatever is in R2 `index.json` / D1 after seed — not hardcoded in the Worker. Generated append batch (2026-07-29): **120** new default species (**906–1025**), full index **1025** once uploaded. Historical base set was **905** (through Hisui / Enamorus).

Default National Dex only (no `100xx` form entries). Original 1–905 from [PokéAPI api-data](https://github.com/PokeAPI/api-data) via a custom gist; later ids via [[generate-pipeline]] ([generate-pipeline.md](generate-pipeline.md)).

## Related

- [D1 database](../entities/d1-database.md)
- [R2 pokeapi](../entities/r2-pokeapi.md)
- [Generate pipeline](generate-pipeline.md)
