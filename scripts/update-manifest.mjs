#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const digest = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");

function fail(message) {
  throw new Error(message);
}

function payloadFiles(root) {
  const files = [];
  function visit(relative) {
    const directory = path.join(root, relative);
    for (const entry of fs.readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name, "en"))) {
      const name = relative + "/" + entry.name;
      if (entry.isSymbolicLink()) fail("Payload symlinks are not portable: " + name);
      if (entry.isDirectory()) visit(name);
      else if (entry.isFile()) files.push(name);
      else fail("Unsupported payload file: " + name);
    }
  }
  visit("agents");
  visit("skills");
  return files.sort();
}

function header(text, filename) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(text);
  if (!match) fail("Missing frontmatter: " + filename);
  return match[1].replace(/\r/g, "");
}

function scalar(value, context) {
  const text = value.trim();
  if (text.startsWith('"')) {
    try {
      const parsed = JSON.parse(text);
      if (typeof parsed !== "string") fail("Expected text: " + context);
      return parsed;
    } catch {
      fail("Use plain text or a JSON-compatible quoted string: " + context);
    }
  }
  if (text.startsWith("'")) {
    if (!text.endsWith("'")) fail("Unclosed quoted value: " + context);
    return text.slice(1, -1).replace(/''/g, "'");
  }
  if (!text || /^[&*![{|>]/.test(text)) fail("Use a plain or quoted scalar: " + context);
  return text;
}

function field(source, key, context) {
  const lines = source.split("\n");
  const index = lines.findIndex((line) => line.startsWith(key + ":"));
  if (index < 0) fail("Missing " + key + ": " + context);
  const value = lines[index].slice(key.length + 1).trim();
  if (/^[>|][-+]?$/.test(value)) {
    const continuation = [];
    for (const line of lines.slice(index + 1)) {
      if (line && !/^\s/.test(line)) break;
      continuation.push(line.trim());
    }
    const result = continuation.join(value[0] === ">" ? " " : "\n").trim();
    if (!result) fail("Empty " + key + ": " + context);
    return result;
  }
  return scalar(value, context + " " + key);
}

function agentMetadata(text, filename) {
  const source = header(text, filename);
  const fields = new Map();
  for (const line of source.split("\n")) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    const match = /^([a-z_]+):\s*(.*)$/.exec(line);
    if (!match || !["name", "description", "allowed_subagents"].includes(match[1])) {
      fail("Use only one-line name, description and allowed_subagents fields in " + filename +
        ". Set models, providers and thinking in Pi settings, not shared profiles.");
    }
    if (fields.has(match[1])) fail("Duplicate agent field in " + filename + ": " + match[1]);
    fields.set(match[1], match[2]);
  }
  const name = field(source, "name", filename);
  const description = field(source, "description", filename);
  const allowed = fields.get("allowed_subagents");
  let allowedSubagents = [];
  if (allowed !== undefined) {
    if (!/^\[.*\]$/.test(allowed)) fail("Use an inline allowed_subagents list in " + filename);
    const body = allowed.slice(1, -1).trim();
    allowedSubagents = body ? body.split(",").map((item) => scalar(item, filename + " delegate")) : [];
    if (new Set(allowedSubagents).size !== allowedSubagents.length ||
        allowedSubagents.some((item) => !idPattern.test(item))) {
      fail("Invalid or duplicate delegate in " + filename);
    }
  }
  return { name, description, allowedSubagents };
}

function validateLinks(root, files) {
  for (const filename of files.filter((name) => name.endsWith(".md"))) {
    const text = fs.readFileSync(path.join(root, filename), "utf8");
    for (const match of text.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
      const link = match[1];
      if (/^[a-z][a-z0-9+.-]*:/i.test(link) || link.startsWith("#")) continue;
      const target = decodeURIComponent(link.split("#")[0]);
      const resolved = path.resolve(root, path.dirname(filename), target);
      const relative = path.relative(root, resolved);
      if (path.isAbsolute(relative) || relative === ".." || relative.startsWith(".." + path.sep) ||
          !fs.existsSync(resolved)) {
        fail("Broken or external local reference in " + filename + ": " + link);
      }
    }
  }
}

export function buildManifest(root) {
  const old = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
  if (old.schemaVersion !== 1 || !Array.isArray(old.skills) || !Array.isArray(old.agents)) {
    fail("Expected manifest schemaVersion 1 with skills and agents catalogs.");
  }
  const paths = payloadFiles(root);
  const hashes = new Map(paths.map((name) => [name, digest(fs.readFileSync(path.join(root, name)))]));
  const skillNames = new Set();
  const skills = old.skills.map((entry) => {
    if (!entry || typeof entry.name !== "string" || !idPattern.test(entry.name) || entry.path !== "skills/" + entry.name || skillNames.has(entry.name)) {
      fail("Invalid or duplicate skill catalog entry: " + entry?.name);
    }
    skillNames.add(entry.name);
    const filename = entry.path + "/SKILL.md";
    if (!hashes.has(filename)) fail("Missing catalog skill: " + filename);
    const source = header(fs.readFileSync(path.join(root, filename), "utf8"), filename);
    if (field(source, "name", filename) !== entry.name) fail("Skill name differs from its catalog: " + filename);
    return { name: entry.name, path: entry.path, description: field(source, "description", filename) };
  });
  for (const filename of paths.filter((name) => name.endsWith("/SKILL.md"))) {
    if (!skills.some((entry) => entry.path + "/SKILL.md" === filename)) {
      fail("Add the new skill to manifest.skills before refreshing: " + filename);
    }
  }
  const agentNames = new Set();
  const agents = old.agents.map((entry) => {
    if (!entry || typeof entry.name !== "string" || !idPattern.test(entry.name) || entry.path !== "agents/" + entry.name + ".md" || agentNames.has(entry.name)) {
      fail("Invalid or duplicate agent catalog entry: " + entry?.name);
    }
    agentNames.add(entry.name);
    if (!hashes.has(entry.path)) fail("Missing catalog agent: " + entry.path);
    const metadata = agentMetadata(fs.readFileSync(path.join(root, entry.path), "utf8"), entry.path);
    if (metadata.name !== entry.name) fail("Agent name differs from its catalog: " + entry.path);
    return { name: entry.name, path: entry.path, allowedSubagents: metadata.allowedSubagents,
      description: metadata.description, sha256: hashes.get(entry.path) };
  });
  for (const filename of paths.filter((name) => /^agents\/[^/]+\.md$/.test(name))) {
    if (!agents.some((entry) => entry.path === filename)) {
      fail("Add the new profile to manifest.agents before refreshing: " + filename);
    }
  }
  for (const agent of agents) {
    for (const delegate of agent.allowedSubagents) {
      if (!agentNames.has(delegate)) fail("Missing delegate " + delegate + " for " + agent.name);
    }
  }
  validateLinks(root, paths);
  return { schemaVersion: 1, skills, agents, files: paths.map((name) => ({ path: name, sha256: hashes.get(name) })) };
}

export function refreshManifest(root, { check = false } = {}) {
  const filename = path.join(root, "manifest.json");
  const manifest = buildManifest(root);
  const next = JSON.stringify(manifest, null, 2) + "\n";
  const changed = fs.readFileSync(filename, "utf8") !== next;
  if (check && changed) fail("Manifest is stale. Run npm run manifest after editing payload files.");
  if (changed && !check) {
    const temporary = filename + ".tmp-" + process.pid;
    try {
      fs.writeFileSync(temporary, next);
      fs.renameSync(temporary, filename);
    } finally {
      fs.rmSync(temporary, { force: true });
    }
  }
  return { changed, skills: manifest.skills.length, agents: manifest.agents.length, files: manifest.files.length };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2);
    if (args.some((arg) => arg !== "--check") || args.length > 1) fail("Usage: node scripts/update-manifest.mjs [--check]");
    const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
    const result = refreshManifest(root, { check: args.includes("--check") });
    console.log((args.includes("--check") ? "Validated" : result.changed ? "Updated" : "Unchanged") +
      ": " + result.skills + " skills, " + result.agents + " agents, " + result.files + " payload files.");
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
