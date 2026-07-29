---
title: API surface
tags: [concept, api]
updated: 2026-07-29
---

# API surface

Stable contract for widget clients. Implemented in [`src/index.tsx`](../../src/index.tsx).

| Method | Path | Notes |
| --- | --- | --- |
| GET | `/` | HTML landing + [API playground](api-playground.md) (Hono JSX), not JSON |
| GET | `/pokemon` | Query: `offset` (default **1**, starting id), `limit` (default **150**). Returns `Pokemon[]` |
| GET | `/pokemon/potd` | One `Pokemon` (or null-ish if unset) |
| GET | `/pokemon/:idOrName` | Numeric → id; else lowercased name. 404 text: `Pokemon not found!` |

CORS: allow all origins (`hono/cors`).

**Not exposed:** migrate/seed HTTP endpoints. Seeding is CLI-only ([seed pipeline](seed-pipeline.md)).

## List semantics

`offset` is the **starting National Dex id**, not a 0-based page index. Example: `offset=150&limit=2` → ids 150 and 151.

## Errors

- 404: plain text `Pokemon not found!`
- 500: plain text `Internal server error`

## Related

- [Pokémon data model](pokemon-data-model.md)
- Public docs also in root [README.md](../../README.md)
