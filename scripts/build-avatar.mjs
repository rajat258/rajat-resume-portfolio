// Builds src/data/nano.avatar.json, the portfolio mascot.
// Run with: node scripts/build-avatar.mjs
//
// Nano is a rounded app-icon body in the site's blue with dark eyes. Each
// animation maps to a portfolio section, and colour tints follow the site's
// accents: purple while thinking, green for success, dimmed blue when drowsy.
import { writeFileSync } from "node:fs";
import { validateAvatarDefinition } from "@bible-strong/avatar-core";

const BLUE = "#58a6ff";
const INK = "#0d1117";
const PURPLE = "#a371f7";
const GREEN = "#3fb950";
const DIM = "#3b6fb0";

export const body = {
  primary: { type: "cube", width: 236, height: 228, depth: 210, roundness: 1 },
  nodes: [],
};

const eye = (width, height, { x = 0, y = 0, angle = 0 } = {}) => ({ width, height, x, y, angle });
const still = { eyes: "none", body: "none" };

const expression = (head, left, right, spacing, { motion = still, colors } = {}) => ({
  head,
  eyes: { left, right, spacing },
  perspective: 1,
  motion,
  ...(colors ? { colors } : {}),
});

const expressions = {
  neutral: expression({ x: 0, y: 0, z: 0 }, eye(22, 52, { y: -6 }), eye(22, 52, { y: -6 }), 40),
  "look-up": expression({ x: 7, y: 24, z: -12 }, eye(23, 44, { y: -18 }), eye(23, 44, { y: -18 }), 52),
  "look-around": expression({ x: 0, y: 30, z: -9 }, eye(23, 42), eye(23, 42), 52),
  attentive: expression({ x: 2, y: 6, z: 10 }, eye(24, 56), eye(24, 56), 54),
  reading: expression({ x: -14, y: 2, z: -12 }, eye(23, 50), eye(23, 50), 54, { motion: { eyes: "microSaccades", body: "none" } }),
  "soft-down": expression({ x: -6, y: -10, z: -12 }, eye(23, 56), eye(23, 56), 54),
  curious: expression({ x: -11, y: -16, z: 6 }, eye(21, 47, { angle: 20 }), eye(21, 47, { angle: -20 }), 54),
  "thinking-left": expression({ x: 8, y: -20, z: 8 }, eye(23, 52, { y: -10 }), eye(44, 14, { y: -14 }), 58, { colors: { body: PURPLE } }),
  "thinking-up": expression({ x: 9, y: 22, z: -14 }, eye(22, 44, { y: -20 }), eye(22, 44, { y: -20 }), 52, { colors: { body: PURPLE } }),
  "thinking-side": expression({ x: -10, y: -14, z: 6 }, eye(21, 46, { angle: 18 }), eye(21, 46, { angle: -18 }), 54, { colors: { body: PURPLE } }),
  focused: expression({ x: -10, y: 4, z: -6 }, eye(25, 40, { angle: -14 }), eye(25, 40, { angle: 14 }), 54, { motion: { eyes: "microSaccades", body: "slowDrift" } }),
  "focused-right": expression({ x: -8, y: 16, z: -4 }, eye(24, 40, { angle: -12 }), eye(24, 40, { angle: 12 }), 54, { motion: { eyes: "microSaccades", body: "slowDrift" } }),
  joyful: expression({ x: -2, y: -14, z: -12 }, eye(32, 78), eye(32, 76), 60),
  "joyful-tilt": expression({ x: -14, y: 14, z: 12 }, eye(30, 72), eye(30, 72), 62),
  playful: expression({ x: -4, y: 14, z: -14 }, eye(20, 44, { angle: 24 }), eye(20, 44, { angle: -18 }), 52),
  surprised: expression({ x: -5, y: -12, z: -12 }, eye(48, 48), eye(47, 47), 68),
  smile: expression({ x: -8, y: -8, z: -10 }, eye(52, 15), eye(52, 15), 66),
  "proud-glance": expression({ x: 0, y: 30, z: -10 }, eye(23, 42), eye(23, 42), 52, { colors: { body: GREEN } }),
  "proud-joy": expression({ x: -12, y: 12, z: 11 }, eye(30, 70), eye(30, 70), 62, { colors: { body: GREEN } }),
  "proud-smile": expression({ x: -6, y: -8, z: -8 }, eye(50, 15), eye(50, 15), 64, { colors: { body: GREEN } }),
  sleepy: expression({ x: 3, y: 12, z: 8 }, eye(50, 12), eye(50, 12), 62, { colors: { body: DIM } }),
  dozing: expression({ x: 10, y: 3, z: 7 }, eye(52, 13), eye(52, 13), 64, { motion: { eyes: "none", body: "slowDrift" }, colors: { body: DIM } }),
};

const blinks = {
  calm: { enabled: true, initialDelayMs: 2600, minIntervalMs: 3400, maxIntervalMs: 6200, durationMs: 260 },
  alert: { enabled: true, initialDelayMs: 1800, minIntervalMs: 2800, maxIntervalMs: 5000, durationMs: 240 },
  lively: { enabled: true, initialDelayMs: 1200, minIntervalMs: 1800, maxIntervalMs: 3600, durationMs: 220 },
  slow: { enabled: true, initialDelayMs: 4800, minIntervalMs: 6500, maxIntervalMs: 9500, durationMs: 420 },
};

const step = (key, holdMs, transition = "smooth", transitionMs = 520) => ({ expression: key, holdMs, transitionMs, transition });

const animation = (label, description, steps, blink, playbackMode = "loop") => ({
  playbackMode,
  steps,
  blink,
  metadata: { label, description, group: "Portfolio" },
});

const animations = {
  idle: animation("Idle", "Hero: calm glances while the visitor reads the intro.", [step("neutral", 4200), step("look-up", 3600), step("curious", 3400)], blinks.calm),
  listening: animation("Listening", "About: attentive and reading along.", [step("attentive", 2800), step("reading", 3200), step("soft-down", 2600)], blinks.alert),
  thinking: animation("Thinking", "Skills: purple tint, weighing the stack.", [step("thinking-up", 2600), step("thinking-left", 2400), step("thinking-side", 2400)], blinks.alert),
  working: animation("Working", "Work: focused, heads down on production code.", [step("focused", 2600), step("reading", 2200), step("focused-right", 2400)], blinks.alert),
  excited: animation("Excited", "Projects: wide eyes over shipped work.", [step("joyful", 2000, "spring", 420), step("playful", 1800, "spring", 420), step("joyful-tilt", 2000, "spring", 420), step("surprised", 1600, "snappy", 320)], blinks.lively),
  proud: animation("Proud", "Credentials: green, quietly proud.", [step("proud-glance", 2400), step("proud-joy", 2600), step("proud-smile", 2400)], blinks.calm),
  happy: animation("Happy", "Contact: warm and inviting.", [step("joyful-tilt", 2400, "spring", 460), step("smile", 2200), step("joyful", 2400, "spring", 460)], blinks.lively),
  curious: animation("Curious", "Hover: leans in to see what you are doing.", [step("surprised", 1400, "snappy", 300), step("look-around", 1800), step("curious", 1800)], blinks.lively),
  celebrate: animation("Celebrate", "Click: a quick green celebration.", [step("proud-joy", 700, "spring", 300), step("proud-smile", 700, "snappy", 260), step("proud-joy", 800, "spring", 300)], blinks.lively, "once"),
  drowsy: animation("Drowsy", "No activity for a while: dozes off until you scroll.", [step("sleepy", 3600, "smooth", 900), step("dozing", 4200, "smooth", 900)], blinks.slow),
};

const definition = {
  schema: "bible-strong/avatar-definition",
  schemaVersion: 1,
  name: "Nano",
  body,
  colors: { body: BLUE, eyes: INK },
  expressions,
  expressionOrder: Object.keys(expressions),
  animations,
  animationOrder: Object.keys(animations),
};

const result = validateAvatarDefinition(definition);
if (!result.ok) {
  console.error(result.errors);
  process.exit(1);
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split("/").pop())) {
  writeFileSync(new URL("../src/data/nano.avatar.json", import.meta.url), `${JSON.stringify(definition, null, 2)}\n`);
  console.log(`Wrote nano.avatar.json: ${Object.keys(expressions).length} expressions, ${Object.keys(animations).length} animations`);
}

export default definition;
