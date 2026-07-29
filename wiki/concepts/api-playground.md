---
title: API playground
tags: [concept, frontend]
updated: 2026-07-29
---

# API playground

Interactive try-it panel on the Worker homepage (`/` → [`src/pages/home.tsx`](../../src/pages/home.tsx)). Not Scalar/Swagger — a small custom client that fires same-origin `fetch` calls against the live API.

## What it covers

| Preset | Path | Params |
| --- | --- | --- |
| List Pokémon | `/pokemon` | `offset`, `limit` |
| Get by id or name | `/pokemon/:idOrName` | path `idOrName` |
| Pokémon of the day | `/pokemon/potd` | none |

Shows status, latency, pretty JSON, and a small sprite/name preview when the payload includes `imageUrl`.

## Client reactivity choice

This repo is **plain Wrangler + Hono server JSX** (no Vite / HonoX). Options considered:

| Approach | Fit |
| --- | --- |
| **Vanilla ES module** (`public/playground.js`) | Best fit — zero dual-build, progressive enhancement on SSR HTML |
| `hono/jsx/dom` client components | Needs a separate client bundle (typically Vite) and `jsxImportSource` split |
| HonoX islands | Heavier meta-framework migration for one interactive panel |

So: **SSR shell in Hono JSX + focused vanilla module** for playground state/DOM. Revisit `hono/jsx/dom` if the UI grows into many interactive islands.

## Static assets

Wrangler [`assets.directory`](../../wrangler.jsonc) = `public/` (logo, favicon, `playground.js`). Default asset-first routing serves those files; API + `/` stay on the Worker.

## Related

- [API surface](api-surface.md)
- [Hono](hono.md)
- [poke-api Worker](../entities/poke-api-worker.md)
