// src/themes/colorPalettes.ts
// Dependency-free token generator + applier

export type ThemeMode = "light" | "dark";

function clamp(n: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, n));
}
function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  const v =
    h.length === 3
      ? h.split("").map((c) => parseInt(c + c, 16))
      : [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  return { r: v[0], g: v[1], b: v[2] };
}
function rgbToHex(r: number, g: number, b: number) {
  const to = (x: number) => x.toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`.toUpperCase();
}
function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}
function hslToRgb(h: number, s: number, l: number) {
  s /= 100; l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (0   <= h && h < 60)  { r = c; g = x; b = 0; }
  if (60  <= h && h < 120) { r = x; g = c; b = 0; }
  if (120 <= h && h < 180) { r = 0; g = c; b = x; }
  if (180 <= h && h < 240) { r = 0; g = x; b = c; }
  if (240 <= h && h < 300) { r = x; g = 0; b = c; }
  if (300 <= h && h < 360) { r = c; g = 0; b = x; }
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  };
}
function withL(hex: string, l: number) {
  const { r, g, b } = hexToRgb(hex);
  const hsl = rgbToHsl(r, g, b);
  const { r: rr, g: gg, b: bb } = hslToRgb(hsl.h, hsl.s, clamp(l));
  return rgbToHex(rr, gg, bb);
}
function relLum(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const srgb = [r, g, b].map(v => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}
function onFor(bg: string) {
  return relLum(bg) > 0.54 ? "#000000" : "#FFFFFF";
}
function mix(hex: string, pct: number, other = "#000000") {
  const a = hexToRgb(hex), b = hexToRgb(other);
  const k = clamp(pct, 0, 100) / 100;
  return rgbToHex(
    Math.round(a.r * (1 - k) + b.r * k),
    Math.round(a.g * (1 - k) + b.g * k),
    Math.round(a.b * (1 - k) + b.b * k)
  );
}

export const DEFAULT_PALETTE = ["#000000", "#F80301", "#00FF86", "#3786EC"] as const;

export function applyAccentTokens(accent: string, mode: ThemeMode) {
  const st = document.documentElement.style;

  // surfaces
  const surface   = mode === "dark" ? "#1B1C1E" : "#F8F9FB";
  const onSurface = mode === "dark" ? "#E7E8EA" : "#0E0F11";
  const hairline  = mode === "dark" ? mix(onSurface, 78, "#000000") : mix("#000000", 86, "#FFFFFF");

  // primary & containers
  const primary          = accent;
  const onPrimary        = onFor(primary);
  const primaryContainer = mode === "dark" ? withL(accent, 30) : withL(accent, 92);
  const onPrimaryCont    = onFor(primaryContainer);

  const pressedTint = mode === "dark" ? "rgba(255,255,255,.14)" : "rgba(0,0,0,.14)";

  st.setProperty("--accent", primary);
  st.setProperty("--accent-contrast", onPrimary);
  st.setProperty("--btn-pressed-tint", pressedTint);

  st.setProperty("--surface", surface);
  st.setProperty("--on-surface", onSurface);
  st.setProperty("--hairline", hairline);

  st.setProperty("--md-sys-color-primary", primary);
  st.setProperty("--md-sys-color-on-primary", onPrimary);
  st.setProperty("--md-sys-color-primary-container", primaryContainer);
  st.setProperty("--md-sys-color-on-primary-container", onPrimaryCont);
  st.setProperty("--md-sys-color-surface", surface);
  st.setProperty("--md-sys-color-on-surface", onSurface);
  st.setProperty("--md-sys-color-surface-variant", mode === "dark" ? mix(surface, 12, "#FFFFFF") : mix(surface, 6, "#000000"));

  st.setProperty("--tw-ring-color", mix(primary, 55, "#FFFFFF"));

  // mobile browser address bar color
  const meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
  if (meta) meta.content = surface;
}

export function persistTheme(theme: ThemeMode) {
  localStorage.setItem("df_theme", theme);
}
export function persistAccent(accent: string) {
  localStorage.setItem("df_accent", accent);
}
export function readTheme(): ThemeMode {
  return (localStorage.getItem("df_theme") as ThemeMode) || "light";
}
export function readAccent(): string {
  return localStorage.getItem("df_accent") || DEFAULT_PALETTE[0];
}
