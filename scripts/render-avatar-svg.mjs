// Renders one expression of an avatar definition to a standalone SVG string.
import { renderAvatarDefinition } from "@bible-strong/avatar-core";

export function renderAvatarSvg(definition, expression = "neutral", { background, size = 300, padding = 0 } = {}) {
  const { geometry, colors } = renderAvatarDefinition(definition, expression);
  const half = 150 + padding;
  const paths = (list) => list.filter(Boolean).map((d) => `<path d="${d}" fill="${colors.body}"/>`).join("");
  const bg = background ? `<rect x="${-half}" y="${-half}" width="${half * 2}" height="${half * 2}" fill="${background}"/>` : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-half} ${-half} ${half * 2} ${half * 2}" width="${size}" height="${size}">${bg}<defs><clipPath id="h"><path d="${geometry.headPath}"/></clipPath></defs>${paths(geometry.backPaths)}<path d="${geometry.headPath}" fill="${colors.body}"/><g clip-path="url(#h)" fill="${colors.eyes}"><path d="${geometry.leftPath}" opacity="${geometry.leftVisible ? 1 : 0}"/><path d="${geometry.rightPath}" opacity="${geometry.rightVisible ? 1 : 0}"/></g>${paths(geometry.frontPaths)}</svg>`;
}
