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

import { themeConfig } from '@/config/app.config';

// Helper function to get CSS custom properties based on theme selection
export const getThemeCSSVars = (): Record<string, string> => {
  const primary = themeConfig.primaryColor;
  const secondary = themeConfig.secondaryColor;

  // Determine primary color values based on theme selection
  const primaryColor = theme.colors.neon[primary];
  const primaryGlow =
    primary === 'orange' ? theme.effects.textGlowOrange : theme.effects.textGlowCyan;
  const primaryGlowStrong =
    primary === 'orange' ? theme.effects.textGlowOrangeStrong : theme.effects.textGlowCyanStrong;
  const primaryBoxGlow =
    primary === 'orange' ? theme.effects.boxGlowOrange : theme.effects.boxGlowCyan;
  const primaryBoxGlowStrong =
    primary === 'orange' ? theme.effects.boxGlowOrangeStrong : theme.effects.boxGlowCyanStrong;
  const primaryBgGlow =
    primary === 'orange' ? theme.effects.bgGlowOrange : theme.effects.bgGlowCyan;
  const primaryBorder =
    primary === 'orange' ? theme.colors.border.neonOrange : theme.colors.border.neonCyan;
  const primaryGlowRgba = primary === 'orange' ? theme.colors.glow.orange : theme.colors.glow.cyan;
  const primaryGlowStrongRgba =
    primary === 'orange' ? theme.colors.glow.orangeStrong : theme.colors.glow.cyanStrong;

  // Determine secondary color values based on theme selection
  const secondaryColor = theme.colors.neon[secondary];
  const secondaryGlow =
    secondary === 'orange'
      ? theme.effects.textGlowOrange
      : secondary === 'cyan'
        ? theme.effects.textGlowCyan
        : theme.effects.textGlowMagenta;
  const secondaryGlowStrong =
    secondary === 'orange'
      ? theme.effects.textGlowOrangeStrong
      : secondary === 'cyan'
        ? theme.effects.textGlowCyanStrong
        : theme.effects.textGlowMagentaStrong;
  const secondaryBoxGlow =
    secondary === 'orange'
      ? theme.effects.boxGlowOrange
      : secondary === 'cyan'
        ? theme.effects.boxGlowCyan
        : theme.effects.boxGlowMagenta;
  const secondaryBoxGlowStrong =
    secondary === 'orange'
      ? theme.effects.boxGlowOrangeStrong
      : secondary === 'cyan'
        ? theme.effects.boxGlowCyanStrong
        : theme.effects.boxGlowMagentaStrong;
  const secondaryBgGlow =
    secondary === 'orange'
      ? theme.effects.bgGlowOrange
      : secondary === 'cyan'
        ? theme.effects.bgGlowCyan
        : theme.effects.bgGlowMagenta;
  const secondaryBorder =
    secondary === 'orange'
      ? theme.colors.border.neonOrange
      : secondary === 'cyan'
        ? theme.colors.border.neonCyan
        : theme.colors.border.neonMagenta;
  const secondaryGlowRgba =
    secondary === 'orange'
      ? theme.colors.glow.orange
      : secondary === 'cyan'
        ? theme.colors.glow.cyan
        : theme.colors.glow.magenta;
  const secondaryGlowStrongRgba =
    secondary === 'orange'
      ? theme.colors.glow.orangeStrong
      : secondary === 'cyan'
        ? theme.colors.glow.cyanStrong
        : theme.colors.glow.magentaStrong;

  return {
    // Primary color (cyan or orange based on themeConfig)
    '--color1': primaryColor,
    '--color1-glow': primaryGlow,
    '--color1-glow-strong': primaryGlowStrong,
    '--color1-box-glow': primaryBoxGlow,
    '--color1-box-glow-strong': primaryBoxGlowStrong,
    '--color1-bg-glow': primaryBgGlow,
    '--color1-border': primaryBorder,
    '--color1-glow-rgba': primaryGlowRgba,
    '--color1-glow-strong-rgba': primaryGlowStrongRgba,

    // Secondary color (based on themeConfig.secondaryColor)
    '--color2': secondaryColor,
    '--color2-glow': secondaryGlow,
    '--color2-glow-strong': secondaryGlowStrong,
    '--color2-box-glow': secondaryBoxGlow,
    '--color2-box-glow-strong': secondaryBoxGlowStrong,
    '--color2-bg-glow': secondaryBgGlow,
    '--color2-border': secondaryBorder,
    '--color2-glow-rgba': secondaryGlowRgba,
    '--color2-glow-strong-rgba': secondaryGlowStrongRgba,

    // Base colors
    '--color-bg-primary': theme.colors.bg.primary,
    '--color-bg-secondary': theme.colors.bg.secondary,
    '--color-text-primary': theme.colors.text.primary,
    '--color-text-secondary': theme.colors.text.secondary,

    // Font family
    '--font-family': `${themeConfig.fontFamily}, Arial, Helvetica, sans-serif`,
  };
};

// Apply theme CSS variables to document root
export const applyTheme = () => {
  const vars = getThemeCSSVars();
  const root = document.documentElement;

  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
};
