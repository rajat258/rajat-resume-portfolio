// Builds the favicon, apple touch icon and Open Graph card from the Nano avatar.
// Run with: node scripts/build-icons.mjs
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { renderAvatarSvg } from "./render-avatar-svg.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const definition = JSON.parse(readFileSync(join(root, "src/data/nano.avatar.json"), "utf8"));
const CHROME = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// Same Space Grotesk files the site loads in src/styles.css.
const FONT_FACES = `
@font-face { font-family: "Space Grotesk"; font-weight: 400; src: url("https://framerusercontent.com/third-party-assets/fontshare/wf/6DG6HUOGHOB35UGAANBDBVY77OCFNQOA/MX56D7EXTFRCL3EZPNM332VF6D5TDENT/2MGP255ZY2RSFHKW6LNN6W6BWQGC2LUO.woff2"); }
@font-face { font-family: "Space Grotesk"; font-weight: 500; src: url("https://framerusercontent.com/third-party-assets/fontshare/wf/LQZILVYBY2UXBMF3ZGAZKDS2P53HB2G5/XB4XS4AXY7LIGYBYPO7RTAIGNPOSSI7K/V2SN6OQGC3Z2CCFHLOEJRJKQXUTOKEBX.woff2"); }
@font-face { font-family: "Space Grotesk"; font-weight: 600; src: url("https://framerusercontent.com/third-party-assets/fontshare/wf/FOIKAJFLDFRPJ452NHBMMHCNDL4FUUBB/5AC3Y6FTG5H7IECKNZVIR7XI64O5YW5S/OB3CIWMGQGGYEGXRXPOVBXWAH4INE6T4.woff2"); }
`;

function page(width, height, body, css = "") {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
${FONT_FACES}
html, body { margin: 0; padding: 0; width: ${width}px; height: ${height}px; overflow: hidden; background: #0d1117; }
* { box-sizing: border-box; }
${css}
</style></head><body>${body}</body></html>`;
}

function screenshot(html, width, height, outFile) {
  const dir = mkdtempSync(join(tmpdir(), "nano-icons-"));
  const htmlFile = join(dir, "page.html");
  writeFileSync(htmlFile, html);
  try {
    execFileSync(
      CHROME,
      [
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        "--force-device-scale-factor=1",
        "--virtual-time-budget=5000",
        `--window-size=${width},${height}`,
        `--screenshot=${outFile}`,
        pathToFileURL(htmlFile).href,
      ],
      { stdio: "ignore" },
    );
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
  const info = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", outFile], { encoding: "utf8" });
  const w = Number(info.match(/pixelWidth: (\d+)/)[1]);
  const h = Number(info.match(/pixelHeight: (\d+)/)[1]);
  if (w !== width || h !== height) throw new Error(`${outFile} is ${w}x${h}, expected ${width}x${height}`);
  console.log(`wrote ${outFile} (${w}x${h})`);
}

// 1. favicon.svg
// The neutral squircle spans roughly x ±127, y ±122 inside the default 300 unit box.
// A padding of -18 crops the box to ±132, leaving about 6 units of air around the shape
// so it fills the browser tab instead of floating small in the middle.
const favicon = renderAvatarSvg(definition, "neutral", { padding: -18, size: 64 });
writeFileSync(join(publicDir, "favicon.svg"), favicon + "\n");
console.log(`wrote ${join(publicDir, "favicon.svg")}`);

// 2. apple-touch-icon.png (180x180)
screenshot(
  page(
    180,
    180,
    `<div class="wrap">${renderAvatarSvg(definition, "neutral", { size: 128 })}</div>`,
    `.wrap { width: 180px; height: 180px; display: grid; place-items: center; }`,
  ),
  180,
  180,
  join(publicDir, "apple-touch-icon.png"),
);

// 3. og-image.png (1200x630)
const ogCss = `
body {
  font-family: "Space Grotesk", Inter, "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #f0f6fc;
  position: relative;
  background:
    radial-gradient(circle at 78% 50%, rgba(88, 166, 255, 0.08), transparent 55%),
    #0d1117;
}
.grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(88, 166, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(88, 166, 255, 0.08) 1px, transparent 1px);
  background-size: 48px 48px;
  background-position: -1px -1px;
  -webkit-mask-image: radial-gradient(ellipse at 60% 50%, #000 20%, transparent 75%);
          mask-image: radial-gradient(ellipse at 60% 50%, #000 20%, transparent 75%);
}
.card { position: absolute; inset: 0; display: flex; align-items: center; justify-content: space-between; padding: 0 96px 0 88px; }
.text { display: flex; flex-direction: column; }
.kicker { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 24px; color: #58a6ff; letter-spacing: 0.01em; }
.name { margin-top: 18px; font-size: 80px; line-height: 1.02; font-weight: 600; letter-spacing: -0.02em; color: #f0f6fc; }
.subtitle { margin-top: 18px; font-size: 32px; font-weight: 400; color: #8b949e; }
.pills { display: flex; gap: 12px; margin-top: 40px; }
.pill { padding: 9px 18px; border: 1px solid #30363d; border-radius: 999px; background: #0d1117; color: #c9d1d9; font-size: 20px; font-weight: 500; }
.nano { position: relative; width: 340px; height: 340px; display: grid; place-items: center; flex: none; }
.glow { position: absolute; inset: -60px; border-radius: 50%; background: radial-gradient(circle, rgba(88, 166, 255, 0.28), rgba(88, 166, 255, 0.08) 45%, transparent 70%); filter: blur(10px); }
.nano svg { position: relative; }
`;
const ogBody = `
<div class="grid"></div>
<div class="card">
  <div class="text">
    <div class="kicker">@rajat258 / portfolio</div>
    <div class="name">Rajat Nanavati</div>
    <div class="subtitle">React Native &amp; Web Developer</div>
    <div class="pills"><span class="pill">React Native</span><span class="pill">React</span><span class="pill">TypeScript</span></div>
  </div>
  <div class="nano"><div class="glow"></div>${renderAvatarSvg(definition, "joyful", { size: 300, padding: 10 })}</div>
</div>`;
screenshot(page(1200, 630, ogBody, ogCss), 1200, 630, join(publicDir, "og-image.png"));
