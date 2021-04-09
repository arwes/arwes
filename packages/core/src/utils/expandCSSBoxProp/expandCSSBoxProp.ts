function expandCSSBoxProp <T> (value: T | T[] | undefined, defaultValue: T): T[] {
  type P = T | undefined;
  let expansion: P[] = [];

  if (Array.isArray(value)) {
    switch (value.length) {
      case 0: {
        break;
      }
      case 1: {
        const data = value[0];
        expansion = [data, data, data, data];
        break;
      }
      case 2: {
        const [y, x] = value;
        expansion = [y, x, y, x];
        break;
      }
      case 3: {
        const [top, x, bottom] = value;
        expansion = [top, x, bottom, x];
        break;
      }
      default: {
        expansion = value;
        break;
      }
    }
  }
  else {
    expansion = [value, value, value, value];
  }

  return [
    expansion[0] ?? defaultValue,
    expansion[1] ?? defaultValue,
    expansion[2] ?? defaultValue,
    expansion[3] ?? defaultValue
  ];
};

export { expandCSSBoxProp };
