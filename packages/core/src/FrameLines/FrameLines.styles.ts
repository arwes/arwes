import { CSSProperties } from 'react';
import { CSSObject } from '@emotion/react';

import {
  ARWES_CORE_FRAME_LINE_CLASSNAME,
  ARWES_CORE_FRAME_BG_CLASSNAME,
  ARWES_CORE_FRAME_BG_OPACITY
} from '../constants';
import { ArwesTheme } from '../ArwesThemeProvider';

type TransformOrigin = CSSProperties['transformOrigin'];

const generateStyles = (
  theme: ArwesTheme,
  options: {
    outlines: number[]
    origins: TransformOrigin[]
    palette?: string
    active?: boolean
    hover?: boolean
    disabled?: boolean
  }
): Record<string, CSSObject> => {
  const { space, outline, shadowBlur, transitionDuration } = theme;
  const { outlines, origins, active, hover, disabled } = options;

  const defaultPalette = theme.palette.primary;
  const colorPalette = theme.palette[options.palette as string] ?? defaultPalette;
  const color = disabled ? colorPalette.dark2 : colorPalette.main;
  const colorHover = colorPalette.light2;

  return {
    root: {
      position: 'relative',
      display: 'inline-block',
      padding: space(2),

      [[
        `&:hover .${ARWES_CORE_FRAME_LINE_CLASSNAME}`,
        `&:focus .${ARWES_CORE_FRAME_LINE_CLASSNAME}`
      ].join(',')]: hover && !disabled && {
        borderColor: colorHover,
        boxShadow: `0 0 ${shadowBlur(2)}px ${colorHover}`
      },
      [[
        `&:hover .${ARWES_CORE_FRAME_BG_CLASSNAME}`,
        `&:focus .${ARWES_CORE_FRAME_BG_CLASSNAME}`
      ].join(',')]: hover && !disabled && active && {
        backgroundColor: colorHover
      }
    },
    shape: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex'
    },
    bg: {
      flex: 1,
      backgroundColor: active ? color : undefined,
      opacity: active ? ARWES_CORE_FRAME_BG_OPACITY : undefined,
      transition: `background-color ${transitionDuration()}ms ease-out`
    },
    line: {
      position: 'absolute',
      borderWidth: 0,
      borderStyle: 'solid',
      borderColor: color,
      boxShadow: `0 0 ${shadowBlur(2)}px ${color}`,
      transition: ['border-color', 'box-shadow']
        .map(prop => `${prop} ${transitionDuration()}ms ease-out`)
        .join()
    },
    // top
    line0: {
      left: 0,
      right: 0,
      top: 0,
      borderTopWidth: outline(outlines[0]),
      transformOrigin: origins[0]
    },
    // right
    line1: {
      right: 0,
      top: 0,
      bottom: 0,
      borderRightWidth: outline(outlines[1]),
      transformOrigin: origins[1]
    },
    // bottom
    line2: {
      left: 0,
      right: 0,
      bottom: 0,
      borderBottomWidth: outline(outlines[2]),
      transformOrigin: origins[2]
    },
    // left
    line3: {
      left: 0,
      top: 0,
      bottom: 0,
      borderLeftWidth: outline(outlines[3]),
      transformOrigin: origins[3]
    },
    content: {
      position: 'relative'
    }
  };
};

export { generateStyles };
