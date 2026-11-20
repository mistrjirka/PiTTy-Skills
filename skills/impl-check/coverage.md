# Review coverage


This map assigns 48 check groups to four independent roles. It records intended coverage, not measured detection recall. Useful defect classes are retained without treating every old heuristic or similar-looking case as a finding.

| Check | New owner | Retained or added concern |
| --- | --- | --- |
| B1 | behavior | Requirements and integration |
| B2 | behavior | Logic and edge cases |
| B3 | behavior | Failure and completion semantics |
| B4 | behavior | UI states and interaction |
| B5 | behavior | Accessibility and layout |
| B6 | behavior | Language and presentation |
| B7 | behavior | Regression seam |
| B8 | behavior | Negative and lifecycle tests |
| B9 | behavior | Test signal |
| B10 | behavior | Qualitative evaluations |
| B11 | behavior | Test ownership and fixtures |
| B12 | behavior | Validation completeness |
| C1 | contracts | Type-system integrity |
| C2 | contracts | Narrowing and named contracts |
| C3 | contracts | Producer-consumer agreement |
| C4 | contracts | Serialization and validation |
| C5 | contracts | Schema and environment boundaries |
| C6 | contracts | Authorization and tenancy |
| C7 | contracts | Authentication and session integrity |
| C8 | contracts | Untrusted inputs and sinks |
| C9 | contracts | Uploads and filesystem boundaries |
| C10 | contracts | Sensitive data |
| C11 | contracts | Abuse bounds |
| C12 | contracts | Transport and framework controls |
| D1 | design | Ownership and dependency direction |
| D2 | design | Public surfaces and abstractions |
| D3 | design | Existing owner and reuse |
| D4 | design | Flawed precedent |
| D5 | design | Duplication and decomposition |
| D6 | design | Module depth and simplicity |
| D7 | design | Root-cause placement and scope |
| D8 | design | Dead code and compatibility |
| D9 | design | Names and discoverability |
| D10 | design | Type and prompt organization |
| D11 | design | Documentation and rationale |
| D12 | design | Diff hygiene and packaging |
| R1 | runtime | Async ordering and concurrency |
| R2 | runtime | Cancellation and resource lifetime |
| R3 | runtime | Atomicity and idempotency |
| R4 | runtime | Restart and durable identity |
| R5 | runtime | Persisted compatibility |
| R6 | runtime | Migration rollout |
| R7 | runtime | Schema and query behavior |
| R8 | runtime | Performance and allocation |
| R9 | runtime | Cache correctness |
| R10 | runtime | External resilience |
| R11 | runtime | Configuration and deployment |
| R12 | runtime | Observability and temporary controls |

## Boundaries that avoid repeated work

Behavior owns observable failure/UI outcomes and regression evidence. Contracts owns representation, validation and trust. Design owns module ownership, reuse and maintenance structure. Runtime owns execution, persistence and operational mechanisms. Shared symptoms may require neighboring reads, but the parent retains one root-cause finding, not four duplicates.

Twelve groups per role is a default partition, not a timing claim. A schema-heavy API diff can overload contracts; a migration/worker diff can overload runtime. Transfer a named coherent check subset with its files before dispatch, preserving one owner per group and all applicable coverage. Use real evaluation timing to refine this distribution.

## Deliberately corrected criteria

- Unverified security controls produce gaps, not automatic medium-severity findings.
- Legitimate unknown boundary input, canonical runtime-derived types and translated errors are preserved.
- Do not consolidate already deployed migration history or delete migration records.
- Keep useful rationale and meaningful tests; no automatic test deletion or naming rewrite during review.
- No fixed UI field/card/font rules, mandatory libraries, blanket schema-size constant, or guessed framework requirement.
- Empty, inapplicable, blocked and missing lane results are distinguished. No PASS from incomplete coverage.
- Review requirements in diff mode; do not rely on OpenSpec artifacts or an external intent file.
- Prove a helper/guard dead before removing it. A useful abstraction hides complexity; removal that spreads it is not a reason to delete the abstraction.
