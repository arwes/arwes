import { rgba } from 'polished';

import { theme } from '../../theme';

const styles = {
  root: {
    position: 'relative',
    display: 'block',
    margin: '0 0 15px',
    fontFamily: theme.typography.content,
    color: theme.color.content,

    '&:hover, &:focus': {
      color: theme.color.active,
      outline: 'none'
    }
  },
  labelText: {
    display: 'block',
    marginBottom: 15,
    lineHeight: 1,
    fontSize: 14,
    textTransform: 'uppercase',
    color: rgba(theme.color.headings, 0.75)
  },
  select: {
    position: 'relative',
    zIndex: 1,
    display: 'block',
    border: 'none',
    margin: 0,
    padding: '0 0 0 8px',
    width: '100%',
    height: 30,
    lineHeight: '30px',
    fontSize: 16,
    fontFamily: 'inherit',
    color: 'inherit',
    cursor: 'pointer',
    backgroundColor: rgba(theme.color.content, 0.1),
    outline: 'none',
    boxShadow: 'none',
    transition: 'color 150ms ease-out',
    WebkitAppearance: 'none',
    MozAppearance: 'none',

    '& option, & optgroup': {
      backgroundColor: theme.color.section,
      color: theme.color.content
    }
  },
  arrow: {
    position: 'absolute',
    right: 8,
    bottom: 6,
    fontSize: 16,
    color: theme.color.content,
    fontWeight: 'bold'
  }
};

export { styles };
