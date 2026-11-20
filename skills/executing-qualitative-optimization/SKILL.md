---
name: executing-qualitative-optimization
description: Use when implementing an agreed LLM quality experiment and validating it against representative real sources.
---

# Execute a qualitative experiment

Confirm the source, baseline, hypothesis and acceptance criteria. Load `planning-qualitative-optimization` only if these are missing; load model-specific guidance only when changing model/prompt strategy.

Make one focused change in the owning layer. Test mechanically decidable regressions, then run the agreed representative path within authorized runtime/cost/data bounds. Use `running-real-data-smoke-tests` when integrated execution requires it.

Prove the intended model/tool/validator path actually ran. A new process returning fresh-enough cached rows is a cache test, not a new experiment. Compare output and selected evidence with authoritative source, including contradictory context and valid no-result cases; schema-valid output alone is insufficient.

On failure inspect rendered context, tool/schema semantics and retry state before adding prompt clauses. Use a bounded, redacted trace for repeated or ambiguous symptoms. Preserve accepted results during safe recovery. Do not repeatedly spend on an unchanged hypothesis or expand a paid evaluation without authorization.

Record results in an existing experiment location when useful. Stop on accepted semantic and mechanical results, an exhausted agreed experiment budget, or a concrete access/product/external blocker. Report the failed hypothesis and remaining gap; do not describe partial implementation or a successful API call as a quality improvement.
