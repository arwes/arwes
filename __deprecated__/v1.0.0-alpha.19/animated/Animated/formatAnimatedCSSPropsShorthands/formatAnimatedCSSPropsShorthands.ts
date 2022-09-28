import { CSSProperties } from 'react';

import { AnimatedCSSProps } from '../../constants';

const ANIMATED_CSS_PROPS_TRANSFORM_DISTANCES = [
  'translateX',
  'translateY',
  'translateZ',
  'perspective'
];

const ANIMATED_CSS_PROPS_TRANSFORM_ANGLES = [
  'rotate',
  'rotateX',
  'rotateY',
  'rotateZ',
  'skew',
  'skewX',
  'skewY'
];

const ANIMATED_CSS_PROPS_TRANSFORM_UNITLESS = [
  'scale',
  'scaleX',
  'scaleY',
  'scaleZ'
];

const formatAnimatedCSSPropsShorthands = (cssPropertiesEnhanced?: AnimatedCSSProps): CSSProperties | undefined => {
  if (!cssPropertiesEnhanced) {
    return;
  }

  const cssProperties: CSSProperties = {};

  let transform = '';

  Object.keys(cssPropertiesEnhanced).forEach(key => {
    const raw = (cssPropertiesEnhanced as any)[key];

    if (ANIMATED_CSS_PROPS_TRANSFORM_DISTANCES.includes(key)) {
      const value: string = Number.isFinite(raw) ? `${raw}px` : String(raw);
      transform += ` ${key}(${value})`;
    }
    else if (ANIMATED_CSS_PROPS_TRANSFORM_ANGLES.includes(key)) {
      const value: string = Number.isFinite(raw) ? `${raw}deg` : String(raw);
      transform += ` ${key}(${value})`;
    }
    else if (ANIMATED_CSS_PROPS_TRANSFORM_UNITLESS.includes(key)) {
      transform += ` ${key}(${raw})`;
    }
    else {
      (cssProperties as any)[key] = raw;
    }
  });

  transform = transform.trim();
  if (transform) {
    cssProperties.transform = transform;
  }

  return cssProperties;
};

export { formatAnimatedCSSPropsShorthands };
