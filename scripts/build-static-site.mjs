import { cp, mkdir, readdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(root, "public");
const staticExtensions = new Set([
  ".html",
  ".css",
  ".js",
  ".mjs",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".svg",
  ".ico",
  ".json",
  ".xml",
  ".txt",
  ".webmanifest",
  ".map"
]);
const ignoredDirectories = new Set([
  ".azure",
  ".git",
  ".github",
  ".vscode",
  "infra",
  "node_modules",
  "public",
  "scripts"
]);
const ignoredRootFiles = new Set([
  "azure.yaml",
  "package-lock.json",
  "package.json"
]);

async function copyStaticFiles(fromDir, toDir) {
  const entries = await readdir(fromDir, { withFileTypes: true });

  for (const entry of entries) {
    const source = path.join(fromDir, entry.name);
    const destination = path.join(toDir, entry.name);

    if (entry.isDirectory()) {
      if (fromDir === root && ignoredDirectories.has(entry.name)) {
        continue;
      }

      await copyStaticFiles(source, destination);
      continue;
    }

    if (!entry.isFile() || !staticExtensions.has(path.extname(entry.name).toLowerCase())) {
      continue;
    }

    if (fromDir === root && ignoredRootFiles.has(entry.name)) {
      continue;
    }

    await mkdir(path.dirname(destination), { recursive: true });
    await cp(source, destination);
  }
}

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await copyStaticFiles(root, outputDir);

const indexPath = path.join(outputDir, "index.html");
await stat(indexPath);
console.log(`Built static site at ${path.relative(root, outputDir)}`);
