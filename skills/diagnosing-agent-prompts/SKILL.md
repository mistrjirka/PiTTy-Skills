---
name: diagnosing-agent-prompts
description: Use when an agent workflow is slow, repetitive, overengineered, misses delegation/escalation, or otherwise behaves badly and you need to decide whether the cause is prompting, model behavior, runtime/tooling, or task setup before editing prompts.
---

# Diagnose agent prompts before changing them

Treat a bad trace as evidence, not as proof of a prompt defect. The goal is to identify the smallest causal layer that explains the behavior, then change only that layer.

## Reconstruct the actual behavior

Read the full relevant trace as a timeline. Mark task-shaping research, first mutation, implementation loops, tool waits, recovery, review, follow-up work and finalization. Separate model-side decision time from tool/network/runtime wait. Count underlying operations, assistant tool turns, bundled calls, retries, rereads, repeated edits, delegated work and escalation attempts. At each delegation boundary, distinguish what the parent knew from what the child actually received or retrieved. Track accepted decisions, established evidence, hypotheses and unknowns separately; do not attribute parent-session context to a child unless the handoff or an observed retrieval supplied it.

Normalize comparisons before drawing conclusions: compare raw wall time, TTFT-normalized time, time to first mutation, first-mutation-to-final time, per-operation latency, cost/tokens and rework. When one tool call contains several concurrent operations, compare underlying operations as well as outer calls.

## Classify the cause before editing

Test these explanations in order:

1. **Task/setup artifact** — different prompt, starting files, credentials, model, reasoning level, installed prompt, stale child, or manual steering made the runs incomparable.
2. **Tool/runtime behavior** — unavailable tools, controller timeouts, network/API latency, warnings, sandbox restrictions or connector behavior caused the symptom.
3. **Prompt interaction** — the loaded root/role/skill stack contains duplicated, competing or overly broad instructions that predict the behavior.
4. **Model behavior/capability** — the model still fails a simple explicit controlled probe even when the desired behavior is stated directly and no conflicting prompt machinery remains.

Do not infer model incapability from one production trace. Where practical, run a small controlled probe that isolates the disputed behavior: same-turn tool batching, use of an escalation tool on a clearly blocking non-obvious condition, or stopping after an exploratory artifact reaches its stated acceptance condition. A successful direct probe proves the capability exists; it does not by itself prove the production prompt elicits it reliably.

## Audit the whole loaded prompt

Inspect the rendered root prompt, role prompt, relevant skill text and model-facing tool descriptions together. Look for stronger generic instructions that override a newer narrow rule, duplicated ownership, contradictory stop conditions, generic correctness language that expands exploratory work, or tool descriptions whose trigger is broader/narrower than the role prompt.

Prefer one owner for each policy. Remove or replace stale wording rather than appending another exception. Preserve established wording unless there is concrete evidence it is redundant, contradictory or based on a mistaken interpretation.

Use current model-provider prompting guidance as secondary evidence, not as a substitute for the trace. The observed workflow and controlled probes decide whether a rule helps.

## Make the smallest general correction

Change one policy group at a time. Write for the recurring shape of the failure, not the benchmark instance. Prefer positive outcome/decision boundaries over long lists of prohibitions. Avoid exact command counts, benchmark entity names, rigid schemas, mandatory ceremonies, taxonomies the model must classify before acting, or rules that turn optional review/testing into required workflow.

For exploratory/prototype work, preserve the user's intended artifact scale. A discovered adjacent imperfection becomes required work only when omitting it prevents the requested outcome at that scale or violates an explicit constraint.

For escalation, distinguish **a changed route** from **a blocked outcome**. A worker should take an obvious local correction or simple direct alternative itself. Escalate when the requested outcome is blocked and resolving the blocker requires non-obvious diagnosis or a material decision the parent should own.

## Validate the change

Run static prompt/package checks first, then controlled behavior probes where they can distinguish prompt from capability. Only after those pass should a full benchmark be used to judge end-to-end effect. Let an end-to-end benchmark finish without manual steering; intervene only for a genuine safety problem, infrastructure failure or condition that invalidates the comparison itself.

Judge success by task quality plus wall time, TTFT-normalized time, first-edit latency, action count, per-operation speed, batching, rework, token/cost use and whether required behavior occurred for the right reason. Do not keep a rule merely because one benchmark got faster.
