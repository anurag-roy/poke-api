---
title: Source — Karpathy LLM Wiki
tags: [source]
updated: 2026-07-29
sources: [raw/sources/karpathy-llm-wiki.md]
---

# Source: Karpathy LLM Wiki

Raw: [`raw/sources/karpathy-llm-wiki.md`](../../raw/sources/karpathy-llm-wiki.md)

## Takeaways

- Prefer a **persistent wiki** over pure RAG: compile knowledge on ingest, keep it current.
- Three layers: immutable raw sources, LLM-owned wiki, schema (`AGENTS.md`).
- Core ops: **ingest**, **query** (file good answers back), **lint**.
- Navigation: `index.md` (catalog) + `log.md` (append-only timeline).

## Wiki impact

Instantiated this pattern under `raw/`, `wiki/`, and root [`AGENTS.md`](../../AGENTS.md) for poke-api.
