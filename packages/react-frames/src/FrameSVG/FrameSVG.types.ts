import {
  type SVGProps,
  type CSSProperties,
  type ForwardedRef
} from 'react';

export type FRAME_SVG_DIMENSION = number | string;

export type FRAME_SVG_POINT = FRAME_SVG_DIMENSION[];

export type FRAME_SVG_POLYLINE = FRAME_SVG_POINT[];

export interface FRAME_SVG_POLYLINE_CUSTOM {
  polyline: FRAME_SVG_POLYLINE
  style?: CSSProperties
}

export type FRAME_SVG_POLYLINE_GENERIC = FRAME_SVG_POLYLINE | FRAME_SVG_POLYLINE_CUSTOM;

export interface FrameProps extends SVGProps<SVGSVGElement> {
  shapes?: FRAME_SVG_POLYLINE_GENERIC[]
  shapesStyle?: CSSProperties
  polylines?: FRAME_SVG_POLYLINE_GENERIC[]
  polylinesStyle?: CSSProperties
  className?: string
  style?: CSSProperties
  elementRef?: ForwardedRef<SVGSVGElement>
}
