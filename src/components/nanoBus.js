// One channel for anything on the page to make Nano speak or emote.
//
// Declarative, for hover and tap:
//   <a data-nano="Good call!" data-nano-mood="happy" data-nano-celebrate>...</a>
//   data-nano          the line Nano says on hover, focus or tap
//   data-nano-mood     optional animation key while the line shows
//   data-nano-celebrate  optional; a click plays the green celebration
//
// Programmatic, for flows like the contact form:
//   nanoReact({ line: "Sent!", mood: "celebrate" })

export const NANO_EVENT = "nano:react";

export const nanoMoods = [
  "idle",
  "listening",
  "thinking",
  "working",
  "excited",
  "proud",
  "happy",
  "curious",
  "playful",
  "confused",
  "celebrate",
];

export function nanoReact({ line = null, mood = null, holdMs } = {}) {
  window.dispatchEvent(new CustomEvent(NANO_EVENT, { detail: { line, mood, holdMs } }));
}
