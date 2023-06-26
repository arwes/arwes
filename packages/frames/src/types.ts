import type * as CSS from 'csstype';

type FrameSVGPathCommandName = 'M' | 'm' | 'L' | 'l' | 'H' | 'h' | 'V' | 'v' | 'C' | 'c' | 'S' | 's' | 'Q' | 'q' | 'T' | 't' | 'A' | 'a';

export type FrameSVGPathDimension = number | string;

export type FrameSVGPathCommand = 'Z' | 'z' | [FrameSVGPathCommandName, ...FrameSVGPathDimension[]];

export type FrameSVGPath = FrameSVGPathCommand[];

export type FrameSVGStyle = CSS.Properties;

export interface FrameSVGPathCustom {
  name?: string
  id?: string
  className?: string
  style?: FrameSVGStyle
  path: FrameSVGPath
}

export type FrameSVGPathGeneric = FrameSVGPath | FrameSVGPathCustom;
