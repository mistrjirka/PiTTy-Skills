import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { buildManifest, refreshManifest } from "../scripts/update-manifest.mjs";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "pitty-skills-test-"));
  fs.cpSync(ROOT, root, {
    recursive: true,
    filter: (source) => ![".git", "node_modules"].includes(path.basename(source)),
  });
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  return root;
}

test("the checked-in package passes validation without changing its manifest", () => {
  assert.deepEqual(refreshManifest(ROOT, { check: true }),
    { changed: false, skills: 7, agents: 11, files: 34 });
  assert.deepEqual(buildManifest(ROOT).skills.map((entry) => entry.name).sort(), [
    "agent-benchmark-preflight", "design-ui", "impl-check", "plan",
    "planning-qualitative-optimization", "reading-docx", "writing-skills",
  ]);
});

test("an edited profile round-trips through hash refresh and preserves registered names", (t) => {
  const root = fixture(t);
  const relative = "agents/implementation-review.md";
  const filename = path.join(root, relative);
  const original = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
  fs.appendFileSync(filename, "\nUse the contributor's temporary evaluation marker.\n");
  assert.throws(() => refreshManifest(root, { check: true }), /Manifest is stale/);
  assert.equal(refreshManifest(root).changed, true);
  const updated = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
  const agent = updated.agents.find((entry) => entry.path === relative);
  const old = original.agents.find((entry) => entry.path === relative);
  assert.notEqual(agent.sha256, old.sha256);
  assert.equal(agent.sha256, crypto.createHash("sha256").update(fs.readFileSync(filename)).digest("hex"));
  assert.equal(agent.sha256, updated.files.find((entry) => entry.path === relative).sha256);
  assert.deepEqual(updated.agents.map((entry) => entry.name), original.agents.map((entry) => entry.name));
  assert.equal(refreshManifest(root, { check: true }).changed, false);
});

test("model and thinking pins are rejected before writing a manifest", (t) => {
  for (const field of ["model", '"model"', "thinking", "provider"]) {
    const root = fixture(t);
    const manifest = path.join(root, "manifest.json");
    const before = fs.readFileSync(manifest);
    const filename = path.join(root, "agents/implementation-review.md");
    const text = fs.readFileSync(filename, "utf8").replace("\n---\n", "\n" + field + ": test/selection\n---\n");
    fs.writeFileSync(filename, text);
    assert.throws(() => refreshManifest(root), /models, providers and thinking/);
    assert.deepEqual(fs.readFileSync(manifest), before);
  }
});

test("a missing delegation target fails validation", (t) => {
  const root = fixture(t);
  const filename = path.join(root, "agents/implementer.md");
  const before = fs.readFileSync(filename, "utf8");
  assert.match(before, /allowed_subagents: \[explore\]/);
  fs.writeFileSync(filename, before.replace("allowed_subagents: [explore]", "allowed_subagents: [missing-helper]"));
  assert.throws(() => buildManifest(root), /Missing delegate missing-helper/);
});

test("broken references and uncatalogued profiles are rejected", (t) => {
  const root = fixture(t);
  const skill = path.join(root, "skills/plan/SKILL.md");
  const original = fs.readFileSync(skill);
  fs.appendFileSync(skill, "\n[Missing guidance](missing-guidance.md)\n");
  assert.throws(() => buildManifest(root), /Broken or external local reference/);
  fs.writeFileSync(skill, original);
  fs.copyFileSync(path.join(root, "agents/explore.md"), path.join(root, "agents/unregistered.md"));
  assert.throws(() => buildManifest(root), /Add the new profile to manifest.agents/);
});

test("catalog paths cannot point outside the payload", (t) => {
  const root = fixture(t);
  const filename = path.join(root, "manifest.json");
  const manifest = JSON.parse(fs.readFileSync(filename, "utf8"));
  manifest.agents[0].path = "../outside.md";
  fs.writeFileSync(filename, JSON.stringify(manifest));
  assert.throws(() => buildManifest(root), /Invalid or duplicate agent catalog entry/);
});
