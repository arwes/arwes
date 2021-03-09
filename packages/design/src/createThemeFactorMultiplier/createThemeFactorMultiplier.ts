type FactorMultiplier = (multiplier?: number) => number;

const createThemeFactorMultiplier = (factor: number): FactorMultiplier => {
  if (process.env.NODE_ENV !== 'production' && !Number.isFinite(factor)) {
    throw new Error(`Factor value was expected to be a number, but received "${String(factor)}".`);
  }

  return (multiplier: number = 1): number => {
    if (process.env.NODE_ENV !== 'production' && !Number.isFinite(multiplier)) {
      throw new Error(`Multiplier value was expected to be a number, but received "${multiplier}".`);
    }

    return Math.round(factor * multiplier);
  };
};

export { FactorMultiplier, createThemeFactorMultiplier };
