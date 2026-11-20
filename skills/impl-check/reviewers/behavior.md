# Behavior review

Own the following checks unless the parent explicitly reassigns a subset. Read only code needed to cover the assigned surface and verify findings.

## B1 — Requirements and integration

Trace the requested observable outcome through the changed path, including persisted data, API and consumer when relevant. Catch missing wiring, placeholders, wrong-problem fixes, and unauthorized behavior changes in every review mode; a diff-only request does not erase supplied requirements.

## B2 — Logic and edge cases

Trace reachable empty, null, boundary-size, off-by-one, pagination, encoding, locale, coercion and mutation cases. Distinguish valid no-match outcomes from incomplete required work; avoid inventing impossible inputs for a validated internal contract.

## B3 — Failure and completion semantics

Follow thrown errors and ordinary returns. Catch broad catch-to-default, silent truncation, dropped stream events, empty or malformed required model/tool output accepted as success, and canned completion hiding failure. Preserve a documented fallback that actually satisfies the contract.

## B4 — UI states and interaction

Inspect every touched frontend for loading, empty, error, pending, cancellation, retry, duplicate-submit and optimistic rollback behavior. Check newest-request-wins, unsaved edits, reload and shareable navigation where required. Runtime owns the underlying concurrency mechanism; this check owns observable UI behavior.

## B5 — Accessibility and layout

Check semantics, labels, keyboard operation, focus visibility/trapping/restoration, async announcements, long content, media failures, responsive layout and reduced motion. Follow the actual design system; do not require a particular library, tooltip on every icon, or new aesthetic direction.

## B6 — Language and presentation

Check user-facing text against its context, established localization, locale-sensitive numbers/dates, and changed translations across affected locales. Names and status messages must describe the actual action/result, not expose internal implementation jargon.

## B7 — Regression seam

Map changed behavior to tests or explicit manual evidence that would fail for the observed regression. A shallow unit around one caller cannot prove a multi-caller or cross-layer invariant; check the real seam and original reproduction.

## B8 — Negative and lifecycle tests

Check malformed/missing input, failure, permission denial, cancellation, retry, idempotency and restart cases relevant to the changed contract. Serializer coverage includes invalid discriminators/nested values and round-trip preservation where those are real inputs. Do not demand unrelated case inventories.

## B9 — Test signal

Catch tautological expectations, tests rebuilding the production algorithm, no-op assertions, excessive mocking and brittle non-contract literals. Call-count assertions can be legitimate for idempotency or I/O contracts. Do not delete a test merely because it is mocked or old.

## B10 — Qualitative evaluations

For LLM changes, check representative source-to-output evidence, contradictory context, valid no-result cases, and positive proof of a new intended model/validator invocation. Cached rows or schema-valid JSON do not prove a quality improvement; keyword allowlists cannot replace semantic evaluation.

## B11 — Test ownership and fixtures

Inspect changed tests and directly related fixtures for abandoned coverage, duplicated factories, accidental skips/only filters and tests of the wrong implementation. Recommend shared fixtures only when semantics really match.

## B12 — Validation completeness

Reconcile reported checks with actual commands, versions, outputs and reviewed snapshot. Note untested frontend surfaces or deployment paths. Tests passing on an earlier tree or a different model/runtime are not evidence for the present change.
