/**
 * Design Tokens extracted from legacy main.css
 * These define the visual language of Conceal Network
 */

export const colors = {
  // Backgrounds
  bg: {
    primary: '#0A0A0A',
    secondary: '#222222',
    tertiary: '#151515',
    card: '#111111',
  },
  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: '#DDDDDD',
    muted: '#999999',
    disabled: '#757575',
    placeholder: '#4f4f4f',
  },
  // Brand colors
  brand: {
    primary: 'orange', // Main brand color
    hover: '#33a242',
  },
  // Borders and dividers
  border: {
    light: 'rgba(255, 255, 255, 0.05)',
    medium: 'rgba(255, 255, 255, 0.1)',
    strong: 'rgba(255, 255, 255, 0.25)',
  },
};

export const typography = {
  // Font families
  fontFamily: {
    sans: ['Poppins', 'Arial', 'Helvetica', 'sans-serif'],
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
  // Line heights
  lineHeight: {
    tight: '1.25',
    normal: '1.765',
    relaxed: '1.8',
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
