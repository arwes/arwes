import type * as CSS from 'csstype';

export type FRAME_SVG_DIMENSION = number | string;

export type FRAME_SVG_POINT = FRAME_SVG_DIMENSION[];

export type FRAME_SVG_POLYLINE = FRAME_SVG_POINT[];

export type FRAME_SVG_POLYLINE_STYLE = CSS.Properties;

export interface FRAME_SVG_POLYLINE_CUSTOM {
  name?: string
  className?: string
  style?: FRAME_SVG_POLYLINE_STYLE
  polyline: FRAME_SVG_POLYLINE
}

export type FRAME_SVG_POLYLINE_GENERIC = FRAME_SVG_POLYLINE | FRAME_SVG_POLYLINE_CUSTOM;
