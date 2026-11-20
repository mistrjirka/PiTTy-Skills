# Runtime review

Own the following checks unless the parent explicitly reassigns a subset. Read only code needed to cover the assigned surface and verify findings.

## R1 — Async ordering and concurrency

Trace awaits, concurrent mutation, event ordering, duplicate delivery and partial completion. Check real interleavings rather than demanding locks everywhere; preserve intentional last-write-wins. Coordinate cross-lane UI symptoms with the behavior reviewer.

## R2 — Cancellation and resource lifetime

Check propagation to actual child/provider work, late-result rejection, errors and cleanup of processes, timers, listeners, subscriptions, connections and temporary resources. A hidden spinner does not cancel a job; bounds must reach the inner container/process.

## R3 — Atomicity and idempotency

Inspect multi-record and external side effects for transaction boundaries, replay-safe writes, deduplication and explicit compensation. A database transaction alone cannot undo an external call. Check how partial success becomes visible.

## R4 — Restart and durable identity

Distinguish recorded running status from live execution after restart. Check recovery from lost process-local attempts, atomically published results/completion markers, and durable references to ephemeral jobs/files/cache entries. Preserve completed historical results.

## R5 — Persisted compatibility

Follow changed shapes through old rows, queues, files, caches and mixed application versions. Verify migration/read compatibility or an explicit safe invalidation policy; do not assume all consumers deploy simultaneously.

## R6 — Migration rollout

Check expand/backfill/contract order, constraints, locking, online operations where supported, batched backfills and recovery/data-loss limits. Never assume migrations are unapplied, consolidate deployed history, delete migration records or require a destructive down path merely for symmetry.

## R7 — Schema and query behavior

Check implied uniqueness/FKs, relational IDs versus genuine scalar tags, soft-delete uniqueness, matching indexes, growing result bounds, N+1, multiplicative joins and repeated round trips. Index proposals need a concrete query/workload, not a blanket rule.

## R8 — Performance and allocation

Identify hot-path complexity, blocking work, unnecessary recomputation, over-fetching, oversized payloads and request waterfalls. Use observed scale or justified bounds; do not demand caching, virtualization or async conversion from an arbitrary numeric threshold.

## R9 — Cache correctness

Inspect keys, tenant isolation, invalidation/expiry, stampedes, consistency cost and freshness claims. Cache reload is distinct from fresh execution. Coordinate a tenant exposure with contracts rather than filing duplicate symptoms.

## R10 — External resilience

Check timeouts, bounded retry/backoff, retry classification, batching and circuit breaking when failure makes them material. Respect idempotency before retrying writes; do not turn auth/config errors into schema or transient retries.

## R11 — Configuration and deployment

Cross-check changed runtime settings with the applicable environment examples, dev/prod deployment, CI, infrastructure, generated artifacts and operational docs. Some settings are intentionally local; identify missing required wiring rather than demanding identical configurations.

## R12 — Observability and temporary controls

Check usable/redacted errors, trace propagation, terminal evidence, critical dependency health/readiness and introduced feature-flag removal conditions. Logging failure while returning fabricated success is not recovery. Configuration or flags must not leave impossible-to-diagnose states.
