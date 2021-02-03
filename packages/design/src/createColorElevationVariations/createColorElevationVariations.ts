import lighten from 'polished/lib/color/lighten';
import darken from 'polished/lib/color/darken';

import { ThemePaletteColorElevation } from '../constants';
import { isColorLight } from '../utils/isColorLight';

const createColorElevationVariations = (
  main: string,
  elevationOffset: number
): ThemePaletteColorElevation => {
  const elevate = (level: number): string => {
    const value = elevationOffset * level;

    if (value === 0) {
      return main;
    }

    return isColorLight(main) ? darken(value, main) : lighten(value, main);
  };

  return Object.freeze({ main, elevate });
};

export { createColorElevationVariations };
