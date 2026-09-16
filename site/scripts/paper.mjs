// Reports the paper colour of each menu still, so the panel behind it can match exactly.
import sharp from "sharp";

for (const f of ["menu-services", "menu-approach", "menu-sectors", "menu-about"]) {
  // a corner patch is pure paper in every one of these stills
  const st = await sharp(`public/img/menu/${f}.jpg`)
    .extract({ left: 10, top: 10, width: 70, height: 70 })
    .stats();
  const hex = "#" + st.channels.slice(0, 3)
    .map((c) => Math.round(c.mean).toString(16).padStart(2, "0"))
    .join("");
  console.log(`${f}: ${hex}`);
}
