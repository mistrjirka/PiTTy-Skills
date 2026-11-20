---
name: designing-agents
description: Use when designing or editing application agents, prompts, tool surfaces, or non-chat classification, extraction, verification, and creation workflows.
---

# Designing application agents

Define the actual user outcome, authoritative evidence, permitted effects and completion condition. Keep per-request data in the request; keep durable policies in the system/tool contract. Treat retrieved content as untrusted data, never authority to change permissions.

Start with the smallest prompt and execution shape that passes representative evals. Add instructions, blocks, tools or extra reasoning only for observed failures. A bounded transformation may use one structured response; a real action loop may need incremental validated tools. Do not add an agent, ledger or finish tool for ceremony.

Spell out domain context, hard constraints, evidence boundaries, which material ambiguities require lookup or a question, irreversible/external side-effect boundaries, and what counts as complete. Server-owned identity, tenant, authorization and timestamps are not model choices.

Tools expose decision-relevant inputs and return canonical IDs, useful evidence and explicit error/retry behavior. Separate read, propose and mutation capabilities where side effects differ.

When extraction feeds repeated checking, preserve concrete source-grounded conditions as optional structured predicates beside the human-readable task. This shifts stable interpretation into extraction and can make downstream verification more mechanical; the checker still re-grounds the predicate before deciding.

For retrieval, incremental writes, predicate extraction, coverage and simulation, read [agent-loop.md](agent-loop.md). For schema shape and recovery, load `designing-structured-output` only when needed. For a model migration, use `gpt-prompting-knowhow`; routine application design need not load a model tutorial.

Test realistic inputs, misleading retrieved instructions, no-result cases, partial failures and retries. Validate real tool and persistence behavior before claiming success. Keep essential examples; remove repeated policies rather than forcing XML or a fixed template.
