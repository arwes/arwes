import rgba from 'polished/lib/color/rgba';
import { Interpolation } from '@emotion/react';

import { ArwesTheme } from '../../ArwesThemeProvider';

const generateStyles = (
  theme: ArwesTheme,
  options: { animate: boolean, isHeader?: boolean, condensed?: boolean }
): Record<string, Interpolation<ArwesTheme>> => {
  const { palette, space, outline, transitionDuration } = theme;
  const { animate, isHeader, condensed } = options;

  return {
    row: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
      marginBottom: space(1),
      fontWeight: isHeader ? 'bold' : 'normal',
      transition: `background-color ${transitionDuration}ms ease-out`,

      '&:last-child': {
        marginBottom: 0
      },
      '&:hover, &:focus': {
        backgroundColor: isHeader ? undefined : rgba(palette.text.root, 0.1)
      }
    },
    cell: {
      position: 'relative',
      marginRight: condensed ? space(0.5) : space(1),
      padding: condensed ? `${space(0.5)}px ${space(0.75)}px` : `${space(1)}px ${space(1.5)}px`,
      minWidth: 0, // Fix underflow issue.
      whiteSpace: 'normal',
      wordBreak: 'break-word',
      backgroundColor: animate ? undefined : rgba(palette.text.root, isHeader ? 0.15 : 0.05),
      transition: `background-color ${transitionDuration}ms ease-out`,

      '&:last-child': {
        marginRight: 0
      }
    },
    cellContainer: {
      position: 'relative'
    },
    cellContent: {
      zIndex: 1,
      opacity: animate ? 0 : undefined
    },
    cellLine: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: animate ? 0 : '100%',
      height: outline(1),
      backgroundColor: isHeader ? palette.secondary.dark1 : palette.primary.dark2
    }
  };
};

export { generateStyles };
