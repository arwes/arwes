// The theme is not provided to components in a React context provider
// since the components should be rendered as decoupled from this interface.
// So in this playground application, the theme is imported directly into
// each component.

const theme = {
  typography: {
    content: '"Titillium Web", sans-serif',
    monospace: '"Source Code Pro", monospace'
  },
  color: {
    background: '#000909',
    section: '#031214',
    border: '#06d8d7',
    content: '#a1ecfb',
    active: '#d4f6fd',
    error: '#ce003e'
  },
  breakpoints: {
    tablet: 768,
    tabletUp: '@media (min-width: 768px)',
    tabletDown: '@media (max-width: 767px)'
  }
};

export { theme };
