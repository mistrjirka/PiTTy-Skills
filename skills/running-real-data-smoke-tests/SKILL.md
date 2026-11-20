---
name: running-real-data-smoke-tests
description: Use when running a manual real-service smoke test, or when a material integration claim requires evidence from the actual app/runtime or a real external service beyond focused tests.
---

# Integrated smoke validation

Start from the concrete unresolved integration question. Prefer exercising the actual application/user/runtime path when it is practical and representative; prefer an existing focused integration test when it already covers the boundary. Do not create a custom smoke harness merely to accumulate confidence after focused checks pass. Use this skill when neither of those paths can answer a material integration question. Identify the exact runtime, representative data, expected outcome, dependencies and success evidence. Use isolated/disposable data where possible; production writes, external sends and costly runs require explicit authority.

Prepare only the runtime needed to answer that question, exercise the smallest representative path, inspect owning state and downstream output, then clean up temporary runners. An internal service call may test business behavior, but cannot prove HTTP authentication, middleware or UI behavior it bypasses. Exercise the actual changed boundary when that is the claim. Correct an obvious local setup mistake when the fix is small and the path remains representative. If exercising the smoke begins to require non-obvious diagnosis or substantial bespoke harness machinery, report the validation gap instead of turning the smoke harness into a separate implementation project. If an ambiguous setup/infrastructure failure remains after that bounded correction and existing evidence does not indicate a product defect, report the smoke as blocked.

Bound long runs at the actual child/container process, not only at a host wrapper. Preserve redacted phase logs and input/output IDs; verify temporary process and file cleanup. Inspect earlier logs and persisted state before retrying an apparently stuck run. Choose time/cost limits suitable for the operation, not an unconditional timeout for every project.

For LLM paths retain positive invocation evidence, distinguish cache reloads, and audit semantic output against authoritative source and relevant contradictions. Validate both shard-local and global reconciliation when sharded. Mechanical identity/schema/coverage checks complement this audit.

Report exact commands, runtime/version, result, persisted evidence and gaps. Completed process status is not proof of correct end-to-end output. Do not claim a real-data run when only static or mocked checks were performed.
