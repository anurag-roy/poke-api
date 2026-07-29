# Wiki log

Append-only timeline. Newest entries at the bottom.

## [2026-07-29] ingest | Karpathy LLM Wiki

Instantiated `raw/`, `wiki/`, and `AGENTS.md` from the LLM Wiki pattern. Filed source summary under `wiki/sources/karpathy-llm-wiki.md`.

## [2026-07-29] ingest | Cloudflare migration notes

Ingested migration decisions and outcomes. Created overview, Worker/D1/R2/CI entity pages, and architecture/API/seed/POTD/data-model concept pages.

## [2026-07-29] ingest | README.md

Aligned API defaults and public docs with wiki API/data-model pages.

## [2026-07-29] query | Append National Dex 906+

Built append-only generate pipeline (`scripts/generate-pokemon.ts`): PokéAPI HTTP + official artwork, lightened dominant color (0.4), WebP via sharp, p-queue fair use. Generated **120** species (906–1025) into gitignored `data/generated/` (full index 1025). Documented R2 upload + `seed:remote` (human publish gate). Updated data-model / R2 / seed pages; added [[generate-pipeline]].

## [2026-07-29] query | Homepage theme + playground

Red/white Pokéball-inspired homepage redesign with a custom in-page API playground (`public/playground.js`). Chose vanilla ES module over `hono/jsx/dom`/HonoX because the project has no Vite dual-build. Added Wrangler `assets.directory` = `public/`. Filed [[api-playground]].
