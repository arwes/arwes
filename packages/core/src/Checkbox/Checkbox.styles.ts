import { CSSObject } from '@emotion/react';
import { Theme } from '@arwes/design';

const generateStyles = (
  theme: Theme,
  options: { disabled?: boolean, readOnly?: boolean, palette?: string }
): Record<string, CSSObject> => {
  const { space, outline, shadowBlur, transitionDuration } = theme;
  const { readOnly, disabled } = options;

  const isHoverFocusEnabled = !readOnly && !disabled;
  const paletteUsed = theme.palette[options.palette as string] ?? theme.palette.primary;
  const color = disabled ? paletteUsed.dark2 : paletteUsed.main;
  const colorHover = paletteUsed.light2;
  const lineWidth = `${outline(1)}px`;
  const shadowBlurWidth = `${shadowBlur(1)}px`;
  const transitionDurationMs = `${transitionDuration()}ms`;

  const bgHoverStyles = {
    opacity: 0.1
  };
  const boxHoverStyles = {
    borderColor: colorHover,
    width: '40%',
    height: '40%'
  };
  const markHoverStyles = {
    backgroundColor: colorHover,
    boxShadow: `0 0 ${shadowBlurWidth} ${colorHover}`
  };

  return {
    root: {
      display: 'block',
      verticalAlign: 'middle',
      cursor: isHoverFocusEnabled ? 'pointer' : 'default',
      WebkitTapHighlightColor: 'transparent',

      '&:hover, &:focus': {
        // Remove default hover/focus styles.
        outline: 'none'
      },
      ...(isHoverFocusEnabled && {
        [[
          '&:hover .arwes-checkbox__bg',
          '&:focus .arwes-checkbox__bg'
        ].join()]: bgHoverStyles,
        [[
          '&:hover .arwes-checkbox__box',
          '&:focus .arwes-checkbox__box'
        ].join()]: boxHoverStyles,
        [[
          '&:hover .arwes-checkbox__mark',
          '&:focus .arwes-checkbox__mark'
        ].join()]: markHoverStyles
      })
    },
    container: {
      display: 'flex',
      flexDirection: 'row'
    },
    shapes: {
      position: 'relative',
      display: 'flex',
      width: '1.25rem',
      height: '1.25rem',
      verticalAlign: 'middle',
      userSelect: 'none'
    },
    input: {
      // Hide element but allow it to be accessible.
      position: 'absolute',
      left: 0,
      top: 0,
      width: 1,
      height: 1,
      opacity: 0,

      '&:checked ~ .arwes-checkbox__mark': {
        transform: 'scale(1)'
      },
      ...(isHoverFocusEnabled && {
        [[
          '&:hover ~ .arwes-checkbox__bg',
          '&:focus ~ .arwes-checkbox__bg'
        ].join()]: bgHoverStyles,
        [[
          '&:hover ~ .arwes-checkbox__box',
          '&:focus ~ .arwes-checkbox__box'
        ].join()]: boxHoverStyles,
        [[
          '&:hover ~ .arwes-checkbox__mark',
          '&:focus ~ .arwes-checkbox__mark'
        ].join()]: markHoverStyles
      })
    },
    bg: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: color,
      boxShadow: `0 0 ${shadowBlurWidth} ${color}`,
      opacity: 0.05,
      transitionProperty: 'opacity',
      transitionDuration: transitionDurationMs,
      transitionTimingFunction: 'ease-out'
    },
    box: {
      position: 'absolute',
      borderWidth: 0,
      borderStyle: 'solid',
      borderColor: color,
      width: '30%',
      height: '30%',
      transitionProperty: 'border-color, width, height',
      transitionDuration: transitionDurationMs,
      transitionTimingFunction: 'ease-out'
    },
    boxLT: {
      left: 0,
      top: 0,
      borderLeftWidth: lineWidth,
      borderTopWidth: lineWidth
    },
    boxLB: {
      left: 0,
      bottom: 0,
      borderLeftWidth: lineWidth,
      borderBottomWidth: lineWidth
    },
    boxRT: {
      right: 0,
      top: 0,
      borderRightWidth: lineWidth,
      borderTopWidth: lineWidth
    },
    boxRB: {
      right: 0,
      bottom: 0,
      borderRightWidth: lineWidth,
      borderBottomWidth: lineWidth
    },
    mark: {
      margin: 'auto',
      width: '40%',
      height: '40%',
      backgroundColor: color,
      boxShadow: `0 0 ${shadowBlurWidth} ${color}`,
      transform: 'scale(0)',
      transitionProperty: 'transform, background-color, box-shadow',
      transitionDuration: transitionDurationMs,
      transitionTimingFunction: 'ease-out'
    },
    content: {
      flex: 1,
      paddingLeft: space(2),
      minWidth: 0 // Overflow issue.
    }
  };
};

export { generateStyles };
