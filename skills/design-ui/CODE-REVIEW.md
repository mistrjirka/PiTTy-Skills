# Scoped UI implementation checks

Inspect only applicable changed behavior; a checklist is not a quota of findings.

- Compare the changed screen with two existing reference screens and the parent layout. Reuse matching components, spacing, content density, navigation and terminology. Do not introduce a parallel visual pattern without a product requirement.
- Verify that human-readable names are resolved for people, documents, folders, libraries and tickets. Do not use GUIDs or internal codes as fallback display names. Treat failed resolution explicitly; keep IDs in deliberate diagnostics when needed.
- Actions use semantic controls; navigation retains link semantics. Accessible names may come from text, labels or ARIA. Native controls do not need redundant keyboard handlers.
- Keyboard focus is visible and managed through dialogs and errors. Announcements convey meaningful async status without repeated noise. Do not disable zoom or ordinary paste/password-manager workflows.
- Form inputs have useful labels, types and validation feedback. Submit gating follows the actual valid/pending state; neither always-enabled nor always-disabled is a universal rule.
- Loading, empty, stale, pending, error, cancellation and recovery states reflect real data. Late responses cannot silently overwrite newer intent. Optimistic output is reconciled, not represented as server-confirmed before acceptance.
- Content wraps or truncates intentionally without hiding required information. Check narrow viewports, zoom, theme, localized strings, missing media and layout shift.
- Effects and subscriptions clean up correctly. Review hydration-sensitive dates/state and controlled input handlers in the detected framework.
- Measure expensive renders, payloads and request dependencies before prescribing virtualization, memoization or another library. Preserve accessible behavior through any optimization.
- Follow product typography/copy conventions; punctuation, font names and field counts alone are not defects.
