# LLM Wiki

Source: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f  
Fetched: 2026-07-29

A pattern for building personal knowledge bases using LLMs.

## The core idea

Most people's experience with LLMs and documents looks like RAG: you upload a collection of files, the LLM retrieves relevant chunks at query time, and generates an answer. This works, but the LLM is rediscovering knowledge from scratch on every question. There's no accumulation.

The idea here is different. Instead of just retrieving from raw documents at query time, the LLM **incrementally builds and maintains a persistent wiki** — a structured, interlinked collection of markdown files that sits between you and the raw sources. When you add a new source, the LLM reads it, extracts the key information, and integrates it into the existing wiki. The knowledge is compiled once and then *kept current*, not re-derived on every query.

**The wiki is a persistent, compounding artifact.** You rarely write the wiki yourself — the LLM writes and maintains it. You're in charge of sourcing, exploration, and asking the right questions.

## Architecture

Three layers:

1. **Raw sources** — curated, immutable documents. LLM reads; never modifies.
2. **The wiki** — LLM-generated markdown: summaries, entities, concepts, overview, synthesis.
3. **The schema** — e.g. `AGENTS.md` — structure, conventions, workflows for ingest / query / lint.

## Operations

- **Ingest** — process a new source; update many wiki pages; log the event.
- **Query** — answer from the wiki; file good answers back into the wiki.
- **Lint** — health-check contradictions, orphans, stale claims, missing pages.

## Indexing and logging

- **index.md** — content catalog (categories, one-line summaries). Read first when answering.
- **log.md** — append-only chronology. Prefer entries like `## [YYYY-MM-DD] ingest | Title`.

## Why this works

Humans abandon wikis because maintenance grows faster than value. LLMs can update cross-references across many files in one pass. The human curates and directs; the LLM does the bookkeeping.
