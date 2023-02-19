import type * as CSS from 'csstype';

export type FRAME_SVG_PATH_COMMAND_NAME = 'M' | 'm' | 'L' | 'l' | 'H' | 'h' | 'V' | 'v' | 'C' | 'c' | 'S' | 's' | 'Q' | 'q' | 'T' | 't' | 'A' | 'a';

export type FRAME_SVG_PATH_DIMENSION = number | string;

export type FRAME_SVG_PATH_COMMAND = 'Z' | 'z' | [FRAME_SVG_PATH_COMMAND_NAME, ...FRAME_SVG_PATH_DIMENSION[]];

export type FRAME_SVG_PATH = FRAME_SVG_PATH_COMMAND[];

export type FRAME_SVG_STYLE = CSS.Properties;

export interface FRAME_SVG_PATH_CUSTOM {
  name?: string
  id?: string
  className?: string
  style?: FRAME_SVG_STYLE
  path: FRAME_SVG_PATH
}

export type FRAME_SVG_PATH_GENERIC = FRAME_SVG_PATH | FRAME_SVG_PATH_CUSTOM;
