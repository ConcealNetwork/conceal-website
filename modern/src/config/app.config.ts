/**
 * Application Configuration
 * 
 * Centralized configuration file for easy maintenance and updates.
 * All timing values are in milliseconds unless otherwise specified.
 */

export const appConfig = {
  // Mobile Menu Settings
  mobile: {
    /** Time in seconds before mobile menus (SocialMenu & MajorLinks) fade out */
    menuFadeOutTime: 2, // seconds
  },

  // Cookie Settings
  cookies: {
    /** Splash screen cookie expiration in hours */
    splashScreenExpiration: 24, // hours
    
    /** Language preference cookie expiration in seconds (default: ~1 month) */
    languageExpiration: 2629800, // seconds (~30 days)
  },

  // Splash Screen Settings
  splash: {
    /** Minimum display time in milliseconds */
    minDisplayTime: 2000, // ms
    
    /** Animation fade out duration in milliseconds */
    fadeOutDuration: 600, // ms
    
    /** Check interval for completion in milliseconds */
    checkInterval: 50, // ms
  },

  // UI Animation Settings
  animations: {
    /** Copy button feedback timeout in milliseconds */
    copyFeedbackTimeout: 2000, // ms
    
    /** Scroll retry delay in milliseconds */
    scrollRetryDelay: 50, // ms
    
    /** Scroll retry delay for button navigation in milliseconds */
    scrollRetryDelayButton: 100, // ms
    
    /** Scroll retry delay for cross-page navigation in milliseconds */
    scrollRetryDelayCrossPage: 150, // ms
    
    /** Initial scroll delay for cross-page navigation in milliseconds */
    scrollInitialDelayCrossPage: 300, // ms
  },

  // API & Data Refresh Settings
  refresh: {
    /** Crypto price widget refresh interval in milliseconds */
    cryptoPriceInterval: 120000, // ms (60 seconds)
  },

  // Breakpoints
  breakpoints: {
    /** Mobile breakpoint in pixels */
    mobile: 768, // px
  },
} as const;

/**
 * Helper function to convert seconds to milliseconds
 */
export const secondsToMs = (seconds: number): number => seconds * 1000;

/**
 * Helper function to convert hours to minutes (for cookie expiration)
 */
export const hoursToMinutes = (hours: number): number => hours * 60;

/**
 * Helper function to check if device is mobile
 */
export const isMobile = (): boolean => window.innerWidth < appConfig.breakpoints.mobile;

