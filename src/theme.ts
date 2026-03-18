export const theme = {
  colors: {
    // Backgrounds - Modern dark theme
    bg: {
      primary: '#0a0a0a', // Original dark background
      secondary: '#1A1A2E', // Darker purple-blue
      tertiary: '#151515',
      card: '#111111',
    },
    // Text colors - Better contrast
    text: {
      primary: '#FFFFFF',
      secondary: '#E0E0E0', // Lighter for better contrast
      muted: '#B0B0B0', // Lighter muted text
      disabled: '#757575',
      placeholder: '#4f4f4f',
    },
    // Neon accent colors
    neon: {
      cyan: '#00F0FF', // Bright cyan
      magenta: '#FF00FF', // Bright magenta
      orange: '#FFA500', // Neon orange
    },
    // Borders and dividers
    border: {
      light: 'rgba(255, 255, 255, 0.05)',
      medium: 'rgba(255, 255, 255, 0.1)',
      strong: 'rgba(255, 255, 255, 0.25)',
      neonCyan: 'rgba(0, 240, 255, 0.3)',
      neonMagenta: 'rgba(255, 0, 255, 0.3)',
      neonOrange: 'rgba(255, 165, 0, 0.3)',
    },
    // Glow effects
    glow: {
      cyan: 'rgba(0, 240, 255, 0.4)',
      magenta: 'rgba(255, 0, 255, 0.4)',
      orange: 'rgba(255, 165, 0, 0.4)',
      cyanStrong: 'rgba(0, 240, 255, 0.6)',
      magentaStrong: 'rgba(255, 0, 255, 0.6)',
      orangeStrong: 'rgba(255, 165, 0, 0.6)',
    },
  },
  // Neon effect utilities
  effects: {
    // Text glow
    textGlowCyan: '0 0 10px rgba(0, 240, 255, 0.6)',
    textGlowMagenta: '0 0 10px rgba(255, 0, 255, 0.6)',
    textGlowOrange: '0 0 10px rgba(255, 165, 0, 0.6)',
    textGlowCyanStrong: '0 0 20px rgba(0, 240, 255, 0.8)',
    textGlowMagentaStrong: '0 0 20px rgba(255, 0, 255, 0.8)',
    textGlowOrangeStrong: '0 0 20px rgba(255, 165, 0, 0.8)',
    // Box shadow glow
    boxGlowCyan: '0 0 15px rgba(0, 240, 255, 0.4)',
    boxGlowMagenta: '0 0 15px rgba(255, 0, 255, 0.4)',
    boxGlowOrange: '0 0 15px rgba(255, 165, 0, 0.4)',
    boxGlowCyanStrong: '0 0 30px rgba(0, 240, 255, 0.6)',
    boxGlowMagentaStrong: '0 0 30px rgba(255, 0, 255, 0.6)',
    boxGlowOrangeStrong: '0 0 30px rgba(255, 165, 0, 0.6)',
    // Background glow (for subtle ambient effects)
    bgGlowCyan: 'rgba(0, 240, 255, 0.1)',
    bgGlowMagenta: 'rgba(255, 0, 255, 0.1)',
    bgGlowOrange: 'rgba(255, 165, 0, 0.1)',
  },
  // Gradient definitions
  gradients: {
    heroTitleCyan: 'linear-gradient(to right, #00F0FF, #FF00FF, #00F0FF)',
    heroTitleMagenta: 'linear-gradient(to right, #FF00FF, #00F0FF, #FF00FF)',
    // Solid colors for better readability
    heroTitleSolid: '#FFFFFF', // Use this for readable title
    heroTitleAccent: '#00F0FF', // Or this for accent
  },
} as const;

/**
 * Theme Configuration
 *
 * ⚠️ IMPORTANT: Theme settings are now in app.config.ts
 *
 * To change theme colors or font, edit:
 *   src/config/app.config.ts -> themeConfig
 *
 * This file contains theme definitions and utilities.
 * Import themeConfig from app.config.ts instead of defining it here.
 */

import { type ThemeColor, themeConfig } from '@/config/app.config';

// Per-color lookup — add a new entry here to support a new color across all CSS vars
const COLOR_VARS: Record<
  ThemeColor,
  {
    color: string;
    glow: string;
    glowStrong: string;
    boxGlow: string;
    boxGlowStrong: string;
    bgGlow: string;
    border: string;
    glowRgba: string;
    glowStrongRgba: string;
  }
> = {
  cyan: {
    color: theme.colors.neon.cyan,
    glow: theme.effects.textGlowCyan,
    glowStrong: theme.effects.textGlowCyanStrong,
    boxGlow: theme.effects.boxGlowCyan,
    boxGlowStrong: theme.effects.boxGlowCyanStrong,
    bgGlow: theme.effects.bgGlowCyan,
    border: theme.colors.border.neonCyan,
    glowRgba: theme.colors.glow.cyan,
    glowStrongRgba: theme.colors.glow.cyanStrong,
  },
  magenta: {
    color: theme.colors.neon.magenta,
    glow: theme.effects.textGlowMagenta,
    glowStrong: theme.effects.textGlowMagentaStrong,
    boxGlow: theme.effects.boxGlowMagenta,
    boxGlowStrong: theme.effects.boxGlowMagentaStrong,
    bgGlow: theme.effects.bgGlowMagenta,
    border: theme.colors.border.neonMagenta,
    glowRgba: theme.colors.glow.magenta,
    glowStrongRgba: theme.colors.glow.magentaStrong,
  },
  orange: {
    color: theme.colors.neon.orange,
    glow: theme.effects.textGlowOrange,
    glowStrong: theme.effects.textGlowOrangeStrong,
    boxGlow: theme.effects.boxGlowOrange,
    boxGlowStrong: theme.effects.boxGlowOrangeStrong,
    bgGlow: theme.effects.bgGlowOrange,
    border: theme.colors.border.neonOrange,
    glowRgba: theme.colors.glow.orange,
    glowStrongRgba: theme.colors.glow.orangeStrong,
  },
};

function colorCSSVars(prefix: string, color: ThemeColor): Record<string, string> {
  const v = COLOR_VARS[color];
  return {
    [`--${prefix}`]: v.color,
    [`--${prefix}-glow`]: v.glow,
    [`--${prefix}-glow-strong`]: v.glowStrong,
    [`--${prefix}-box-glow`]: v.boxGlow,
    [`--${prefix}-box-glow-strong`]: v.boxGlowStrong,
    [`--${prefix}-bg-glow`]: v.bgGlow,
    [`--${prefix}-border`]: v.border,
    [`--${prefix}-glow-rgba`]: v.glowRgba,
    [`--${prefix}-glow-strong-rgba`]: v.glowStrongRgba,
  };
}

export const getThemeCSSVars = (): Record<string, string> => ({
  ...colorCSSVars('color1', themeConfig.primaryColor),
  ...colorCSSVars('color2', themeConfig.secondaryColor),
  '--color-bg-primary': theme.colors.bg.primary,
  '--color-bg-secondary': theme.colors.bg.secondary,
  '--color-text-primary': theme.colors.text.primary,
  '--color-text-secondary': theme.colors.text.secondary,
  '--font-family': `${themeConfig.fontFamily}, Arial, Helvetica, sans-serif`,
});

export const applyTheme = () => {
  const root = document.documentElement;
  for (const [key, value] of Object.entries(getThemeCSSVars())) {
    root.style.setProperty(key, value);
  }
};
