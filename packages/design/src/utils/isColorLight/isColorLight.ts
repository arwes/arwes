import readableColor from 'polished/lib/color/readableColor';

const isColorLight = (color: string): boolean => readableColor(color) === '#000';

export { isColorLight };
