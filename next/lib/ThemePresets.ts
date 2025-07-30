const themePresets = {
  sky: {
    "--color-primary": "#0284c7", // sky-600
    "--color-secondary": "#facc15", // yellow-400
    "--color-lightPrimary": "#0ea5e9", // sky-300
    "--color-darkPrimary": "#0c4a6e", // sky-900
    "--color-opacityPrimary": "#0284c74d", // sky-600/30
  },
  emerald: {
    "--color-primary": "#059669", // emerald-600
    "--color-secondary": "#f59e0b", // amber-500
    "--color-lightPrimary": "#34d399", // emerald-300
    "--color-darkPrimary": "#065f46", // emerald-900
    "--color-opacityPrimary": "#0596694d", // emerald-600/30
  },
  rose: {
    "--color-primary": "#e11d48", // rose-600
    "--color-secondary": "#7c3aed", // violet-600
    "--color-lightPrimary": "#fda4af", // rose-300
    "--color-darkPrimary": "#881337", // rose-900
    "--color-opacityPrimary": "#e11d484d", // rose-600/30
  },
  lime: {
    "--color-primary": "#65a30d", // lime-600
    "--color-secondary": "#0ea5e9", // sky-500
    "--color-lightPrimary": "#bef264", // lime-300
    "--color-darkPrimary": "#365314", // lime-900
    "--color-opacityPrimary": "#65a30d4d", // lime-600/30
  },
  violet: {
    "--color-primary": "#7c3aed", // violet-600
    "--color-secondary": "#fbbf24", // amber-400
    "--color-lightPrimary": "#a78bfa", // violet-400
    "--color-darkPrimary": "#4c1d95", // violet-900
    "--color-opacityPrimary": "#7c3aed4d", // violet-600/30
  },
  orange: {
    "--color-primary": "#ea580c", // orange-600
    "--color-secondary": "#3b82f6", // blue-500
    "--color-lightPrimary": "#fb923c", // orange-400
    "--color-darkPrimary": "#7c2d12", // orange-900
    "--color-opacityPrimary": "#ea580c4d", // orange-600/30
  },
  neutral: {
    "--color-primary": "#737373", // neutral-500
    "--color-secondary": "#22d3ee", // cyan-400
    "--color-lightPrimary": "#a3a3a3", // neutral-400
    "--color-darkPrimary": "#171717", // neutral-900
    "--color-opacityPrimary": "#7373734d", // neutral-500/30
  },
} as const;

export type ThemeName = keyof typeof themePresets;

export default themePresets;
