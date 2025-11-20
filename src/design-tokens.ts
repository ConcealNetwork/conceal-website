/**
 * Design Tokens extracted from legacy main.css
 * These define the visual language of Conceal Network
 */

export const colors = {
  // Backgrounds - Modern dark theme with deep purples/blues
  bg: {
    primary: '#0F0F1A', // Deep dark purple-blue
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
  // Brand colors - Neon accents
  brand: {
    primary: '#00F0FF', // Neon cyan as primary
    neon: {
      cyan: '#00F0FF', // Bright cyan
      magenta: '#FF00FF', // Bright magenta
      orange: '#FFA500', // Neon orange - easy to switch with cyan
    },
    hover: '#33a242',
  },
  // Borders and dividers
  border: {
    light: 'rgba(255, 255, 255, 0.05)',
    medium: 'rgba(255, 255, 255, 0.1)',
    strong: 'rgba(255, 255, 255, 0.25)',
    neon: {
      cyan: 'rgba(0, 240, 255, 0.3)',
      magenta: 'rgba(255, 0, 255, 0.3)',
      orange: 'rgba(255, 165, 0, 0.3)',
    },
  },
  // Glow effects
  glow: {
    cyan: 'rgba(0, 240, 255, 0.4)',
    magenta: 'rgba(255, 0, 255, 0.4)',
    orange: 'rgba(255, 165, 0, 0.4)',
    orangeStrong: 'rgba(255, 165, 0, 0.6)',
  },
};

export const typography = {
  // Font families
  fontFamily: {
    sans: ['Inter', 'Arial', 'Helvetica', 'sans-serif'],
    mono: ['Consolas', 'Andale Mono', 'Courier', 'Courier New', 'monospace'],
  },
  // Font sizes (in rem)
  fontSize: {
    xs: '1rem',
    sm: '1.3rem',
    base: '1.7rem',
    lg: '2.1rem',
    xl: '2.4rem',
    '2xl': '3rem',
    '3xl': '3.6rem',
    '4xl': '4.4rem',
    '5xl': '5.3rem',
  },
  // Line heights - Improved spacing
  lineHeight: {
    tight: '1.3',
    normal: '1.8', // More generous spacing
    relaxed: '2.0',
  },
  // Letter spacing
  letterSpacing: {
    tight: '.05rem',
    normal: '.2rem',
    wide: '.25rem',
    wider: '.3rem',
  },
};

export const spacing = {
  // Common spacing values
  section: {
    paddingTop: '16.2rem',
    paddingBottom: '9rem',
  },
  // Common margins
  margin: {
    xs: '.9rem',
    sm: '1.5rem',
    md: '3rem',
    lg: '3.6rem',
    xl: '6rem',
  },
};

export const borderRadius = {
  sm: '3px',
  md: '8px',
  lg: '10px',
  xl: '16px',
  full: '50%',
};

export const components = {
  button: {
    height: '5.4rem',
    fontSize: '1.4rem',
    padding: '0 3rem',
    borderWidth: '.2rem',
    borderRadius: '10px',
    textTransform: 'uppercase',
    letterSpacing: '.3rem',
    transition: 'all 0.3s ease-in-out',
  },
  input: {
    height: '6rem',
    fontSize: '1.4rem',
    borderBottom: '2px solid rgba(170, 170, 170, 0.3)',
    transition: 'all 0.3s ease-in-out',
  },
};

export const breakpoints = {
  sm: '400px',
  md: '600px',
  lg: '800px',
  xl: '1000px',
  '2xl': '1200px',
  '3xl': '1500px',
};
