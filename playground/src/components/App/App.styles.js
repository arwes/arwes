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
      }
    }
  },
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridTemplateRows: 'auto 1fr auto',
    width: '100%',
    height: '100vh'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '200px auto',
    gridTemplateRows: 'auto',
    minHeight: 0 // Height overflow issue.
  },
  controls: {
    borderRight: `1px solid ${theme.color.border}`
  },
  main: {
    display: 'grid',
    gridTemplateRows: 'auto',
    gridTemplateColumns: '50% 50%',
    minHeight: 0 // Height overflow issue.
  },
  panel: {
    overflow: 'auto'
  },
  editor: {
    borderRight: `1px solid ${rgba(theme.color.border, 0.5)}`
  }
});

export { styles };
