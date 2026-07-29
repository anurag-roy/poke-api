# Wiki index

Catalog of the poke-api LLM Wiki. Agents: read this first when answering questions.

## Overview

| Page | Summary |
| --- | --- |
| [overview.md](overview.md) | What the project is, live URL, stack, mental model |

## Entities

| Page | Summary |
| --- | --- |
| [entities/poke-api-worker.md](entities/poke-api-worker.md) | Cloudflare Worker, bindings, routes, cron |
| [entities/d1-database.md](entities/d1-database.md) | D1 schema (`pokemon`, `meta`) and helpers |
| [entities/r2-pokeapi.md](entities/r2-pokeapi.md) | R2 JSON/images + public host |
| [entities/github-actions.md](entities/github-actions.md) | CI deploy workflow and API token secret |

## Concepts

| Page | Summary |
| --- | --- |
| [concepts/architecture.md](concepts/architecture.md) | Deno → Workers migration architecture |
| [concepts/api-surface.md](concepts/api-surface.md) | Stable HTTP API for widgets |
| [concepts/pokemon-data-model.md](concepts/pokemon-data-model.md) | Pokémon JSON fields |
| [concepts/generate-pipeline.md](concepts/generate-pipeline.md) | Append National Dex JSON/WebP from PokéAPI |
| [concepts/seed-pipeline.md](concepts/seed-pipeline.md) | R2 → D1 CLI seed |
| [concepts/pokemon-of-the-day.md](concepts/pokemon-of-the-day.md) | Daily cron + `potd_id` |
| [concepts/hono.md](concepts/hono.md) | Hono framework usage |
| [concepts/api-playground.md](concepts/api-playground.md) | Custom homepage API playground + client reactivity choice |

## Sources

| Page | Summary |
| --- | --- |
| [sources/karpathy-llm-wiki.md](sources/karpathy-llm-wiki.md) | LLM Wiki pattern |
| [sources/2026-07-29-cloudflare-migration.md](sources/2026-07-29-cloudflare-migration.md) | Migration session notes |
| [sources/readme.md](sources/readme.md) | Root README as source |

## Meta

| Page | Summary |
| --- | --- |
| [log.md](log.md) | Chronological wiki activity |
| [../AGENTS.md](../AGENTS.md) | Schema / agent instructions |
| [../raw/README.md](../raw/README.md) | Raw sources directory |
