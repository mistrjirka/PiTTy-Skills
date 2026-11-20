# PiTTy Skills

Reusable engineering skills and eleven Pi agent profiles. The package contains seven selected skills for implementation review, UI work, planning, document reading and controlled evaluation.

Agent profiles leave model, provider and thinking selections unset. They inherit the current parent configuration unless your Pi settings provide an override.

## Install

For skills in an existing Pi installation:

```bash
pi install git:https://github.com/mistrjirka/PiTTy-Skills.git
```

Pi reads only the declared `skills/` directory. Restart Pi after installing or changing resources.

For the complete PiTTy setup, including these profiles and the supporting plugins:

```bash
pitty founders-setup
```

The profiles and `impl-check` require [pi-subagent](https://github.com/mistrjirka/pi-subagent), which supplies `agent_spawn`, `agent_send`, `agent_wait`, `agent_inspect` and child-to-parent coordination. This repository alone does not add those tools. `reading-docx` requires Pandoc when used.

Pi package installation loads skills. PiTTy's founders setup also copies the eleven manifest-listed profiles into the Pi agent directory. It updates unchanged managed copies and preserves custom profiles, reporting any conflict.

For an installation without PiTTy, install the subagent extension and copy the eleven files matching `agents/*.md` into your Pi agent directory after resolving existing same-named profiles. Copy only the root profiles. Manual copies must be refreshed manually.

## Where files belong

| Purpose | Location |
|---|---|
| Normal package installation | Let `pi install` manage the package source |
| Global Pi profiles | `$PI_CODING_AGENT_DIR/agents`, or `~/.pi/agent/agents` by default |
| Project Pi profiles | `.pi/agents` |
| Optional shared personal skills | `~/.agents/skills` |
| Optional shared project skills | `.agents/skills` |
| Pi-specific manual skills | `~/.pi/agent/skills` or project `.pi/skills` |
| Editable Git checkout | A directory outside automatic discovery roots, such as `~/src/PiTTy-Skills` |

`~/.config/pi` is not a default Pi directory. Set `PI_CODING_AGENT_DIR` if you deliberately want to move the Pi home.

For shared skills-only discovery, link only the checkout's `skills/` directory under an unused name:

```bash
mkdir -p ~/.agents/skills
ln -s /absolute/checkout/skills ~/.agents/skills/pitty
```

Keep the complete checkout outside automatic skill directories. Its `agents/` files are a separate resource type. Choose one installation method for the same skills. Duplicate skill names produce warnings and do not provide a reliable override mechanism. Project agent profiles override same-named global profiles.

## Use your fork or local edits

Fork this repository on GitHub, then select the fork:

```bash
pitty founders-setup --skills-source git:https://github.com/YOUR-USER/PiTTy-Skills.git
```

Founders setup remembers an explicit source selection for later runs.

Founders setup does not fetch an already prepared Git checkout. To fetch updates for your remote fork and refresh its managed profiles:

```bash
pi update git:https://github.com/YOUR-USER/PiTTy-Skills.git
pitty founders-setup
```

Use your exact configured source and ref. For this repository, use `git:https://github.com/mistrjirka/PiTTy-Skills.git`. Pass the source explicitly because a bare `pi update` can also update Pi itself.

For a local checkout:

```bash
git clone https://github.com/mistrjirka/PiTTy-Skills.git
cd PiTTy-Skills
# Edit the desired skill or Pi profile.
npm run manifest
npm run check
pitty founders-setup --skills-source /absolute/path/to/PiTTy-Skills
```

The refresh command updates hashes after edits. Re-running founders setup refreshes unchanged managed profile copies from that checkout. Restart Pi to load the changes.

For skills without PiTTy, register the editable checkout with `pi install /absolute/path/to/PiTTy-Skills`. Keep edits in your own checkout. Pi's managed Git cache is replaced during package updates.

The maintenance scripts need Node.js 18 or newer and no installed npm dependencies. See [CONTRIBUTING.md](CONTRIBUTING.md) for adding resources and preserving the manifest.

## Skills

| Skill | Purpose |
|---|---|
| `planning-qualitative-optimization` | Use when scoping an observed LLM quality failure into a falsifiable real-data experiment. |
| `reading-docx` | Use when inspecting, searching, comparing, summarizing, or analyzing Microsoft Word .docx files. Convert DOCX to temporary Markdown before content analysis instead of parsing Office XML directly. |
| `impl-check` | Use for a deep implementation review or a completed high-risk cross-layer change requiring independent review. |
| `design-ui` | Use when designing or changing user-facing layout, interaction, forms or async UI states. |
| `writing-skills` | Use when creating or auditing SKILL.md, Pi agent profiles or reusable coding-agent instructions. |
| `plan` | Create or revise a task plan when the user asks for planning. Not needed to execute an already approved plan. |
| `agent-benchmark-preflight` | Use immediately before launching an agent/prompt benchmark or A/B run to verify the comparison is controlled, reproducible and safe to leave unattended. |

## Agent profiles

| Profile | Purpose | Delegates |
|---|---|---|
| `impl-check-behavior` | Read-only impl-check-behavior; evidence and unresolved issues | None |
| `impl-check-contracts` | Read-only impl-check-contracts; evidence and unresolved issues | None |
| `impl-check-design` | Read-only impl-check-design; evidence and unresolved issues | None |
| `impl-check-runtime` | Read-only impl-check-runtime; evidence and unresolved issues | None |
| `debugging-duck` | Read-only independent diagnosis with delegated evidence gathering | explore, feasibility |
| `feasibility` | Deep read-only external/version research for material decisions needing synthesis | None |
| `implementation-review` | Read-only implementation-review; evidence and unresolved issues | None |
| `implementation-planner` | Implementation planning with a saved execution plan and delegated repository exploration | explore, feasibility |
| `implementer` | Scoped implementation with validation | explore |
| `general` | Bounded engineering execution and experimentation | explore, feasibility |
| `explore` | Read-only repository/document evidence mapping for ownership, flow, callers, reuse and blast radius | None |

The four full-review roles retain B1–B12, C1–C12, D1–D12 and R1–R12. `implementation-review` is the separate focused review profile.

## Editing the correct resource

- `agents/*.md` contains the complete Pi profiles installed by founders setup.
- `skills/*/SKILL.md` contains the skill entry points.
- `skills/impl-check/reviewers/*` and `agents/references/feasibility.md` are raw compatibility sources for OpenCode integrations. They are not additional Pi profiles.
- The OpenCode `reviewers/common.md` reference uses its own structured-report contract. Pi's installed reviewers use the natural-language contract included in their profiles. Preserve the applicable runtime's format.

The package does not install a main system prompt or change credentials and model settings. Supporting evaluation fixtures are synthetic and do not establish measured model quality.

## License and attribution

[MIT](LICENSE). See [ATTRIBUTION.md](ATTRIBUTION.md).
