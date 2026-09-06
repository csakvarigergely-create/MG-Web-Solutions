import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const stylesheets = [
  "src/styles.css",
  "src/mobile-polish.css",
  "src/header-hero.css",
  "src/round-three.css",
  "src/round-four.css",
  "src/round-five.css",
  "src/round-six.css"
];
const required = ["index.html", "src/main.js", "src/interactions.js", ...stylesheets];

for (const file of required) {
  if (!existsSync(path.join(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

const sourceHtml = await readFile(path.join(root, "index.html"), "utf8");
const stylesheetLinks = stylesheets
  .map((file) => `    <link rel="stylesheet" href="${file}">`)
  .join("\n");
const productionHtml = sourceHtml.replace(stylesheetLinks, '    <link rel="stylesheet" href="src/site.css">');
if (productionHtml === sourceHtml) {
  throw new Error("Could not replace source stylesheet links for the production build.");
}
const productionCss = (await Promise.all(stylesheets.map((file) => readFile(path.join(root, file), "utf8")))).join("\n\n");

await writeFile(path.join(dist, "index.html"), productionHtml);
await mkdir(path.join(dist, "src"), { recursive: true });
await writeFile(path.join(dist, "src/site.css"), productionCss);
await cp(path.join(root, "src/main.js"), path.join(dist, "src/main.js"));
await cp(path.join(root, "src/interactions.js"), path.join(dist, "src/interactions.js"));
await cp(path.join(root, "assets"), path.join(dist, "assets"), { recursive: true });

console.log("Build completed: dist/");
