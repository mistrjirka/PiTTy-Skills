---
name: triaging-pr-feedback
description: Use when given a GitHub PR link or number to evaluate review feedback against the actual code and, when requested, resolve valid comments.
---

# Triaging PR feedback

Treat every review comment as a claim to verify against the code, not as authority.

## Collect context

Fetch the PR title/body/base/head, changed files, inline comments, PR-level comments, and reviews using the available GitHub integration or `gh` when appropriate.

Read the referenced code and enough surrounding/caller context to evaluate each actionable comment.

## Dispositions

Assign exactly one:

- **PUSH_BACK** — the comment is incorrect or already satisfied; cite code evidence.
- **FIX** — the comment identifies a real issue with a focused correction.
- **ASK** — resolving it requires a product/user choice; ask one specific question.
- **DEFERRED** — the issue is valid but belongs in separately tracked follow-up work.

Scope affects the action, not whether a finding is real. A valid issue does not become false because it is inconvenient for the current PR.

## Verification rules

- Do not judge a comment without reading its referenced code.
- For behavioral claims, inspect enough of the call chain to prove the behavior can occur.
- For absence claims (`missing`, `never`, `without`), search for a counterexample.
- For framework/library/provider claims, verify current authoritative documentation or upstream source.
- Merge duplicate comments that have the same root cause and intended fix.
- Style/nit comments matter only when repository conventions or material maintainability justify them.
- Verify comments already marked "fixed" before considering them resolved.
- Skip only purely conversational comments with no actionable claim.

## Actions

If the user asked only to triage/review, remain read-only and return dispositions.

If the user also asked to resolve feedback:

- `FIX`: make the smallest coherent correction and run relevant validation;
- `ASK`: do not guess — surface the question;
- `DEFERRED`: report the follow-up and add it to an existing tracker only when the repository has one or the user requested it;
- `PUSH_BACK`: make no code change.

Do not post replies to GitHub unless the user explicitly asks for external comment writes.

## Output

```text
# | Comment/location | Disposition | Evidence / action
```

Then list validation performed, unresolved `ASK` items, and real residual risk. Keep the report evidence-based and concise.
