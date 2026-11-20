---
name: gpt-prompting-knowhow
description: Use when migrating or evaluating GPT-specific prompt and tool behavior, not for every coding task.
disable-model-invocation: true
---

# GPT prompt evaluation

Read the current [model guidance](https://developers.openai.com/api/docs/guides/latest-model) for the GPT family being evaluated, keeping the model selector explicit. For GPT-6, pay particular attention to initiative/questions, instruction sensitivity, subagent delegation and testing behavior; explicit user instructions outrank skill guidance.

Start from a working baseline. Remove one redundant instruction group at a time and evaluate the same tasks, including long sessions. Retain domain requirements, evidence, meaningful examples, approval boundaries and completion criteria. Audit the whole loaded stack—task prompt, agent files and skills—for repeated or conflicting process rules. Modern coding models already tend to verify thoroughly; do not add generic 'test thoroughly' or repeated validation instructions. Start with focused checks and broaden only after a relevant change, failure or concrete unresolved risk. Specify what a short report must preserve rather than optimizing word count alone.

Compare the existing reasoning setting with one lower on representative tasks. Runtime parameters belong in supported provider configuration, not prompt incantations.

Use programmatic orchestration for bounded mechanical reductions, not decisions requiring fresh semantic judgment or approval. Preserve source evidence in the final answer.

Record task success, missed findings, false positives, evidence quality, tokens, latency and cost. Static prompt checks cannot establish model-quality equivalence. See [reference.md](reference.md) for the evaluation record.
