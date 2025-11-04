export const theme = {
  colors: {
    // Couleurs principales - Base sombre rock/métal
    background: {
      primary: '#0a0a0a',      // Noir profond
      secondary: '#1a1a1a',    // Noir légèrement plus clair
      card: '#1f1f1f',         // Cartes
      cardHover: '#2a2a2a',    // Hover sur cartes
    },
    // Accent rock/métal - Flammes
    accent: {
      primary: '#ff4500',      // Orange feu principal
      secondary: '#ff6b35',    // Orange plus clair
      tertiary: '#dc143c',     // Rouge crimson
      gold: '#ffd700',         // Or pour les highlights
      ember: '#ff8c42',        // Braise
    },
    // Texte
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
      muted: '#707070',
      dark: '#0a0a0a',
    },
    // États
    success: '#00ff00',
    error: '#ff0000',
    warning: '#ffaa00',
    info: '#00aaff',
  },
  fonts: {
    primary: '"Roboto", "Helvetica", "Arial", sans-serif',
    heading: '"Bebas Neue", "Impact", "Arial Black", sans-serif',
    mono: '"Roboto Mono", "Courier New", monospace',
  },
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    md: '1rem',       // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
  },
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.3)',
    md: '0 4px 8px rgba(0, 0, 0, 0.4)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.5)',
    card: '0 4px 20px rgba(255, 69, 0, 0.2)',
    cardHover: '0 8px 30px rgba(255, 69, 0, 0.4)',
    glow: '0 0 20px rgba(255, 69, 0, 0.6)',
    glowStrong: '0 0 30px rgba(255, 69, 0, 0.8)',
  },
  transitions: {
    fast: '0.15s ease-in-out',
    default: '0.3s ease-in-out',
    slow: '0.5s ease-in-out',
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },
  zIndex: {
    background: -1,
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
};

export default theme;
