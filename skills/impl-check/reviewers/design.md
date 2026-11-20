# Design review

Own the following checks unless the parent explicitly reassigns a subset. Read only code needed to cover the assigned surface and verify findings.

## D1 — Ownership and dependency direction

Trace the changed use case through modules. Identify misplaced domain decisions, inappropriate framework/adapter dependencies, cycles, shared mutable state and unrelated responsibilities. Follow repository architecture rather than prescribing layers for their own sake.

## D2 — Public surfaces and abstractions

Check unnecessary public contract widening, internal feature/provider/UI types leaking across layers and avoidable format conversion churn. Preserve boundaries that hide real complexity; do not move a feature-specific adapter into shared runtime merely by relocating its file.

## D3 — Existing owner and reuse

Before recommending reuse, open the existing helper/service/client and its caller. Cite the target and semantic match. Catch bypasses that lose authorization, retry, tracing, accounting, configuration or error normalization; allow intentional replacement and genuinely new capabilities.

## D4 — Flawed precedent

Inspect the direct pattern copied or extended by this change. Do not recommend an existing owner that is itself demonstrably wrong. Explain the shared root cause and bounded correction; ask before expanding implementation scope, not before reporting the evidence.

## D5 — Duplication and decomposition

Find repeated semantic logic, parameter groups and orchestration whose consolidation reduces real maintenance cost. Parameterized functions and higher-order helpers are valid. Similar-looking code or two occurrences alone do not justify a new abstraction.

## D6 — Module depth and simplicity

Apply the deletion test correctly: retain a boundary when deleting it spreads complexity into callers. Question pure pass-through layers, unused extension points, incompatible mode flags and bloated interfaces only when a simpler behavior-equivalent design is concrete.

## D7 — Root-cause placement and scope

Catch distant symptom patches, accumulating per-item exemptions, speculative mechanisms and unrelated refactors. Correct the producer/rule boundary when supported by evidence; do not remove legitimate defenses just to shorten the diff.

## D8 — Dead code and compatibility

Prove dead branches/helpers and obsolete compatibility paths by reading consumers, construction guarantees and possible mutation. Preserve actual external consumers, documented migration windows and boundary guards. Focus on changed or directly copied code, not a repo-wide cleanup.

## D9 — Names and discoverability

Check misleading, inconsistent or unnecessarily qualified names against behavior and repository vocabulary. Offer a concrete better name and account for public compatibility. Do not enforce grammatical or URL naming tastes as universal defects.

## D10 — Type and prompt organization

Check anonymous exported contracts, duplicated schemas/types, misplaced shared DTOs and substantial prompts mixed into unrelated runtime logic. Follow the project layout; component-local/private single-use types and canonical runtime schemas need not be extracted mechanically.

## D11 — Documentation and rationale

Check changed contracts, setup steps, migrations, runbooks and public usage for missing necessary information or contradictions. Keep useful why-comments; remove stale planning labels and abandoned rationale. Require per-function documentation only when the project or API needs it.

## D12 — Diff hygiene and packaging

Catch accidental files, debug leftovers, unrelated formatting, stale imports/exports that break packaging, missing assets and broken reference paths. Skip harmless unused-import/style noise already covered by automation; do not remove another contributor's work.
