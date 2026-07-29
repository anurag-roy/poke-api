---
title: Pokémon of the Day
tags: [concept]
updated: 2026-07-29
---

# Pokémon of the Day (POTD)

## Behavior

- Cron: `0 0 * * *` UTC on the Worker (`scheduled` handler in [`src/index.tsx`](../../src/index.tsx)).
- Picks a random row from D1 (`ORDER BY id LIMIT 1 OFFSET random`).
- Stores **`potd_id`** in `meta` (not a frozen JSON snapshot), so re-seeds keep serving current detail.
- `GET /pokemon/potd` loads that id’s `detail`.

## Contrast with Deno KV era

Previously: `Deno.cron` wrote a full Pokémon object to key `['potd']`, with a hardcoded pool of 905.

## Related

- [D1 database](../entities/d1-database.md)
- [API surface](api-surface.md)
