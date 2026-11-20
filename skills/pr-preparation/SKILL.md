---
name: pr-preparation
description: Use when checking a named branch or PR for release readiness, configuration, migration and validation gaps.
---

# PR readiness

Check whether the specific change can be reviewed and deployed safely. This is a read-only audit unless fixes are separately authorized; do not publish, rewrite history, modify deployment data or clean files automatically.

Resolve the PR/base and reviewed head/worktree. Inspect the complete change, required checks and directly relevant deployment documentation. Ask only when the target cannot be resolved from available repository/PR information. Do not compare a pushed branch only against its own tracking tip.

Check the relevant surfaces:
- actual test/typecheck/build/lint results for this snapshot;
- introduced services, dependencies, assets, exports and production provisioning;
- required configuration across runtime, templates, CI/deployment and setup docs;
- migration compatibility with already deployed versions, data/backfill order, locking and recovery;
- accidental credentials, generated files, debug artifacts and unrelated edits;
- required release or API notes and directly affected operational documentation.

Never assume migrations have not run elsewhere. Do not consolidate deployed migrations, delete migration records or run down migrations as a readiness shortcut. Multiple expand/migrate/contract steps may be intentional. Test risky data changes only on an explicitly disposable/authorized environment.

Prefer repository validation scripts after inspecting their effects. Historical scan helpers are not a required pipeline and their output is only candidate evidence. Do not delete tests, backup files or another contributor's changes merely because a scanner flags them.

Use `impl-check` only when a deep review is requested or risk warrants it; reuse an existing review if its snapshot still matches. Update project wiki documentation only when authorized, not via an unobserved background writer.

Return blockers, verified warnings, validation gaps, required deployment actions and the exact reviewed target. Do not guess that unchecked tasks are done or claim a deployment/CI result from a local syntax check.
