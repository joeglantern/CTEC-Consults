// Generates the section images (Nano Banana / gemini-2.5-flash-image) and the clips (Veo 3.1)
// through the Gemini API. Needs GEMINI_API_KEY in the environment or in site/.env.local.
//
//   node scripts/gen-google.mjs images        -> 19 stills into public/img/real/
//   node scripts/gen-google.mjs posters       -> 6 stills into public/img/ used as Veo start frames
//   node scripts/gen-google.mjs videos        -> 8s clips into public/video/ (needs the posters first)
//   node scripts/gen-google.mjs images --only svc-esg   (any of the modes accept --only <name>)

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "..");
const env = path.join(root, ".env.local");
if (!process.env.GEMINI_API_KEY && fs.existsSync(env)) {
  for (const line of fs.readFileSync(env, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*GEMINI_API_KEY\s*=\s*(.+)\s*$/);
    if (m) process.env.GEMINI_API_KEY = m[1].replace(/^["']|["']$/g, "");
  }
}
const KEY = process.env.GEMINI_API_KEY;
if (!KEY) { console.error("GEMINI_API_KEY missing. Put it in site/.env.local as GEMINI_API_KEY=..."); process.exit(1); }

const API = "https://generativelanguage.googleapis.com/v1beta";
const IMAGE_MODEL = "gemini-2.5-flash-image";
const VIDEO_MODEL = "veo-3.1-generate-preview";
const TAIL = " Shot on a cinema camera, anamorphic lens, shallow depth of field, subtle film grain. No text, no logos, no watermark.";

const images = {
  "svc-strategic-innovation": "Real photograph. Close shot of two dark-skinned Kenyan hands in rolled shirt sleeves, cropped at the wrists, no face in frame, fitting a small circuit module into a larger dark circuit board on a workbench. One warm desk lamp from the left, the background falls to black. No faces.",
  "svc-project-management": "Real photograph. Overhead view of a printed project schedule with bars and a grid, on a dark timber drafting table, a steel ruler and a pencil laid across it. Warm low lamp light raking across the paper, deep shadows at the edges. Text on the page not legible. No people.",
  "svc-strategic-planning": "Real photograph. Macro of a brass compass resting on a topographic map. Warm light catches the brass, the map falls into shadow toward black edges. Map text not legible. No people.",
  "svc-policy-frameworks": "Real photograph. A row of thick bound volumes with cloth spines on a dark oak shelf, one warm light from the side, gold edge foil catching the light, deep shadow around. Spine text not legible. No people.",
  "svc-digital-transformation": "Real photograph. Inside a modern data centre, one clean server rack with rows of small amber and white status lights, the dark corridor receding behind it, no clutter, no cables hanging. No people.",
  "svc-mel": "Real photograph. Overhead view of a field notebook with handwritten tally marks, a pen beside it, and a dark tablet with its screen off, on a wooden table in warm evening light. Handwriting not legible. No people.",
  "svc-capacity-building": "Real photograph. An empty training room seen from the back, rows of chairs facing a large blank whiteboard, warm late sun through slatted blinds throwing stripes across the floor. No people.",
  "svc-research": "Real photograph. Open archive card drawers with index cards, one card pulled halfway out, warm lamp light, dark surroundings. Card text not legible. No people.",
  "svc-esg": "Real photograph. Macro of a young seedling in dark soil, warm side light on the leaves, water droplets on a leaf, black background.",
  "sec-government": "Real photograph. Stone colonnade of a civic building at dusk, tall columns lit warm from one side, long shadows across flagstones, deep indigo sky beyond, empty. No people, no flags.",
  "sec-ngos": "Real photograph. Interior of a relief supply warehouse, neatly stacked sacks and crates, one shaft of warm light from a high window cutting through dust, everything else in shadow. No people, no legible text.",
  "sec-private-sector": "Real photograph. Interior of a small workshop in Nairobi at golden hour, tools on a dark pegboard wall, a worn timber workbench, warm sun through the open doorway throwing a shaft of light across the floor, dust in the air. No people.",
  "sec-education": "Real photograph. Long reading tables in an old university library, brass lamps with green glass shades making pools of warm light on dark wood, tall shelves falling into shadow. No people.",
  "sec-healthcare": "Real photograph. A clean modern clinic corridor, pale bone walls, a single warm light at the far end, polished floor with a soft reflection, empty and calm. No people.",
  "sec-agriculture": "Real photograph. Aerial view of terraced farmland in the Kenyan highlands at first light, mist in the valley, warm sunrise on the ridges, one red earth road curving through. Medium format look. No people.",
  "pillar-diagnose": "Real photograph, slightly brighter exposure. Macro of a jeweller's loupe resting on a printed map, warm light. Map text not legible. No people.",
  "pillar-codesign": "Real photograph, slightly brighter exposure. Overhead view of two dark-skinned Kenyan hands sketching with a pencil on tracing paper laid over a blueprint, warm lamp light. No faces, drawing not legible.",
  "pillar-implement": "Real photograph, slightly brighter exposure. A spirit level resting on a fresh concrete beam on a construction site, warm evening light. No people.",
  "pillar-sustain": "Real photograph, slightly brighter exposure. One dark-skinned Kenyan hand passing a set of keys to another dark-skinned hand, cropped at the wrists, no face in frame,, warm side light, dark background. No faces.",
};

const posters = {
  "workshop": images["sec-private-sector"],
  "library": images["sec-education"],
  "clinic": images["sec-healthcare"],
  "colonnade": images["sec-government"],
  "warehouse": images["sec-ngos"],
  "city-dusk": "Real photograph. Nairobi street at blue hour seen from a rooftop, warm windows and streetlights coming on, traffic light trails on the avenue, deep indigo sky. Long exposure look.",
};

const MOTION = " No cuts, no text, no people, seamless loop, calm and cinematic, subtle film grain.";
const videos = {
  "atrium": { start: path.join(root, "public", "img", "atrium.jpg"), prompt: "Interior atrium at dusk, low sun behind a slatted timber screen. The camera dollies very slowly to the right along the polished concrete floor. The amber light stripes slide across the floor and the stone wall as the sun sinks a fraction. Faint dust drifts in the light." },
  "workshop": { start: "poster", prompt: "Slow push forward into the workshop toward the workbench. Dust drifts through the shaft of golden light. The light warms and lengthens slightly as the sun drops." },
  "library": { start: "poster", prompt: "Slow dolly along the reading tables, passing one brass lamp after another, each pool of light sliding through the frame. The shelves in the background drift with parallax." },
  "clinic": { start: "poster", prompt: "Very slow push forward down the corridor toward the warm light at the far end. The reflection on the floor stretches gently as the camera moves." },
  "colonnade": { start: "poster", prompt: "Slow lateral dolly along the colonnade, columns passing in the foreground with parallax against the sky. The warm light on the stone dims a touch as dusk deepens." },
  "warehouse": { start: "poster", prompt: "Slow push toward the shaft of light. Dust motes turn slowly inside the beam. The beam sweeps a few degrees across the stacks as the sun moves." },
  "city-dusk": { start: "poster", prompt: "Static rooftop shot. Windows and streetlights switch on one by one across the frame, traffic trails flow along the avenue, the sky deepens from indigo to near black." },
};

const mode = process.argv[2];
const only = process.argv.includes("--only") ? process.argv[process.argv.indexOf("--only") + 1] : null;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function post(url, body) {
  const res = await fetch(url, { method: "POST", headers: { "x-goog-api-key": KEY, "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const json = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(json).slice(0, 400));
  return json;
}

async function genImage(prompt, dest) {
  const json = await post(`${API}/models/${IMAGE_MODEL}:generateContent`, {
    contents: [{ parts: [{ text: prompt + TAIL }] }],
    generationConfig: { responseModalities: ["IMAGE"], imageConfig: { aspectRatio: "16:9" } },
  });
  const part = json.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
  if (!part) throw new Error("no image in response: " + JSON.stringify(json).slice(0, 300));
  fs.writeFileSync(dest, Buffer.from(part.inlineData.data, "base64"));
}

async function genVideo(prompt, startImage, dest) {
  const bytes = fs.readFileSync(startImage);
  const mime = startImage.endsWith(".png") ? "image/png" : "image/jpeg";
  const op = await post(`${API}/models/${VIDEO_MODEL}:predictLongRunning`, {
    instances: [{ prompt: prompt + MOTION, image: { bytesBase64Encoded: bytes.toString("base64"), mimeType: mime } }],
    parameters: { aspectRatio: "16:9", resolution: "1080p", durationSeconds: 8, personGeneration: "dont_allow" },
  });
  let name = op.name;
  for (let i = 0; i < 120; i++) {
    await sleep(10000);
    const res = await fetch(`${API}/${name}`, { headers: { "x-goog-api-key": KEY } });
    const json = await res.json();
    if (json.done) {
      const uri = json.response?.generateVideoResponse?.generatedSamples?.[0]?.video?.uri;
      if (!uri) throw new Error("no video uri: " + JSON.stringify(json).slice(0, 300));
      const v = await fetch(uri, { headers: { "x-goog-api-key": KEY } });
      fs.writeFileSync(dest, Buffer.from(await v.arrayBuffer()));
      return;
    }
  }
  throw new Error("timed out waiting for " + name);
}

async function main() {
  if (mode === "images") {
    const out = path.join(root, "public", "img", "real"); fs.mkdirSync(out, { recursive: true });
    for (const [name, prompt] of Object.entries(images)) {
      if (only && name !== only) continue;
      const dest = path.join(out, name + ".jpg");
      try { await genImage(prompt, dest); console.log("ok ", name); } catch (e) { console.log("ERR", name, e.message); }
      await sleep(1500);
    }
  } else if (mode === "posters") {
    const out = path.join(root, "public", "img");
    for (const [name, prompt] of Object.entries(posters)) {
      if (only && name !== only) continue;
      const dest = path.join(out, name + "-poster.jpg");
      try { await genImage(prompt, dest); console.log("ok ", name); } catch (e) { console.log("ERR", name, e.message); }
      await sleep(1500);
    }
  } else if (mode === "videos") {
    const out = path.join(root, "public", "video");
    for (const [name, v] of Object.entries(videos)) {
      if (only && name !== only) continue;
      const start = v.start === "poster" ? path.join(root, "public", "img", name + "-poster.jpg") : v.start;
      if (!fs.existsSync(start)) { console.log("SKIP", name, "no start image", start); continue; }
      const dest = path.join(out, name + ".mp4");
      try { await genVideo(v.prompt, start, dest); console.log("ok ", name); } catch (e) { console.log("ERR", name, e.message); }
    }
  } else {
    console.log("usage: node scripts/gen-google.mjs images|posters|videos [--only name]");
  }
}
main();
