---
name: design-ui
description: Use when designing or changing user-facing layout, interaction, forms or async UI states.
---

# UI design and implementation

Start from the product's actual audience, task, existing interface and installed design system. Reuse its components, tokens, typography and conventions. A bug fix is not authorization to redesign the brand or add a component library.

For a new visual direction, use the supplied brief and real content. Ask only when a missing product choice materially changes the result. Offer alternatives when they help the decision, not as a required phase. Prefer coherent hierarchy and readable density over decorative novelty; no universal font, color or layout bans.

## Existing-product visual consistency is the default

When editing an established application, the goal is **to match its existing interface**, not to create a new visual identity. Do not redesign surrounding UI without an explicit request.

Before implementation, inspect the target screen, the parent layout/shell, and at least two comparable existing screens (such as neighboring list, detail or form views). Identify the shared components, theme tokens, layout wrappers and interaction conventions they actually use. State which concrete reference screens and components the change follows. When references disagree, follow the pattern used most consistently for the same task, not a one-off anomaly.

Preserve the existing page width, gutters, header hierarchy, typography, spacing, density, grid/table structure, form layout, navigation, button placement, dialogs, status treatment and responsive breakpoints. Prefer reusing an existing component to imitating it with new markup. Do not add decorative cards, nested containers, oversized headings, new UI libraries or duplicate navigation because they look fashionable.

Check that the same concept appears with the same name, status, actions and destinations across list, detail and related screens. Do not expose raw GUIDs, opaque database keys or internal event IDs as the primary user-facing label. Use real resolved people, folders, SharePoint libraries, documents and tickets. If resolution fails, show a clear unavailable label or retry rather than guessing a name or rendering the raw ID. Technical IDs belong in deliberate diagnostics or audit surfaces when needed.

After editing, compare the **rendered target beside the reference screens** at relevant desktop/mobile widths. Verify layout alignment, spacing, information hierarchy and behavior, with long text and empty/loading/error states. If rendering is unavailable, explicitly report that visual consistency was not verified. Passing TypeScript or unit tests does not prove visual consistency.

## Prioritize information and screen space

Design around what the user needs to understand, decide or do, not around the fields returned by an API. Identify the primary content and action, the supporting context and the details needed only occasionally. Give each visible element a purpose. Do not give identifiers, timestamps, source labels or other metadata the same prominence as the user's task merely because they exist in the data.

Place the primary content early in the reading order and within the initial viewport when practical. Combine closely related facts into compact groups; avoid separate full-width rows, oversized headers, repeated labels, nested cards and generous padding that push useful content down. Use a card only when its containment or interaction adds meaning. Preserve readable spacing, touch targets and the established design language; density is not a reason to cram or truncate essential content.

Show metadata when it affects trust, decisions, deadlines, troubleshooting or audit requirements. Otherwise demote it to subdued inline text, a secondary area or an accessible details view, or omit it when genuinely unnecessary. Use progressive disclosure for infrequently needed detail, never for information or controls required to complete the current task. In particular, multiple dates should not consume prominent screen space unless their distinct meanings matter to the user.

## Define behavior before rendering

List the states relevant to the changed component: initial, loading, empty, ready, stale/refreshing, editing, pending, error, cancelled and unavailable. Define the primary action and recovery for each applicable state. Keep pending work distinct from confirmed success; optimistic changes need a deliberate rollback/reconciliation policy.

Check duplicate actions, out-of-order responses, late results after cancellation, reload/reattachment and unsaved edits where the feature requires them. Expose server permissions accurately; UI controls never replace authorization.

## Build for actual use

Use semantic controls, accessible names and visible focus. Preserve keyboard navigation, dialog focus restoration, meaningful validation errors, password-manager/paste behavior and reduced motion. Test long/localized text, sparse data, missing images, narrow viewports, zoom and realistic content sizes. Keep navigation and shareable state in the URL when useful, not every local toggle.

Describe actual actions and outcomes in consistent product language. Give useful error/empty states without fabricating progress, confidence scores or source support for AI output.

## Validate

Use [CODE-REVIEW.md](CODE-REVIEW.md) for the changed UI's implementation checks. Use [EVALUATION.md](EVALUATION.md) for a requested UX audit, [COMPONENTS.md](COMPONENTS.md) for component-specific branches, and [REACT-PERFORMANCE.md](REACT-PERFORMANCE.md) only for a relevant React performance issue.

Run the project's focused checks and inspect the rendered result at relevant sizes when browser/rendering tools are available. Verify actual interaction and failure states, not just a screenshot of the happy path. Report source-only or unavailable visual validation explicitly. Do not claim a browser, accessibility or performance test ran when it did not.
