import { rgba, lighten } from 'polished';

const styles = theme => ({
  '@global': {
    '*, *:before, *:after': {
      boxSizing: 'border-box'
    },
    'html, body': {
      overflow: 'hidden',
      margin: 0,
      padding: 0,
      backgroundColor: theme.color.background,
      scrollbarWidth: 'thin',
      scrollbarColor: lighten(0.1, theme.color.background) + ' ' + lighten(0.05, theme.color.background),

      '& ::-webkit-scrollbar': {
        width: 8
      },
      '& ::-webkit-scrollbar-track': {
        background: lighten(0.05, theme.color.background)
      },
      '& ::-webkit-scrollbar-thumb': {
        background: lighten(0.1, theme.color.background)
      },
      '& ::selection': {
        backgroundColor: theme.color.content,
        color: theme.color.background
      }
    }
  },
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridTemplateRows: 'auto 1fr auto'
  },
  content: {
    position: 'relative',
    display: 'flex',
    minHeight: 0 // Height overflow issue.
  },
  controls: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    overflowY: 'auto'
  },
  main: {
    flex: 1,
    display: 'grid',
    gridTemplateRows: 'auto',
    gridTemplateColumns: '100%',
    minHeight: 0 // Height overflow issue.
  },
  isMainTwoPanels: {
    '& $main': {
      gridTemplateColumns: '50% 50%'
    }
  },
  panel: {
    position: 'relative',
    overflow: 'auto'
  },
  editor: {
    borderRight: `1px solid ${rgba(theme.color.border, 0.5)}`
  },

  [`@media (min-width: ${theme.breakpoints.tablet}px)`]: {
    content: {
      display: 'grid',
      gridTemplateColumns: '200px auto',
      gridTemplateRows: 'auto'
    },
    controls: {
      position: 'static',
      borderRight: `1px solid ${theme.color.border}`
    },
    main: {
      flex: 'none'
    }
  }
});

export { styles };
