---
name: impl-check
description: Use for a deep implementation review or a completed high-risk cross-layer change requiring independent review.
---

# Impl-check in Pi

Keep four independent roles: impl-check-behavior (B1–B12), impl-check-contracts (C1–C12), impl-check-design (D1–D12), impl-check-runtime (R1–R12). All four are required for a complete review. Use their installed Pi definitions, not OpenCode launch syntax or a self-review impersonating four agents.

Establish the actual target: user request, worktree, base/comparison semantics, staged/unstaged/deleted/relevant untracked changes, governing conventions and validation evidence. A branch's own tracking ref is not automatically its review base. Give all children the same snapshot ID, full relevant diff location, paths and assigned checks. Include useful graph source evidence for their assigned area, without replacing the diff or making all four reviewers repeat the same broad search. Do not exclude tests or required new files. The parent collects VCS evidence because reviewers cannot execute shell commands.

When responsive layout is in scope, supply rendered evidence for B5 from the affected page with its real shell and representative content. Capture the reported size or zoom and the relevant wrap or overflow transition; if the runtime or browser is unavailable, state what could not be verified.

## Scheduling

Use the currently configured Pi subagent scheduling, not assumptions about the standing prompt. When independent reviewers are available, run them concurrently against one stable snapshot. Launch the four exact reviewer profiles with `agent_spawn`. Models/thinking come from profile/settings, not spawn arguments. Keep the snapshot stable until all required reports arrive.

Twelve groups per role do not imply equal execution time. Assign every applicable check one owner; transfer a coherent subset before dispatch only when doing so reduces a clear imbalance. Pass transferred instructions to their new owner and do not drop them from coverage. Keep the snapshot stable until reports arrive.

## Evidence and disposition

Capture every raw report, child ID, actual reported model and snapshot. Do not equate exit/completed state with a clean review. If a report is incomplete or unclear, recover the raw output and ask only for the missing material coverage; formatting differences are not findings and do not require converting a useful report into another schema.

Read every finding and gap before synthesis. Verify the cited code, callers, existing controls and version-specific evidence before creating fix work. Prohibited casts introduced or materially touched by the diff and duplicate canonical contracts are policy/maintenance findings even when tests pass; unrelated baseline debt is not a reason to widen the change. Do not turn "more validation would be nice" into a finding or gap unless a concrete material behavior/risk cannot be judged from current evidence. A validation-only recommendation whose risk is already judgeable is a note, not an implementation defect. Retain every raw finding ID and account for it once as fixed, disproved, duplicate, deferred, accepted-gap, needs-input or open; preserve concrete evidence and authority for that disposition. Once the parent or user explicitly accepts or defers a finding/gap, keep that disposition unless new evidence materially changes the risk or the user changes the decision.

Keep a concise disposition record tied to the reviewed snapshot; no JSON conversion or mechanical accounting step is required. Review snapshots and material validation must match the final code. Missing roles, blocked material coverage and open material findings prevent an unqualified PASS. Severity alone does not force another implementation cycle: a medium item that only asks for stronger validation may be accepted as a documented gap when current evidence is sufficient, while blocker/high concrete defects normally remain unresolved unless the user explicitly accepts the risk.

Review is read-only unless the user also authorized fixes. Send only verified findings worth fixing now back to the persistent implementer; do not bundle every medium/low note into a new implementation task. After a fix, rerun only validation directly affected by that change. Recheck only affected findings/roles; four full reruns require a material scope/risk change that invalidated prior coverage. A focused reviewer follow-up may be fresh and include the previous report plus unresolved finding IDs.

## Result

Report coverage (complete/partial/blocked), verdict, verified findings in severity order, dispositions of previous findings and material validation gaps. State actual commands/results and unresolved decisions. Never summarize contradictory child reports as unanimous acceptance. Finish without automatically running another review skill.
