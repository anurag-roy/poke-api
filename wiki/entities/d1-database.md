---
title: D1 database poke-api
tags: [entity, cloudflare, d1]
updated: 2026-07-29
---

# D1 database (`poke-api`)

SQLite-backed Cloudflare D1 database bound as `env.DB`.

- **Name:** `poke-api`
- **Id:** `b74c2f1f-1724-4452-9b44-e1ea1907a731`
- **Migration:** [`migrations/0001_init_pokemon_schema.sql`](../../migrations/0001_init_pokemon_schema.sql)

## Schema

**`pokemon`**

| Column | Type | Notes |
| --- | --- | --- |
| `id` | INTEGER PK | National Dex id |
| `name` | TEXT UNIQUE | Stored lowercased; lookups use `COLLATE NOCASE` |
| `detail` | TEXT | Full Pokémon JSON ([data model](../concepts/pokemon-data-model.md)) |

**`meta`**

| Column | Type | Notes |
| --- | --- | --- |
| `key` | TEXT PK | e.g. `potd_id` |
| `value` | TEXT | e.g. `"150"` |

An earlier unused normalized schema (separate ability/type tables) was dropped in the init migration; that experiment had empty data.

## Access helpers

Query logic lives in [`src/db.ts`](../../src/db.ts): list by id range, get by id/name, get/set POTD.

## Related

- [Seed pipeline](../concepts/seed-pipeline.md)
- [Pokémon of the Day](../concepts/pokemon-of-the-day.md)
