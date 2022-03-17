const cx = (...classNames: Array<string | undefined | null>): string => {
  return classNames.filter(Boolean).join(' ');
};

export { cx };
