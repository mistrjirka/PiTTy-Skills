---
name: design-ui
description: Use when designing, changing, or reviewing user-facing interfaces, including existing pages, layouts, workflows, lists, forms, copy, and async states.
---

# UI design and implementation

Start from the product's actual audience, task, existing interface and installed design system. Reuse its components, tokens, typography and conventions. A bug fix is not authorization to redesign the brand or add a component library.

For a new visual direction, use the supplied brief and real content. Ask only when a missing product choice materially changes the result. Offer alternatives when they help the decision, not as a required phase. Prefer coherent hierarchy and readable density over decorative novelty. Never impose universal font sizes, control heights, spacing, widths, palettes or library choices; derive them from the existing design system and actual usability needs.

## Existing-product visual consistency is the default

When editing an established application, the goal is **to match its existing interface**, not to create a new visual identity. Do not redesign surrounding UI without an explicit request.

Before implementation, inspect the target screen, the parent layout/shell, and at least two comparable existing screens (such as neighboring list, detail or form views). Identify the shared components, theme tokens, layout wrappers and interaction conventions they actually use. State which concrete reference screens and components the change follows. When references disagree, follow the pattern used most consistently for the same task, not a one-off anomaly.

Preserve the existing page width, gutters, header hierarchy, typography, spacing, density, grid/table structure, form layout, navigation, button placement, dialogs, status treatment and responsive breakpoints. Prefer reusing an existing component to imitating it with new markup. Do not add decorative cards, nested containers, oversized headings, new UI libraries or duplicate navigation because they look fashionable.

Same task should use the same component, label and interaction throughout the product. Align corresponding table columns and filter controls; reuse existing tabs, pagination, help, loading and empty-state patterns. Follow the app's navigation icon conventions. Do not add a second Back action, a choice with only one option, or a different control for an already established task. Use links for navigation and buttons for actions; make a row with one destination a clear, accessible target.

Check that the same concept appears with the same name, status, actions and destinations across list, detail and related screens. Do not expose raw GUIDs, opaque database keys or internal event IDs as the primary user-facing label. Use real resolved people, folders, SharePoint libraries, documents and tickets. If resolution fails, show a clear unavailable label or retry rather than guessing a name or rendering the raw ID. Technical IDs belong in deliberate diagnostics or audit surfaces when needed.

After editing, compare the **rendered target beside the reference screens** at relevant desktop/mobile widths. Verify layout alignment, spacing, information hierarchy and behavior, with long text and empty/loading/error states. If rendering is unavailable, explicitly report that visual consistency was not verified. Passing TypeScript or unit tests does not prove visual consistency.

## Prioritize information and screen space

Design around what the user needs to understand, decide or do, not around the fields returned by an API. Identify the primary content and action, the supporting context and the details needed only occasionally. Give each visible element a purpose. Do not give identifiers, timestamps, source labels or other metadata the same prominence as the user's task merely because they exist in the data.

Place the primary content early in the reading order and within the initial viewport when practical. Combine closely related facts into compact groups; avoid separate full-width rows, oversized headers, repeated labels, nested cards and generous padding that push useful content down. Use a card only when its containment or interaction adds meaning. Preserve readable spacing, touch targets and the established design language; density is not a reason to cram or truncate essential content.

Show metadata when it affects trust, decisions, deadlines, troubleshooting or audit requirements. Otherwise demote it to subdued inline text, a secondary area or an accessible details view, or omit it when genuinely unnecessary. Use progressive disclosure for infrequently needed detail, never for information or controls required to complete the current task. In particular, multiple dates should not consume prominent screen space unless their distinct meanings matter to the user.

Avoid redundant headings, repeated status text and prominent implementation explanations. Use the established tooltip or details pattern for optional guidance, but show restrictions, consequences and the information needed to decide directly. Use meaningful duration units and explain when access begins or ends; do not invent limits or approval states.

## Lists, forms and search

Give lists a useful, deterministic default sort. Show the active sort when sorting is available. Growing lists need appropriate filters, pagination and clear filter removal; sort and paginate the full result set, not only the visible page. Reuse existing table and row styles, search human names as well as meaningful identifiers, and preserve filter state using the project's established conventions.

For forms, keep the primary action near the relevant content and make Save, Cancel, Publish and destructive actions match actual eligibility. Do not offer duplicate or meaningless actions. Explain disabled controls on keyboard focus as well as hover, without hiding important reasons from assistive technology.

## Define behavior before rendering

List the states relevant to the changed component: initial, loading, empty, ready, stale/refreshing, editing, pending, error, cancelled and unavailable. Define the primary action and recovery for each applicable state. Keep pending work distinct from confirmed success; optimistic changes need a deliberate rollback/reconciliation policy.

Check duplicate actions, out-of-order responses, late results after cancellation, reload/reattachment and unsaved edits where the feature requires them. Expose server permissions accurately; UI controls never replace authorization.

Trace the actual workflow across navigation, list, detail, action and result, including each materially different user role. Approval, a success badge or a working endpoint is not the outcome if the user still cannot access the requested information or action. Do not split essential information into misleading fragments, such as a preceding question without its reply when reviewing a complete exchange. Distinguish a redacted preview from approved context and original content; only promise what authorized backend reads can deliver. Check older records as well as newly created ones when both are in scope.

## Build for actual use

Use semantic controls, accessible names and visible focus. Preserve keyboard navigation, dialog focus restoration, meaningful validation errors, password-manager/paste behavior and reduced motion. Test long/localized text, sparse data, missing images, narrow viewports, zoom and realistic content sizes. Keep navigation and shareable state in the URL when useful, not every local toggle.

Describe actual actions and outcomes in consistent product language. Give useful error/empty states without fabricating progress, confidence scores or source support for AI output.

## Validate

Use [CODE-REVIEW.md](CODE-REVIEW.md) for the changed UI's implementation checks. Use [EVALUATION.md](EVALUATION.md) for a requested UX audit, [COMPONENTS.md](COMPONENTS.md) for component-specific branches, and [REACT-PERFORMANCE.md](REACT-PERFORMANCE.md) only for a relevant React performance issue.

Run the project's focused checks and inspect the rendered result at relevant sizes when browser/rendering tools are available. Compare actual screenshots with the reference screens, especially after a complaint about visual consistency: a DOM snapshot or passing typecheck cannot show incorrect styling, alignment or clipping. Exercise the relevant user-like interactions and roles, including failure states; recheck after meaningful revisions. Ensure documentation screenshots show the current, fully styled application and enough of the workflow to be understandable. Report source-only or unavailable visual validation explicitly. Do not claim a browser, accessibility or performance test ran when it did not.
