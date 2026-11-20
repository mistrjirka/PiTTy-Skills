---
name: planning-qualitative-optimization
description: Use when scoping an observed LLM quality failure into a falsifiable real-data experiment.
---

# Plan a qualitative experiment

Stay read-only unless the user authorizes changes. Locate authoritative input, rendered context, raw model/tool output, persisted result and consumer output. Do not invent a baseline from labels or cached summaries.

Define a narrow observed failure, owning layer, hypothesis and acceptance criteria. Include successful, failing, legitimate no-result and contradictory-context cases. Distinguish retrieval/context, prompt, schema/tool, model capability, retry/consolidation, persistence and presentation defects.

Prefer source-grounded context and appropriate decision granularity over rules that memorize a fixture's headings or keywords. Bounded context-preserving shards are a hypothesis to evaluate, not a universal one-worker-per-item rule; test global reconciliation too.

Separate structural checks from semantic judgment. Schema, identity, coverage and persistence checks do not prove source support. Specify representative manual/source-grounded semantic evaluation and a positive execution marker proving a new intended model/validator invocation.

For repeated/ambiguous failures, plan a bounded trace of rendered inputs, observable tool/validator events, retries and outputs. Specify redaction, retention, access and cost limits; exclude credentials and unnecessary personal data. Never request hidden reasoning.

Use an existing experiment register when useful. A plan is a compact source/baseline/hypothesis/check contract, not a required intent file or compaction workaround. Implement the plan only when authorized.
