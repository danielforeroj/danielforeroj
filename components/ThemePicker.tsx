// components/ThemePicker.tsx
import React, { useMemo, useState } from "react";
import { applyAccentTokens, defaultPalette, persistThemeAndAccent, ThemeMode } from "../themes/colorPalettes";

type Props = {
  currentTheme: ThemeMode;
  currentAccent: string;
  setTheme: (t: ThemeMode) => void;
  setAccent: (hex: string) => void;
};

const ThemePicker: React.FC<Props> = ({ currentTheme, currentAccent, setTheme, setAccent }) => {
  const [open, setOpen] = useState(false);
  const palette = useMemo(() => defaultPalette.slice(), []);

  function handleThemeChange(t: ThemeMode) {
    setTheme(t);
    persistThemeAndAccent(t, currentAccent);
    applyAccentTokens(currentAccent, t); // repaint instantly
  }

  function handleAccentChange(hex: string) {
    setAccent(hex);
    persistThemeAndAccent(currentTheme, hex);
    applyAccentTokens(hex, currentTheme); // repaint instantly
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* FAB */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="shadow-lg rounded-2xl px-4 h-12 flex items-center gap-2 
                   outline-none focus:ring-4"
        style={{
          background: "var(--md-sys-color-primary-container)",
          color: "var(--md-sys-color-on-primary-container)",
        }}
        aria-label="Theme & color"
      >
        <span className="material-symbols-outlined">palette</span>
      </button>

      {/* Popover */}
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
                onClick={() => handleThemeChange(t)}
                className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                  currentTheme === t ? "font-semibold" : ""
                }`}
                style={{ borderColor: "var(--hairline)" }}
              >
                {t[0].toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          <div className="text-sm font-semibold mb-2">Accent</div>
          <div className="grid grid-cols-6 gap-2">
            {palette.map((hex) => {
              const selected = hex.toUpperCase() === currentAccent.toUpperCase();
              return (
                <button
                  key={hex}
                  onClick={() => handleAccentChange(hex)}
                  className="w-8 h-8 rounded-full border outline-none focus:ring-4"
                  aria-label={`Accent ${hex}`}
                  style={{
                    background: hex,
                    borderColor: selected ? "currentColor" : "var(--hairline)",
                    boxShadow: selected ? "0 0 0 3px rgba(0,0,0,.15) inset" : "none",
                  }}
                  title={hex}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemePicker;
