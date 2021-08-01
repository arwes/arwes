const convertLocationSearchToObject = (locationSearch: string): Record<string, string> => {
  return locationSearch
    .replace('?', '')
    .split('&')
    .filter(Boolean)
    .reduce((allOptions, option) => {
      const [optionName, optionValue] = option.split('=').slice(0, 2);
      return { ...allOptions, [optionName]: optionValue };
    }, {});
};

export { convertLocationSearchToObject };
