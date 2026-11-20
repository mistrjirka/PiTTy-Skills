---
name: review-final-diff
description: Use for a focused direct review of an ordinary completed diff when a full independent impl-check is unnecessary.
---

# Focused final review

Review the actual diff, user requirements, applicable conventions, relevant callers/contracts and available validation. Check reachable correctness and error paths, type/trust boundaries, ownership/reuse, tests and scope hygiene. Preserve necessary evidence; do not search unrelated code to fill a findings quota.

At TypeScript boundaries, explicitly check for type-system escapes (`as unknown as`, `as any`, `as never` and equivalents), unjustified `unknown`, and hand-rolled structural validation. Runtime object/array shape validation should use/reuse Zod rather than nested `typeof`, `Array.isArray`, property probing, repeated casts or custom guard trees. Ordinary predicates over already-typed values are not a problem.

Before reporting a candidate, read the claimed behavior and relevant dependencies, seek counterexamples to absence claims, and verify version-sensitive API assertions. Distinguish a real defect, a convention violation, an unverified concern and legitimate behavior. Deduplicate by root cause and fix.

Return verified findings in impact order with location, evidence and focused correction; then state validation gaps and reviewed snapshot. Empty findings do not imply tests ran or all risks were covered.

This is a direct lightweight pass, not a second multi-agent orchestrator or a mandatory prerequisite to `impl-check`. For an explicitly deep or high-risk cross-layer review, use `impl-check` instead. Do not automatically run both.

Remain read-only on review requests. Authorized fixes require affected validation and a check that evidence still matches the resulting tree.
