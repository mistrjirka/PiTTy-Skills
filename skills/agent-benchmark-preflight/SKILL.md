---
name: agent-benchmark-preflight
description: Use immediately before launching an agent/prompt benchmark or A/B run to verify the comparison is controlled, reproducible and safe to leave unattended.
---

# Preflight an agent benchmark

Do not start the run until the compared inputs and runtime state are known. The benchmark should answer one question, not mix prompt, model, environment and workflow changes.

## Freeze the comparison

Record the exact user prompt bytes/hash and reuse them unchanged. Hold the model/provider, reasoning setting, agent profile, sampling/runtime settings and benchmark task constant unless that variable is the explicit A/B. Record the tested prompt/runtime commits or installed hashes.

Use a clean task directory with only the intended starting files. Verify sensitive fixtures such as `.env` by hash/size rather than contents; never print credential values. Confirm the starting directory contents before launch and make sure no output from an earlier run remains.

Verify that the installed rendered prompt/agent files actually contain the revision being tested and that the runtime/extension checkout is the expected commit. Static repository HEAD alone is not enough when installed files are symlinked/generated or a separate runtime repository supplies tools.

## Eliminate stale state

Confirm no prior benchmark process, tmux session, resident child or stale controller is still participating in the test. Start a new agent session/context unless reuse is intentionally being measured. Do not let prior benchmark artifacts or cached conversation state become hidden input.

Launch long runs detached from the controlling connector so controller loss cannot kill the benchmark. Write an exit marker/status and preserve the session logs needed for later attribution.

## Verify the benchmark contract

Before launch, be able to answer:

- What single policy/model/runtime difference is this run testing?
- What is held identical to the comparison run?
- What constitutes task success independent of speed?
- Which outputs must exist, and which failures are acceptable documented blockers?
- Which user constraints must remain exact rather than paraphrased away?
- Is any manual intervention planned? If yes, it is not an unattended comparable run unless the same intervention protocol applies to both sides.

Do not add benchmark-only hints that leak the known failure unless the experiment is explicitly a targeted capability probe rather than an end-to-end benchmark.

## Observe without steering

During an end-to-end benchmark, monitor process health and logs but do not inject improvements because you notice a better route. Let the configured root/worker system expose its own behavior. Intervene only for a genuine safety problem, infrastructure failure or condition that invalidates the benchmark itself.

A targeted capability probe is different: it may use an explicit minimal instruction designed to answer one question such as “can this model emit two independent tool calls in one assistant turn?” Label it as a probe and do not compare its completion time with the full task benchmark.

## Collect comparable measurements

At completion record at least:

- raw user-to-final wall time;
- TTFT and TTFT-normalized wall time;
- user-to-first-mutation and first-mutation-to-final time;
- phase breakdown (preflight/research, implementation, recovery, review/follow-up, finalization);
- root and child cost/tokens;
- underlying tool operations and assistant tool turns;
- bundling histogram and examples;
- tool/network wait versus model-side time;
- per-operation and post-tool decision latency;
- retries, repeated edits/rereads, escalations and delegated subresearch;
- final artifact quality and any false blocker or unfinished required path.

Read the detailed trace before changing prompts. Faster failure is not an improvement, and a slower run may be better only if the quality difference actually corresponds to the requested outcome rather than extra engineering scope.
