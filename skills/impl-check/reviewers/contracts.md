# Contracts review

Own the following checks unless the parent explicitly reassigns a subset. Read only code needed to cover the assigned surface and verify findings.

## C1 — Type-system integrity

Flag `as unknown as T`, `as any`, `as never`, and equivalent chained assertions introduced or materially touched by the reviewed change, including angle-bracket syntax, intermediate variables and helper-hidden casts. A cast from unvalidated `unknown` to a claimed domain type is not narrowing. Confirm the actual expression rather than flagging text in comments. New escapes are acceptance-blocking convention violations without needing to invent a runtime failure; a claimed SDK limitation, justification comment, lint waiver or passing tests does not exempt them. Pre-existing assertions outside the changed behavior are baseline debt, not automatic findings for this review.

Catch equivalent evasions: unchecked generic decoders claiming any requested T, lying type predicates/assertion functions, fake exhaustive fallbacks, dishonest test mocks, added suppressions or weakened compiler/lint settings that replace a real correction. Fix the type/contract, use constrained generics or validate/narrow real input; do not replace one escape with another. Malformed-input tests should use the actual untrusted-input entry point, not widen unrelated domain APIs. Preserve `as const`, checked `satisfies` expressions and real guards; they are not type-erasing assertions.

## C2 — Narrowing and named contracts

Audit every changed `unknown` use, including `Record<string, unknown>` and generic defaults: why can an existing named type, known union or constrained generic not represent the actual value? `unknown` is an exceptional input/error-boundary type, not a substitute for investigating an SDK or domain contract. Raw external input or a caught value may legitimately be unknown; keep it local to real validation/narrowing and expose named typed values downstream. Do not require a cast, `any` or redundant validation to eliminate an honest boundary input.

Keep canonical schema/constant-derived types; flag incidental inference from another module implementation when it weakens the public contract. An empty C1/C2 result must account for changed escapes and each new unknown boundary with concrete evidence, not a blanket generic-utility or SDK exception.

## C3 — Producer-consumer agreement

Read both ends of changed DTOs, public APIs and events. Check field names, optionality, nullability, enum variants, versions, status/envelope semantics and required invariants. Include consumers affected by newly added union variants.

## C4 — Serialization and structural validation

Check JSON, persisted blobs, messages and model outputs against their real schemas, including round trips, undefined values and reachable unsupported serialization values. A cast is not parsing.

For changed TypeScript trust boundaries, follow the project's owning validation pattern. Flag ad-hoc structural parsing when it duplicates an existing schema, is incomplete/unsafe, or reconstructs a domain object through casts/probing instead of the established validator. Use/reuse Zod when that is the owning project pattern; do not require a new Zod schema merely because one could express a small local check. Simple predicates over already typed values and narrow guards for one local branch are ordinary logic, not a C4 violation.

Runtime owns migration rollout and historical-data recovery.

## C5 — Schema and environment boundaries

Validate untrusted TypeScript data with the established validator at the owning boundary and reuse existing environment/schema parsers; in projects where Zod owns that boundary, reuse/compose its schema and derive static types where appropriate. Catch unconstrained identity choices and semantic coverage gaps. Do not replace an established schema with an assertion or an incomplete ad-hoc guard tree, and do not introduce a second validation system into trusted typed internals.

## C6 — Authorization and tenancy

Trace trusted actor/tenant state and resource ownership through the changed path, including indirect lookups and caches. UI gating is not server authorization. Inspect inherited middleware/guards before declaring a missing control.

## C7 — Authentication and session integrity

Review changed credentials, token/reset expiry and verification, cookie/session handling and signed callbacks against their transport and documented policy. Do not manufacture missing-MFA or algorithm findings without an applicable requirement or reachable weakness.

## C8 — Untrusted inputs and sinks

Trace user-controlled data to queries, shell invocation, HTML/templates, paths, URLs, redirects and deserialization. Identify the source, sink and existing validation/encoding/allowlist. Report source-evidenced unsafe handling; do not generate payloads or probe third-party endpoints.

## C9 — Uploads and filesystem boundaries

Check accepted content and size, filename/path containment, symlink escapes, storage/serving behavior and project-required scanning. Evaluate effective platform protections rather than assuming that normalization or a filename extension alone is sufficient.

## C10 — Sensitive data

Check changed source, configuration, client bundles, responses, logs and errors for secret/PII exposure, excess fields and unsafe randomness/credential storage. Redact values in evidence; never reproduce credentials in a review.

## C11 — Abuse bounds

Review attacker-influenced rate, size, depth, complexity, pagination, memory, time and queue fan-out. Establish a real costly/replayable path and existing service/gateway limits before requesting another control. Runtime owns ordinary load performance.

## C12 — Transport and framework controls

Check origins, cookies/CSRF, persistent connections, embedding and relevant security headers at the actual deployment boundary. Equivalent middleware/validation is acceptable; absence of a named package, production introspection or an unverifiable control is not automatically a vulnerability.
