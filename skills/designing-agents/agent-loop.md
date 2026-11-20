# Retrieval and incremental action contracts

## Retrieval

Document the search contract: corpus and tenant scope; lexical, semantic, hybrid, exact or graph semantics; filters; result unit; ranking/tie behavior; maximum results or truncation; provenance; and empty-versus-failed behavior. Offer exact lookup or evidence expansion when a search hit cannot support the decision. Queries testing a claim should target its uncertain details, not just its broad theme.

## Writes and completion

Use incremental writes when the product actually needs an action loop. Validate allowed identities, permissions and schemas server-side; return stable IDs and explicit validation feedback. Use provider-compatible schemas, not a universal aggregate schema-size constant.

Keep an invocation's mutable state isolated. Parallel results need well-defined merge, duplicate, conflict and readback semantics; identifiers must survive merging. Verify the installed runtime's sharing behavior rather than assuming child tasks receive the same object.

The application validates required coverage and terminal state. Normal assistant text is not a substitute for completed work, but no ceremonial finish call is needed when the server can establish completion. Preserve valid decisions during bounded recovery; distinguish content/schema correction from transport, authentication and rate-limit failures. Make writes retry-safe before retrying them.

## Extract checkable predicates once

When one stage extracts requirements and later stages repeatedly verify them, store the human-readable requirement plus an optional compact predicate for each concrete, falsifiable condition. Read it literally as `OBSERVED(subject) operator expected`:

```json
{"subject":"partner site ZIP code","operator":"IN_SET","expected":"95834, 95835, 95836"}
```

`subject` names one concrete observed-side value slot, not a broad goal such as "priority-area coverage". `expected` preserves the source-grounded value, set, threshold, count, date, duration, amount, or required presence. Use a small bounded operator set such as `IN_SET`, `EQUALS`, `MINIMUM`, `MAXIMUM`, `EXACT_COUNT`, `ON_OR_AFTER`, `BEFORE`, and `REQUIRED_PRESENT`; leave the predicate absent for primarily qualitative or narrative checks.

Extract restrictions introduced by definitions when they are independently falsifiable, even if the defining sentence lacks words such as MUST or SHALL. Keep independent constraints atomic instead of hiding several comparisons inside one broad task.

The predicate is a verification hint, not authoritative evidence. Before deciding pass/fail, re-ground both the observed value and the expected condition in the current evidence and controlling source. This moves repeated interpretation out of each check without turning stale or mistaken extraction into policy. Lower reasoning effort may then be sufficient for the mechanical comparison, but treat that as an eval result to measure rather than a guaranteed optimization.

### Example: extraction to verification

For a requirement-extraction workflow, expose source search/expansion plus narrow durable decisions such as `add_task(..., logicalCondition?)` and `exclude_candidate(...)`. Persist each supported task as soon as it is decided; let the application track candidate coverage and return unresolved IDs for bounded recovery. Later verification receives the task and predicate, retrieves the current observed value and controlling source, re-grounds both sides, then performs the comparison.

This pattern is useful when the same rules would otherwise be reinterpreted repeatedly. It is not useful for primarily qualitative judgments where a compact predicate would discard material meaning.

## Isolated simulation

Before locking a consequential prompt/tool contract, run a fresh-context simulation containing only the candidate system/developer prompt, user prompt shape, tool descriptions and representative example data—no parent or project context. Ask the simulator to exercise likely tool calls and decisions and identify ambiguity, omissions or confusing contracts. Repeat with at least one edge case. Use the result to remove ambiguity or unnecessary context, not to add generic instructions. Simulation is design evidence, not proof of production behavior.

## Validation

Exercise a normal run, a legitimate no-result run, missing/duplicate/unknown identities, interrupted work and one exhausted-recovery case. Inspect rendered prompts, actual tool results and persisted output. Keep traces bounded and redacted; do not request hidden reasoning.
