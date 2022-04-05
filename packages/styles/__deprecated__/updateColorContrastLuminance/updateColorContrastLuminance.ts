import readableColor from 'polished/lib/color/readableColor';
import darken from 'polished/lib/color/darken';
import lighten from 'polished/lib/color/lighten';

const updateColorContrastLuminance = (offset: number | string, color: string): string => {
  const isColorLight = readableColor(color) === '#000';
  return isColorLight ? darken(offset, color) : lighten(offset, color);
};

export { updateColorContrastLuminance };
