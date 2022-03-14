const convertLocationSearchToString = (locationSearch: Record<string, boolean | number | string | undefined>): string => {
  return Object
    .keys(locationSearch)
    .map((optionName: string) => `${optionName}=${String(locationSearch[optionName])}`)
    .join('&');
};

export { convertLocationSearchToString };
