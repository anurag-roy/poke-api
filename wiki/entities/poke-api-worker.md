---
title: poke-api Worker
tags: [entity, cloudflare, workers]
updated: 2026-07-29
---

# poke-api Worker

Cloudflare Worker script named **`poke-api`**. Entry: [`src/index.tsx`](../../src/index.tsx). Config: [`wrangler.jsonc`](../../wrangler.jsonc).

## Bindings

| Binding | Resource | Role |
| --- | --- | --- |
| `DB` | D1 `poke-api` | Runtime reads/writes (list, detail, POTD meta) |
| `POKEAPI_BUCKET` | R2 `pokeapi` | Declared for the seed/source bucket; runtime API does not read R2 |

Static files from Wrangler **assets** (`public/`): favicon, playground client. No `ASSETS` binding — platform asset-first routing serves matching paths.

## Triggers

- HTTP: `*.workers.dev` (and any custom routes if added later)
- Cron: `0 0 * * *` → rotate [Pokémon of the Day](../concepts/pokemon-of-the-day.md)

## Routes (Hono)

| Method | Path | Handler |
| --- | --- | --- |
| GET | `/` | JSX landing + playground ([`src/pages/home.tsx`](../../src/pages/home.tsx)) |
| GET | `/pokemon` | List by id range |
| GET | `/pokemon/potd` | Daily pick |
| GET | `/pokemon/:idOrName` | Detail by numeric id or name |

CORS enabled globally.

## Related

- [D1 database](d1-database.md)
- [API surface](../concepts/api-surface.md)
- [Architecture](../concepts/architecture.md)
