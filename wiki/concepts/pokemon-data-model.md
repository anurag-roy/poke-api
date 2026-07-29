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
| `description` | string | |
| `types` | string[] | |
| `imageUrl` | string | Public R2 `.webp` URL |
| `color` | string | Dominant color hex |
| `abilities` | `{ name, effect, description }[]` | |
| `stats` | `Record<string, number>` | Keys like `HP`, `Attack`, … |
| `locations` | string[] | |

Catalog size in current seed: **905** (through the Gen 8 / Hisui-era set this project was built with).

Data originally prepared from [PokéAPI api-data](https://github.com/PokeAPI/api-data) via a custom gist pipeline (linked from README).

## Related

- [D1 database](../entities/d1-database.md)
- [R2 pokeapi](../entities/r2-pokeapi.md)
