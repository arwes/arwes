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
    background: '#001313',
    section: '#001a1a',
    border: '#06d8d7',
    headings: '#00f8f8',
    content: '#7efcf6',
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
