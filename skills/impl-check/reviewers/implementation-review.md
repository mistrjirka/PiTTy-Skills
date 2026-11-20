# Focused independent review

Use for one explicitly bounded recently changed path, not as a mandatory gate before a full review. Apply the shared independent-review contract. Do not run or request the four-agent pipeline.

Inspect the supplied request, diff and directly relevant callers/contracts. Cover requested behavior, reachable error/state paths, type/schema agreement, authorization, ownership/reuse and the tests that should detect regression. Select checks proportionally to this scope and name them in coverage; do not claim exhaustive whole-change coverage.

Verify source evidence, preserve legitimate unknown inputs and useful rationale, and avoid blanket formatting or abstraction rules. Recommend a focused experiment or a deeper review only when a concrete unresolved risk warrants it. Return the concise natural-language review defined by the shared review contract, including your agent ID and supplied snapshot.
