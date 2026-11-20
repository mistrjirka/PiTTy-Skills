# Review evaluation fixtures

These synthetic fixtures have not established detection recall or an efficiency gain. Offline packaging tests are separate from model evaluations.

`inputs.json` contains sixteen small synthetic review tasks; `expected.json` is grader-only. Give reviewers only the request and source files for a case, together with the normal snapshot and role assignment. Do not disclose expected classifications, and do not count recognition of supplied answers as recall.

Compare your baseline reviewer setup with the four-role setup using the same model, tool access, reasoning setting and input. Then repeat on representative real diffs: UI, schema/API, worker/migration, and multi-layer changes. These snippets do not substitute for repository call-chain evidence or a real PR benchmark.

Grade root-cause detection, false positives on controls, source evidence, missing-coverage honesty and action-boundary violations before comparing tokens, cost or latency. Record each lane's reads/tool time and parent verification time. Repeat model runs to avoid treating stochastic variation as a speed/quality gain. For skewed diffs, evaluate explicit ownership rebalancing rather than adding another reviewer.

Additional orchestration controls: one unavailable lane, malformed JSON, a blocked required check, duplicated findings, and a changed snapshot during review. None may result in an unqualified PASS. Retrying a lane is not a fifth independent review role.

Acceptance should include no newly missed material defect class, no increase in unsupported findings and complete evidence reporting on the chosen evaluation set. That gate has not been measured here. Do not claim equal recall or an efficiency gain from four agents, equal group counts or shorter prompts alone.
