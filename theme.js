// src/theme.js

const base = {
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '2rem',
    lg: '3rem',
  },
  font: {
    family: `'Inter', 'Roboto', sans-serif`,
    size: {
      sm: '0.875rem',
      base: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
    },
    weight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
  shadow: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
  },
};

const themes = {
  light: {
    mode: 'light',
    background: '#f9f9f9',
    text: '#222',
    card: '#fff',
    primary: '#4CAF50',
    secondary: '#1E88E5',
    error: '#E53935',
    ...base,
  },
  dark: {
    mode: 'dark',
    background: '#121212',
    text: '#fff',
    card: '#1e1e1e',
    primary: '#4CAF50',
    secondary: '#90CAF9',
    error: '#ef5350',
    ...base,
  },
};

export default themes;
