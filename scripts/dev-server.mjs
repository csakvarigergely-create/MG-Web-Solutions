import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2"
};

createServer((req, res) => {
  const url = new URL(req.url || "/", `http://localhost:${port}`);
  const cleanPath = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  let filePath = path.normalize(path.join(root, cleanPath));

  if (!filePath.startsWith(root)) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  if (!existsSync(filePath)) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  res.writeHead(200, { "Content-Type": types[path.extname(filePath)] || "application/octet-stream" });
  createReadStream(filePath).pipe(res);
}).listen(port, () => {
  console.log(`MG Web Solutions landing: http://localhost:${port}`);
});
