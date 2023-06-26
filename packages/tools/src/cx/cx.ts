const cx = (...classNames: Array<string | boolean | undefined | null>): string => {
  return classNames.filter(Boolean).join(' ');
};

export { cx };
