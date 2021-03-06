import rgba from 'polished/lib/color/rgba';
import { CSSObject } from '@emotion/react';

import { ArwesTheme } from '../ArwesThemeProvider';

const generateStyles = (
  theme: ArwesTheme,
  options: { animate: boolean, fluid?: boolean }
): Record<string, CSSObject> => {
  const { palette, space, outline, shadow } = theme;
  const { animate, fluid } = options;

  const containerPadding = space(2);

  const lineWidth = outline(1);
  const lineShadowBlur = shadow.blur(2);
  const lineColor = palette.primary.main;
  const lineShadowColor = palette.primary.main;
  const lineLength = space(18);
  const lineMaxLength = '20%';

  const descriptionRightAngleWidth = space(4);
  const descriptionBgColor = rgba(palette.primary.light1, 0.05);

  return {
    root: {
      display: fluid ? 'block' : 'flex',
      margin: `0 auto ${space(4)}px`
    },
    container: {
      position: 'relative',
      margin: '0 auto',
      padding: containerPadding
    },
    content: {
      display: fluid ? 'block' : 'table',
      margin: '0 auto'
    },

    asset: {
      position: 'relative',
      display: 'block',
      backgroundColor: palette.neutral.elevate(2),
      opacity: animate ? 0 : undefined
    },
    assetHasError: {
      backgroundColor: rgba(palette.error.main, 0.2),

      '& img': {
        opacity: 0
      }
    },
    image: {
      display: 'block',
      margin: 0,
      border: 'none',
      width: fluid ? '100%' : 'auto',
      minWidth: 300,
      height: 'auto',
      minHeight: 150,
      verticalAlign: 'top'
    },
    loading: {
      backgroundColor: palette.neutral.elevate(2)
    },

    description: {
      display: fluid ? 'block' : 'table-caption',
      captionSide: 'bottom',
      position: 'relative',
      overflow: 'hidden',
      paddingLeft: space(2),
      paddingRight: space(4),
      paddingTop: space(2),
      paddingBottom: space(2),
      fontSize: '80%',
      textAlign: 'right'
    },
    descriptionText: {
      display: 'block',
      margin: 0,
      border: 'none',
      padding: 0,
      backgroundColor: 'transparent'
    },
    descriptionBg: {
      position: 'absolute',
      overflow: 'hidden',
      opacity: animate ? 0 : undefined
    },
    descriptionBg1: {
      left: 0,
      right: descriptionRightAngleWidth,
      top: 0,
      bottom: 0,
      backgroundColor: descriptionBgColor
    },
    descriptionBg2: {
      right: 0,
      top: 0,
      bottom: space(6),
      width: descriptionRightAngleWidth,
      backgroundColor: descriptionBgColor
    },
    descriptionBg3: {
      right: 0,
      bottom: 0,
      width: descriptionRightAngleWidth,
      height: space(6),

      '&::before': {
        content: '""',
        position: 'absolute',
        right: 0,
        top: 0,
        width: '100%',
        height: '100%',
        transform: 'skewX(330deg)',
        transformOrigin: 'top',
        backgroundColor: descriptionBgColor
      }
    },

    line: {
      position: 'absolute',
      backgroundColor: lineColor,
      boxShadow: `0 0 ${lineShadowBlur}px ${lineShadowColor}`,
      opacity: animate ? 0 : undefined
    },
    lineA1: {
      left: 0,
      bottom: 0,
      width: lineWidth,
      height: lineLength,
      maxHeight: lineMaxLength
    },
    lineA2: {
      left: 0,
      bottom: 0,
      width: lineLength,
      maxWidth: lineMaxLength,
      height: lineWidth
    },
    lineB1: {
      right: 0,
      top: 0,
      width: lineWidth,
      height: lineLength,
      maxHeight: lineMaxLength
    },
    lineB2: {
      right: 0,
      top: 0,
      width: lineLength,
      maxWidth: lineMaxLength,
      height: lineWidth
    },
    lineC: {
      right: 0,
      bottom: 0,
      width: lineWidth,
      height: space(8),
      transform: 'skewX(330deg)',
      transformOrigin: 'top'
    },
    lineD: {
      right: containerPadding + descriptionRightAngleWidth + space(1),
      bottom: 0,
      width: '20%',
      height: lineWidth
    }
  };
};

export { generateStyles };
