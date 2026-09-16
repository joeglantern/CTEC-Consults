// Builds the social preview card (1200x630) from the hero frame, darkened, with the mark and wordmark.
import sharp from "sharp";
import fs from "node:fs";

const W = 1200, H = 630;
const src = fs.existsSync("public/img/circuit-poster.jpg") ? "public/img/circuit-poster.jpg" : "public/img/real/svc-strategic-innovation.jpg";

const logo = fs.readFileSync("public/logo.svg", "utf8");
const paths = [...logo.matchAll(/d="([^"]+)"/g)].map((m) => m[1]);
const mark = paths.map((d) => `<path fill="#F1ECE2" d="${d}"/>`).join("");

const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#0C0D0B" stop-opacity="0.55"/>
    <stop offset="0.55" stop-color="#0C0D0B" stop-opacity="0.72"/>
    <stop offset="1" stop-color="#0C0D0B" stop-opacity="0.95"/>
  </linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <g transform="translate(72,64) scale(0.0925) translate(-545.1,-548.9)">${mark}</g>
  <text x="72" y="392" fill="#F1ECE2" font-family="Georgia, 'Times New Roman', serif" font-size="66">CTEC Consults</text>
  <text x="72" y="452" fill="#E0A030" font-family="Georgia, 'Times New Roman', serif" font-size="34" font-style="italic">Innovating. Transforming. Delivering.</text>
  <text x="72" y="536" fill="#9A9B92" font-family="Menlo, monospace" font-size="24" letter-spacing="2">A TECHNOLOGY-DRIVEN CONSULTANCY IN NAIROBI, KENYA</text>
</svg>`);

await sharp(src)
  .resize(W, H, { fit: "cover", position: "centre" })
  .composite([{ input: overlay }])
  .jpeg({ quality: 88 })
  .toFile("public/og.jpg");

console.log("public/og.jpg written from", src);
