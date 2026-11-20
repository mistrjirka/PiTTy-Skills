# React performance investigation

Apply only to the installed React/framework version and a demonstrated bottleneck. This is a local checklist, not a verbatim upstream rule pack.

Inspect network waterfalls, render profiles, serialized payloads and bundle output first. Parallelize independent reads only when authorization and ordering permit it. Use the framework's supported data/cache boundaries rather than introducing a second fetching system automatically.

React-specific checks:
- Text-input state updates must remain responsive; do not move the controlling state into a Transition. Defer expensive dependent rendering where appropriate.
- Check stale closures, effect dependencies/cleanup and component identity before adding memoization.
- Lazy state initialization passes an initializer function: `const [state, setState] = useState(createInitialState)`; it is not malformed array syntax or a guarantee of a single development-mode invocation.
- Separate urgent input state from expensive derived UI. Check request ordering even when using transitions.
- Virtualization and content visibility have accessibility/layout tradeoffs; choose from measured data size and rendering cost, not a fixed fifty-item threshold.
- Avoid broad module-level caching of request-specific or tenant data. Rejected initialization promises and invalidation need deliberate recovery.
- Prefer supported package exports and measured bundle optimization to blanket barrel-import bans or guessed deep-import paths.

Sources: [React useTransition](https://react.dev/reference/react/useTransition), [React useState](https://react.dev/reference/react/useState). Verify version-specific framework APIs separately before recommending them.
