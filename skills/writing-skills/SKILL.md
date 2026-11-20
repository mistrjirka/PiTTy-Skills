---
name: writing-skills
description: Use when creating or auditing SKILL.md, Pi agent profiles or reusable coding-agent instructions.
---

# Writing useful skills

Judge the complete agent setup by task success, code quality and useful work per elapsed time, not prompt length, tool-use counts or one recently observed failure.

Before editing a clause, inspect its actual rendered context: parent instructions, selected scheduling profile, child role, skills, tool descriptions and runtime permissions. Identify whether the failure is missing evidence, conflicting instructions, wrong tool access, scheduling, model judgment or result handling. A permission/configuration defect cannot be repaired by repeating a prompt instruction.

## Keep the right level of detail

State the desired outcome, evidence, authority boundaries and stopping condition clearly. Give the agent enough guidance to choose the next useful action; avoid both vague encouragement and a rigid script for every situation. Fix the general failure mechanism, not a list of identifiers from one incident. Do not make using a tool or creating an artifact the goal.

Keep true safety and user conventions hard, including type-system integrity and validated untrusted boundaries. Follow the project's owning validation pattern; use Zod where it owns that boundary rather than making one library a universal workflow rule. Express retrieval choices, validation depth and performance heuristics conditionally. A new reminder must not cancel another role, require redundant reads, forbid valid input or expand the task. Preserve useful safeguards unless evaluations justify changing them.

## Place each rule once per context

Use existing project instructions for project conventions, shared sources for rules every role needs, role prompts for specialist decisions, an on-demand reference for versioned syntax and edge cases, and scripts for mechanically decidable checks. Do not add agent directories to application projects. One shared source rendered into separate child contexts is intentional; duplicate instructions inside the same context are not.

Descriptions identify trigger tasks or symptoms, not the workflow inside. Prefer a few contrasting examples over exhaustive scenario lists. In particular, pair a case that should use a tool with a case that should not, and a true defect with legitimate similar-looking code.

## Validate the whole setup

After a change, inspect the generated parent and child prompts, cross-references, tool access and both scheduling variants. Keep Pi metadata distinct from OpenCode metadata and consult the installed tool guide instead of inventing arguments.

Run local wiring checks, then compare representative tasks on the actual main/helper models: ordinary edits, structural work, uncertain diagnosis, reviews, missing/stale evidence and long sessions. Track correctness, false positives, unnecessary calls, rereads and elapsed time together. Keep a previous baseline and change a related behavior group at a time. Passing fixture tests or a shorter prompt does not establish live-model improvement.
