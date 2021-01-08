import { rgba } from 'polished';

import { theme } from '../../theme';

const styles = {
  root: {
    position: 'relative',
    display: 'block',
    margin: '0 0 10px',
    fontFamily: theme.typography.content,
    color: theme.color.content,

    '&:hover, &:focus': {
      color: theme.color.active,
      outline: 'none'
    }
  },
  labelText: {
    display: 'block',
    padding: '2px 0',
    lineHeight: 1,
    fontSize: 10,
    textTransform: 'uppercase',
    color: rgba(theme.color.content, 0.75)
  },
  select: {
    position: 'relative',
    zIndex: 1,
    display: 'block',
    border: 'none',
    margin: 0,
    padding: 0,
    width: '100%',
    height: 26,
    lineHeight: '26px',
    fontSize: 14,
    fontFamily: 'inherit',
    color: 'inherit',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    outline: 'none',
    boxShadow: 'none',
    transition: 'color 150ms ease-out',
    '-webkit-appearance': 'none',
    '-moz-appearance': 'none',

    '& option, & optgroup': {
      backgroundColor: theme.color.section,
      color: theme.color.content
    }
  },
  arrow: {
    position: 'absolute',
    right: 0,
    bottom: 5,
    fontSize: 14,
    color: theme.color.content,
    fontWeight: 'bold'
  }
};

export { styles };
