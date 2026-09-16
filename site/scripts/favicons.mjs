// Renders PNG favicon fallbacks from the mark: 64px ink on transparent, 180px ink on a bone tile.
import sharp from "sharp";
import fs from "node:fs";
const logo = fs.readFileSync("public/logo.svg", "utf8");
const paths = [...logo.matchAll(/d="([^"]+)"/g)].map((m) => m[1]);
const ink = paths.map((d) => `<path fill="#0C0D0B" d="${d}"/>`).join("");
const plain = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="545.1 548.9 951.9 951.9">${ink}</svg>`;
const tile = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200"><rect width="1200" height="1200" rx="260" fill="#F1ECE2"/><g transform="translate(150,150) scale(0.9454) translate(-545.1,-548.9)">${ink}</g></svg>`;
await sharp(Buffer.from(plain)).resize(64, 64).png().toFile("public/favicon-64.png");
await sharp(Buffer.from(tile)).resize(180, 180).png().toFile("public/apple-touch-icon.png");
console.log("favicons written");
