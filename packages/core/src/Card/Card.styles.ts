import rgba from 'polished/lib/color/rgba';
import { CSSObject } from '@emotion/react';

import { ArwesTheme } from '../ArwesThemeProvider';

const generateStyles = (
  theme: ArwesTheme,
  options: { animate?: boolean, hover?: boolean }
): Record<string, CSSObject> => {
  const { palette, space, outline, shadow, transitionDuration } = theme;
  const { hover } = options;

  const contentBg = rgba(palette.primary.light1, 0.05);

  return {
    root: {
      display: 'inline-block',

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
      //
    },

    line: {
      position: 'absolute',
      transition: ['background-color', 'box-shadow']
        .map(prop => `${prop} ${transitionDuration}ms ease-out`)
        .join(',')
    },

    picture: {
      position: 'relative',
      backgroundColor: palette.neutral.elevate(2)
    },
    // The real image is hidden and the background-image is shown to properly
    // set its aspect ratio.
    image: {
      display: 'block',
      verticalAlign: 'top',
      outline: 'none',
      margin: 0,
      border: 'none',
      boxSizing: 'content-box', // `content-box` to properly calculate sizes.
      padding: 0,
      paddingBottom: 'calc(100% * 2 / 4)', // Image will have 2/4 of the total width.
      width: '100%',
      height: 0, // Real image is hidden.
      backgroundSize: 'cover',
      backgroundPosition: 'center'
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
      position: 'relative',
      textAlign: 'left',
      backgroundColor: contentBg
    },
    header: {
      margin: 0,
      padding: `${space(4)}px ${space(4)}px 0 ${space(4)}px`,
      fontSize: '1.5rem'
    },
    children: {
      padding: space(4)
    },
    footer: {
      padding: `0 ${space(4)}px ${space(4)}px ${space(4)}px`,
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
