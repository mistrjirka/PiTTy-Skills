---
name: plan
description: Create or revise a task plan when the user asks for planning. Not needed to execute an already approved plan.
---

# Create or revise a plan

Apply this skill to the current planning request, not to later implementation requests. Investigate and prepare the plan without changing application code or external state. You may write the plan file. A later user instruction to implement ends this planning-only restriction. A previously approved plan does not authorize execution while the user is asking to revise it.

Read the user's request and relevant code. Recover prior decisions from memory or session search where useful, then verify their applicability. Ask about material uncertainties or contradictions that the available evidence cannot resolve. Do not ask the user to repeat known decisions or choose ordinary implementation details. Do not present compatible goals as alternatives or imply that listed options are exhaustive.

Reuse the plan file identified for this task. Otherwise save one plan.md in a descriptive task directory under .pi/plans/ in the current project and report its path. Do not overwrite another task's plan. No separate intent file, decision log, planner agent, or review package is required.

## Plan structure

Use the following four sections as a compact outline, not a form to fill. A section can be one sentence. Do not invent details, hypothetical capabilities, unnecessary layers, or tests to populate the outline. Leave exploratory discussion, unselected examples, and routine findings in the conversation unless they materially change the agreed task.

```markdown
# Task title

## Goal and constraints
What should work differently when this task is complete, and why?
Preserve essential user requirements and explicitly chosen approaches.
Include important exclusions. Keep exact user wording where it matters.

## Approach
Describe the chosen solution, grouped by behavior or subsystem.
Identify existing mechanisms to reuse and critical files or interfaces.
State dependencies and execution order only where they affect correctness.
Include enough detail to prevent mistakes, not every coding decision.

## Verification
State observable results that demonstrate the requirements are met.
Identify the authorized checks and their expected results.
Do not add new tests unless requested or explicitly approved.
Distinguish implemented behavior from verified behavior.

## Decisions and remaining work
Record important accepted choices and brief reasons where useful.
Record only open questions that block a decision and proposals that affect scope.
During execution, update at meaningful milestones with a short account of completed, remaining,
and blocked work. Do not maintain a running transcript.
```

Describe each implementation step as an actual change in behavior, not a vague phase such as "add validation." Present the chosen approach rather than a catalogue of discarded alternatives. For repeated changes, describe the pattern once and give representative paths instead of listing every file and line. Mark proposed test work as awaiting approval unless already requested.

## Ready for execution

A plan is ready when the requested outcome, constraints, consequential decisions, explicitly chosen approach, and authorized completion checks are clear. Resolve material open questions before starting work that depends on them. Do not treat silence, an assumption, or your recommended option as an accepted user decision. Routine coding details remain for the implementing agent to decide. Do not seek exhaustive detail merely to eliminate every possible decision.

Present the plan for approval. During revision, preserve useful progress and clearly identify material changes to scope, behavior, or an agreed approach. Once the user approves implementation, follow the normal plan-use instructions and carry out the plan. Do not keep applying planning-only restrictions or require a separate execution command.
