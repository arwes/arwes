import { placeholder, selection, scrollbar } from '../tools/styling';
import { mapProps } from '../tools/utils';

const mapPropsDescName = (props) => {
  return mapProps(props, (name, value) => ({
    name: `& ${name}`,
    value
  }));
};

const position0000 = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};

export default (theme) => {
  return {
    root: {
      ...position0000,
      position: 'fixed',
      overflow: 'hidden',
      display: 'block',
      boxSizing: 'border-box',
      lineHeight: theme.typography.lineHeight,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize,
      color: theme.color.primary.base,
      transition: `all ${theme.animTime}ms ease-out`,
      opacity: 1,

      '&$exiting, &$exited': {
        opacity: 0,
      },
      '& *, & *:before, & *:after': {
        boxSizing: 'inherit',
      },
      ...mapPropsDescName(placeholder(theme, theme.color.primary.base)),
      ...mapPropsDescName(scrollbar(theme, theme.background.primary.level0, theme.color.primary.base)),
      ...mapPropsDescName(selection(theme, theme.color.primary.base, theme.background.primary.level0)),
    },
    background: {
      ...position0000,
      zIndex: 1,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: theme.background.primary.level0,
      transition: `all ${theme.animTime}ms ease-in`,
      opacity: 0,
    },
    pattern: {
      ...position0000,
      zIndex: 2,
      backgroundRepeat: 'repeat',
      backgroundPosition: 'center top',
      backgroundAttachment: 'fixed',
      transition: `all ${theme.animTime}ms ease-in`,
      opacity: 0,
    },
    puffs: {
      ...position0000,
      zIndex: 3,
    },
    main: {
      ...position0000,
      zIndex: 4,
      display: 'block',
      overflowY: 'auto',
    },
    resourcesReadyToShow: {
      '& $background, & $pattern': {
        opacity: 1,
      }
    },

    entering: {},
    entered: {},
    exiting: {},
    exited: {},
  };
};
