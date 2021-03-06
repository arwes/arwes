import rgba from 'polished/lib/color/rgba';
import { CSSObject } from '@emotion/react';

import { ArwesTheme } from '../ArwesThemeProvider';

const generateStyles = (
  theme: ArwesTheme,
  options: { animate?: boolean, landscape?: boolean, hover?: boolean }
): Record<string, CSSObject> => {
  const { palette, space, outline, shadow, transitionDuration } = theme;
  const { animate, landscape, hover } = options;

  const contentBg = rgba(palette.primary.light1, 0.05);

  return {
    root: {
      display: 'block',

      [[
        '&:hover .arwes-card__line-picture',
        '&:focus .arwes-card__line-picture'
      ].join(',')]: hover && {
        backgroundColor: palette.secondary.light1,
        boxShadow: `0 0 ${shadow.blur(1)}px ${palette.secondary.light1}`
      },

      [[
        '&:hover .arwes-card__line-content',
        '&:focus .arwes-card__line-content'
      ].join(',')]: hover && {
        backgroundColor: palette.primary.light1,
        boxShadow: `0 0 ${shadow.blur(1)}px ${palette.primary.light1}`
      }
    },
    container: {
      display: 'flex',
      flexDirection: landscape ? 'row' : 'column',
      width: '100%',
      height: '100%'
    },

    line: {
      position: 'absolute',
      transition: ['background-color', 'box-shadow']
        .map(prop => `${prop} ${transitionDuration}ms ease-out`)
        .join(','),
      opacity: animate ? 0 : undefined
    },

    picture: {
      position: 'relative',
      width: landscape ? '30%' : undefined
    },
    // If no landscape, the real image is hidden and the background-image
    // is shown to properly set its aspect ratio.
    // See: https://css-tricks.com/scale-svg/#option-2-use-css-background-images-and-the-padding-bottom-hack
    image: {
      boxSizing: 'content-box', // `content-box` to properly calculate sizes.
      display: 'block',
      verticalAlign: 'top',
      outline: 'none',
      margin: 0,
      border: 'none',
      padding: 0,
      paddingBottom: landscape ? 0 : 'calc(100% * 2 / 4)', // Image height is 2/4 width.
      width: '100%',
      height: landscape ? '100%' : 0, // Real image is hidden.
      objectFit: 'cover',
      objectPosition: 'center',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: palette.neutral.elevate(2),
      opacity: animate ? 0 : undefined
    },
    linePicture: {
      left: 0,
      top: 0,
      width: outline(1),
      height: '100%',
      backgroundColor: palette.secondary.dark1,
      boxShadow: `0 0 ${shadow.blur(1)}px ${palette.secondary.dark1}`
    },

    content: {
      flex: 1,
      position: 'relative',
      display: 'grid',
      gridTemplateRows: 'auto 1fr auto',
      gridTemplateColumns: 'auto',
      padding: space(4),
      minHeight: 0 // Content overflow fix.
    },
    contentBg: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: contentBg,
      opacity: animate ? 0 : undefined
    },
    header: {
      marginBottom: space(4)
    },
    title: {
      margin: 0,
      fontSize: '1.5rem'
    },
    children: {
      marginBottom: space(1),
      overflow: 'hidden',
      minHeight: 0 // Content overflow fix.
    },
    options: {
      marginTop: space(4),
      textAlign: 'right'
    },
    lineContent: {
      left: 0,
      bottom: 0,
      width: '100%',
      height: outline(1),
      backgroundColor: palette.primary.dark1,
      boxShadow: `0 0 ${shadow.blur(1)}px ${palette.primary.dark1}`
    }
  };
};

export { generateStyles };
