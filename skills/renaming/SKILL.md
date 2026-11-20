---
name: renaming
description: Use when a requested rename spans many files or requires coordinated case-preserving text and path changes.
---

# Coordinated renaming

Inspect repository status and determine whether the rename is semantic (symbols/imports) or textual (content/path patterns). Prefer language-aware refactoring for symbols; use a bulk text tool such as repren only when its matching semantics fit.

Use the installed tool/version and its help before relying on flags. Pin a version if the task requires downloading a new tool; do not silently substitute a latest release into a reproducible workflow.

Preview the complete change, including case variants, file paths, overlapping replacements, generated files and public consumers. Apply only the requested scope. Backups can help recovery but do not prove every rename is reversible; preserve existing work and inspect collisions first.

Validate imports, references, public contracts, tests and build as appropriate. Remove only temporary backups created by this operation after verifying the result; never recursively delete unrelated backups. Report compatibility changes and unresolved references explicitly.

For a few local edits, use ordinary editing rather than introducing a bulk-refactoring dependency.
