import rgba from 'polished/lib/color/rgba';
import { Interpolation } from '@emotion/react';

import { ArwesTheme } from '../../ArwesThemeProvider';

const styles: Record<string, Interpolation<ArwesTheme>> = {
  row: ({ space, transitionDuration }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: space(1),
    transition: `background-color ${transitionDuration}ms ease-out`,

    '&:last-child': {
      marginBottom: 0
    }
  }),
  rowIsHeader: ({ palette }) => ({
    fontWeight: 'bold'

    // DEBUG:
    // backgroundColor: rgba(palette.text.root, 0.15)
  }),
  rowIsBody: ({ palette }) => ({
    // DEBUG:
    // backgroundColor: rgba(palette.text.root, 0.05),

    '&:hover, &:focus': {
      backgroundColor: rgba(palette.text.root, 0.1)
    }
  }),
  cell: ({ space }) => ({
    position: 'relative',
    marginRight: space(1),
    padding: `${space(1)}px ${space(1.5)}px`,

    '&:last-child': {
      marginRight: 0
    }
  }),
  cellContainer: {
    position: 'relative'
  },
  cellContent: {
    zIndex: 1,

    // DEBUG:
    opacity: 0
  },
  cellLine: ({ palette, outline }) => ({
    position: 'absolute',
    left: 0,
    bottom: 0,

    // DEBUG:
    width: 0, // '100%',

    height: outline(1),
    backgroundColor: palette.primary.dark2
  }),
  cellLineHeader: ({ palette }) => ({
    backgroundColor: palette.secondary.dark1
  })
};

export { styles };
