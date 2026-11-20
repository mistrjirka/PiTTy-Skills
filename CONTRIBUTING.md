# Contributing

Keep each change focused on the behavior the skill or agent should produce. Preserve useful examples, named review coverage and delegation contracts.

## Edit existing resources

1. Edit `skills/<name>/SKILL.md` and its references, or the complete Pi profile in `agents/<name>.md`.
2. Run `npm run manifest` to refresh catalog descriptions, delegation metadata and all payload hashes.
3. Run `npm run check` and `npm test`.
4. Review the diff and commit the source and manifest together.
5. Run `pitty founders-setup --skills-source /absolute/checkout` to refresh managed profile copies.
6. Restart Pi.

A local Pi package registration reads skills from that checkout. Agent installation uses owned copies, so edits require the setup refresh. Existing customized destination profiles are preserved and reported.

## Add a skill or profile

Use a stable lowercase name with hyphens. Add a catalog entry to `manifest.skills` or `manifest.agents` before refreshing. The minimum entry is a `name` and `path`:

```json
{"name":"example-skill","path":"skills/example-skill"}
```

```json
{"name":"example-helper","path":"agents/example-helper.md"}
```

A skill needs `skills/<name>/SKILL.md` with matching `name` and a useful `description` in its frontmatter. Put required references beside the skill.

Use this flat metadata format for agent profiles:

```yaml
---
name: example-helper
description: Explain when this helper should be selected
allowed_subagents: [explore]
---
```

Keep agent metadata on one line per field, with an inline list for delegates. The refresh tool accepts plain or quoted scalar values. It intentionally permits only `name`, `description` and `allowed_subagents` in shared agent frontmatter. Select models, providers and thinking levels in Pi settings. Delegate names must exist in the manifest.

Removing a skill or profile also requires removing its catalog entry and updating callers or delegation lists.

After adding or removing resources, update the inventory counts and tables in `README.md` and the expected counts in `test/manifest.test.mjs`. If you remove a resource used as a test fixture, choose another suitable fixture. Then run `npm run manifest`, `npm run check` and `npm test`.

## What the manifest command checks

`npm run manifest` rebuilds the file list and hashes under `skills/` and `agents/`. It verifies catalog names and paths, required entry points, model-neutral agent metadata, delegate availability and local Markdown links. Payload files must be regular files rather than links to external working directories.

`npm run check` performs the same validation without writing. It fails when hashes or catalog metadata are stale.

The Node tests edit temporary copies, refresh their hashes and check rejection of missing delegates, model pins and broken references. They do not invoke a model provider.

## Runtime-specific sources

Complete Pi agent prompts live in `agents/*.md`. The raw files under `skills/impl-check/reviewers/` and `agents/references/` support separate OpenCode integrations. They do not automatically regenerate the Pi profiles.

The OpenCode common reference and Pi reviewer profiles intentionally use different report formats. Edit the file consumed by the target runtime. When changing a shared substantive review rule, inspect both variants and keep the relevant check IDs aligned.

## Forks

Keep your checkout outside automatic skill discovery directories. Select your fork or checkout with `--skills-source`. This selection persists across later founders-setup runs.

Use `git:https://github.com/YOUR-USER/PiTTy-Skills.git` for a public fork. No credentials are required merely to clone this public source. Publishing your own changes uses your normal GitHub permissions.

## Fetch updates from a remote fork

Founders setup reuses prepared packages. Fetch a remote update explicitly before refreshing installed profile copies:

```bash
pi update git:https://github.com/YOUR-USER/PiTTy-Skills.git
pitty founders-setup
```

Use the configured source and ref. A bare `pi update` can also update Pi itself. Local checkout edits use `npm run manifest` followed by founders setup, without a remote package update.
