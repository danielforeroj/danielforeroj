// components/ThemePicker.tsx
import React from "react";
import { ThemeMode, defaultPalette, applyAccentTokens, persistThemeAndAccent, readTheme, readAccent } from "../themes/colorPalettes";

const ThemePicker: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [theme, setTheme] = React.useState<ThemeMode>(readTheme());
  const [accent, setAccent] = React.useState<string>(readAccent());

  // paint on mount (in case index.html didn’t prepaint)
  React.useEffect(() => {
    applyAccentTokens(accent, theme);
  }, []); // eslint-disable-line

  const selectTheme = (t: ThemeMode) => {
    setTheme(t);
    applyAccentTokens(accent, t);
    persistThemeAndAccent(t, accent);
  };

  const selectAccent = (hex: string) => {
    setAccent(hex);
    applyAccentTokens(hex, theme);
    persistThemeAndAccent(theme, hex);
  };

  const isSel = (hex: string) => hex.toUpperCase() === accent.toUpperCase();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setOpen(v => !v)}
        className="fab-opaque rounded-2xl px-4 h-12 flex items-center gap-2 outline-none focus:ring-4"
        aria-label="Theme & Accent"
      >
        <span className="material-symbols-outlined">palette</span>
        <span className="text-sm font-medium">Theme</span>
      </button>

      {open && (
        <div
          className="absolute bottom-14 right-0 w-72 rounded-2xl p-4 shadow-2xl border"
          style={{
            background: "var(--md-sys-color-surface)",
            color: "var(--md-sys-color-on-surface)",
            borderColor: "var(--hairline)",
          }}
        >
          <div className="text-sm font-semibold mb-2">Theme</div>
          <div className="flex gap-2 mb-4">
            {(["light", "dark"] as ThemeMode[]).map((t) => (
              <button
                key={t}
                onClick={() => selectTheme(t)}
                className={`px-3 py-2 rounded-lg text-sm border transition-colors ${theme === t ? "font-semibold" : ""}`}
                style={{
                  background: theme === t ? "var(--md-sys-color-primary-container)" : "transparent",
                  color: theme === t ? "var(--md-sys-color-on-primary-container)" : "var(--md-sys-color-on-surface)",
                  borderColor: "var(--hairline)",
                }}
              >
                {t[0].toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          <div className="text-sm font-semibold mb-2">Accent</div>
          <div className="grid grid-cols-6 gap-2">
            {defaultPalette.map((hex) => (
              <button
                key={hex}
                onClick={() => selectAccent(hex)}
                className="w-8 h-8 rounded-full border outline-none focus:ring-4"
                style={{
                  background: hex,
                  borderColor: isSel(hex) ? "currentColor" : "var(--hairline)",
                  boxShadow: isSel(hex) ? "0 0 0 3px rgba(0,0,0,.15) inset" : "none",
                }}
                aria-label={`Accent ${hex}`}
                title={hex}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemePicker;
