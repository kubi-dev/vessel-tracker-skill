#!/usr/bin/env node

import { cp, mkdir, access, readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { homedir } from "node:os";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const skillSource = join(__dirname, "..", "skill");
const home = homedir();

const targets = [
  {
    name: "Claude Code",
    dest: join(home, ".claude", "skills", "vessel-tracker"),
    usage: 'Run /vessel-tracker or say "track vessels"',
  },
  {
    name: "Codex",
    dest: join(home, ".codex", "skills", "vessel-tracker"),
    usage: "The skill will be auto-discovered by Codex CLI",
  },
];

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function installSkillDirs() {
  for (const target of targets) {
    const parentDir = dirname(target.dest);
    await mkdir(parentDir, { recursive: true });

    const action = (await exists(target.dest)) ? "Updated" : "Installed";
    await cp(skillSource, target.dest, { recursive: true, force: true });
    console.log(`  ${action} for ${target.name}: ${target.dest}`);
    console.log(`    → ${target.usage}`);
  }
}

async function installAntigravity() {
  const geminiDir = join(home, ".gemini");
  const geminiMd = join(geminiDir, "GEMINI.md");
  const skillMd = await readFile(join(skillSource, "SKILL.md"), "utf-8");

  const marker = "<!-- vessel-tracker -->";
  const block = `\n${marker}\n${skillMd}\n${marker}\n`;

  await mkdir(geminiDir, { recursive: true });

  let content = "";
  if (await exists(geminiMd)) {
    content = await readFile(geminiMd, "utf-8");
    // Replace existing block or append
    const regex = new RegExp(
      `\\n?${marker}[\\s\\S]*?${marker}\\n?`,
    );
    if (regex.test(content)) {
      content = content.replace(regex, block);
    } else {
      content += block;
    }
  } else {
    content = block;
  }

  await writeFile(geminiMd, content);
  console.log(`  Installed for Antigravity: ${geminiMd}`);
  console.log(
    '    → Say "track vessels" or "vessel report" in Antigravity',
  );
}

async function install() {
  console.log("Installing vessel-tracker skill...\n");

  await installSkillDirs();
  await installAntigravity();

  console.log("\nDone!\n");
}

install().catch((err) => {
  console.error("Installation failed:", err.message);
  process.exit(1);
});
