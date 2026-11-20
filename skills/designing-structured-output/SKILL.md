---
name: designing-structured-output
description: Use when designing model/tool schemas, identity coverage or recovery from invalid structured output.
---

# Structured output contracts

Use supported provider-enforced schemas where available, then validate business invariants in application code. Valid JSON is not evidence that a semantic judgment is correct.

## Shape

- Known identities requiring exactly one decision: prefer a closed required-property object when cardinality and provider limits make it practical.
- Bounded selections: derive literals/enums from the invocation's allowed IDs; check empty and duplicate inputs before constructing a schema.
- Meaningful order, repeated items or large identity sets: an array can be appropriate, with explicit uniqueness and exact-coverage checks.
- Identities discovered during a real action loop: validate incremental writes and completion server-side.

Match the schema to the current provider subset and installed converter. Check nesting, enum/property budgets, nullable/optional behavior and root shape using actual generated schemas. Do not use a remembered universal 500/600-element limit across providers.

## Boundaries

Derive static types from static schemas. Expose named validated contracts for dynamic shapes without pretending compile-time inference knows runtime IDs. Keep distinct identity roles separate. Close model-controlled objects where the protocol requires it; uncontrolled external objects may legitimately need a different unknown-key policy.

Schema checks cannot prove semantic support, cross-field relationships or every business invariant. Validate those after parsing. Make valid no-match and refusal/error paths distinguishable from missing required work.

## Recovery

Preserve accepted decisions; retry unresolved items only when the protocol safely permits it. Provide specific validation feedback and recheck exact coverage. Bound correction attempts and report exhaustion. Do not silently default, drop decisions, or treat network/auth/rate-limit failures as schema mistakes.

Test missing, duplicate, unknown, conflicting and empty identities, unsupported generated schemas, truncation/refusal, partial retries and final serialization. Prefer one faithful runnable example over an unchecked type assertion that merely compiles.
