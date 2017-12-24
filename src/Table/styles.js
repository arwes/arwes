import { rgba } from 'polished';

export default (theme) => {
  return {
    root: {
      display: 'block',
      overflowX: 'auto',
      margin: [0, 0, theme.margin],
      fontSize: '80%',
      transition: `all ${theme.animTime}ms ease-out`,
      opacity: 1,

      '&$exiting, &$exited': {
        opacity: 0,
      },
      '& table': {
        width: '100%',
        borderCollapse: 'collapse',
      },
      '& thead': {
        textAlign: 'left',
        fontFamily: theme.typography.headerFontFamily,
        fontWeight: 'bold',
        color: theme.color.header.base,
        whiteSpace: 'nowrap',
      },
      '& tbody': {
        '& p, & ul, & ol, & dl, & blockquote': {
          marginBottom: 0,
        },
      },
      '& tr': {
        borderBottom: '1px solid ' + rgba(theme.color.primary.dark, theme.alpha / 2),
      },
      '& th': {
        padding: theme.padding / 4,
        verticalAlign: 'top',
      },
      '& td': {
        padding: theme.padding / 4,
        verticalAlign: 'top',
      },
    },

    entering: {},
    entered: {},
    exiting: {},
    exited: {},
  };
};
