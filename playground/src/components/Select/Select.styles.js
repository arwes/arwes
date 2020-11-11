import { rgba } from 'polished';

const styles = theme => ({
  root: {
    position: 'relative',
    display: 'block',
    margin: [0, 0, 10],
    fontFamily: theme.typography.content
  },
  labelText: {
    display: 'block',
    padding: [2, 0],
    lineHeight: 1,
    fontSize: 10,
    textTransform: 'uppercase',
    color: rgba(theme.color.content, 0.75)
  },
  select: {
    display: 'block',
    border: 'none',
    margin: 0,
    padding: 0,
    width: '100%',
    height: 26,
    lineHeight: '26px',
    fontSize: 14,
    fontFamily: theme.typography.content,
    color: theme.color.content,
    cursor: 'pointer',
    backgroundColor: 'transparent',
    outline: 'none',
    boxShadow: 'none',
    '-webkit-appearance': 'none',
    '-moz-appearance': 'none',

    '& option, & optgroup': {
      backgroundColor: theme.color.section,
      color: theme.color.content
    }
  },
  arrow: {
    position: 'absolute',
    zIndex: -1,
    right: 0,
    bottom: 5,
    fontSize: 14,
    color: theme.color.content,
    fontWeight: 'bold'
  }
});

export { styles };
