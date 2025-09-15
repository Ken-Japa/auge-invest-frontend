export const calculatePosition = (
  index: number,
  total: number,
  radius: number,
  parentAngle: number,
  sectorAngle: number
) => {
  const angleStep = sectorAngle / Math.max(total, 1);
  const angle = parentAngle - sectorAngle / 2 + angleStep * (index + 0.5);
  return {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle),
  };
};

export const calculateNodeSize = (
  value: number,
  baseSize: number,
  maxValue: number,
  minSize: number,
  maxSize: number
) => {
  return minSize + (value / maxValue) * (maxSize - minSize);
};

export const adjustColorHSL = (
  color: string,
  adjustments: { h?: number; s?: number; l?: number }
) => {
  // Converte hex para RGB
  const hex = color.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;

  // RGB para HSL
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  // Ajusta HSL
  h = ((h * 360 + (adjustments.h || 0)) % 360) / 360;
  s = Math.min(1, Math.max(0, s + (adjustments.s || 0)));
  l = Math.min(1, Math.max(0, l + (adjustments.l || 0)));

  // HSL para RGB
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  let r1, g1, b1;
  if (s === 0) {
    r1 = g1 = b1 = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r1 = hue2rgb(p, q, h + 1 / 3);
    g1 = hue2rgb(p, q, h);
    b1 = hue2rgb(p, q, h - 1 / 3);
  }

  // RGB para Hex
  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r1)}${toHex(g1)}${toHex(b1)}`;
};
