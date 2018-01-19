import { rgba, lighten } from 'polished';

const cornerLength = corners => {
  switch (corners) {
    case 1: return 8;
    case 2: return 16;
    case 3: return 16;
    case 4: return 24;
    case 5: return 24;
    default: return 32;
  }
};

const cornerWidth = corners => {
  switch (corners) {
    case 1: return 1;
    case 2: return 1;
    case 3: return 2;
    case 4: return 2;
    case 6: return 3;
    default: return 3;
  }
};

const getColor = (theme, props, level) => (
  theme.color[props.disabled ? 'disabled' : props.layer][level]
);

const getBg = (theme, props) => (
  theme.background[props.disabled ? 'disabled' : props.layer]['level' + props.level]
);

export default (theme) => {
  return {
    root: {
      display: 'block',
      position: 'relative',
      padding: '1px',

      '&$exiting, &$exited': {
        '& $borderLeft, & $borderRight': {
          height: '0%',
        },
        '& $borderTop, & $borderBottom': {
          width: '0%',
        },
        '& $corner': {
          width: 0,
          height: 0,
          opacity: 0,
        },
        '& $box': {
          backgroundColor: 'transparent',
        },
      },

      '&$hover:hover': {
        '& $border': {
          borderColor: props => getColor(theme, props, 'base'),
          boxShadow: props => `0 0 ${theme.shadowLength}px `
            + rgba(getColor(theme, props, 'base'), theme.alpha),
        },
        '& $corner': {
          borderColor: props => getColor(theme, props, 'light'),
          boxShadow: props => `0 0 ${theme.shadowLength}px -${theme.shadowLength / 2}px `
            + rgba(getColor(theme, props, 'light'), theme.alpha),
        },
      },
    },
    box: {
      zIndex: 3,
      position: 'relative',
      overflow: 'hidden',
      display: 'block',
      transition: `background-color ${theme.animTime}ms ease-in`,
      backgroundColor: props => props.noBackground
        ? 'transparent'
        : props.active
          ? rgba(lighten(theme.accent, getBg(theme, props)), theme.alpha)
          : rgba(getBg(theme, props), theme.alpha),
    },
    children: {
      display: 'block',
    },

    // Borders

    border: {
      zIndex: 1,
      position: 'absolute',
      borderStyle: 'solid',
      transition: `all ${theme.animTime}ms ease-in`,
      borderColor: props => getColor(theme, props, 'dark'),
      boxShadow: props => `0 0 ${theme.shadowLength}px `
        + rgba(getColor(theme, props, 'dark'), theme.alpha),
      opacity: 1,
    },
    borderLeft: {
      left: 0,
      top: '50%',
      transform: 'translate(0, -50%)',
      borderWidth: '0 0 0 1px',
      height: '100%',
    },
    borderRight: {
      right: 0,
      top: '50%',
      transform: 'translate(0, -50%)',
      borderWidth: '0 0 0 1px',
      height: '100%',
    },
    borderTop: {
      top: 0,
      left: '50%',
      transform: 'translate(-50%, 0)',
      borderWidth: '1px 0 0 0',
      width: '100%',
    },
    borderBottom: {
      bottom: 0,
      left: '50%',
      transform: 'translate(-50%, 0)',
      borderWidth: '1px 0 0 0',
      width: '100%',
    },

    // Corners

    corner: {
      zIndex: 2,
      position: 'absolute',
      width: props => cornerLength(props.corners),
      height: props => cornerLength(props.corners),
      transition: `all ${theme.animTime}ms ease-in`,
      borderStyle: 'solid',
      borderColor: props => getColor(theme, props, 'base'),
      boxShadow: props => `0 0 ${theme.shadowLength}px -${theme.shadowLength / 2}px `
        + rgba(getColor(theme, props, 'base'), theme.alpha),
      opacity: 1,
    },
    cornerLT: {
      left: props => -cornerWidth(props.corners),
      top: props => -cornerWidth(props.corners),
      borderWidth: props => `${cornerWidth(props.corners)}px 0 0 ${cornerWidth(props.corners)}px`,
    },
    cornerLB: {
      left: props => -cornerWidth(props.corners),
      bottom: props => -cornerWidth(props.corners),
      borderWidth: props => `0 0 ${cornerWidth(props.corners)}px ${cornerWidth(props.corners)}px`,
    },
    cornerRT: {
      right: props => -cornerWidth(props.corners),
      top: props => -cornerWidth(props.corners),
      borderWidth: props => `${cornerWidth(props.corners)}px ${cornerWidth(props.corners)}px 0 0`,
    },
    cornerRB: {
      right: props => -cornerWidth(props.corners),
      bottom: props => -cornerWidth(props.corners),
      borderWidth: props => `0 ${cornerWidth(props.corners)}px ${cornerWidth(props.corners)}px 0`,
    },

    hover: {},
    entering: {},
    entered: {},
    exiting: {},
    exited: {},
  };
};
