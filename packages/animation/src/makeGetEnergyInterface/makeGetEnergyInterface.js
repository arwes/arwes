function makeGetEnergyInterface (component) {
  return function getEnergyInterface (flowValue) {
    const {
      getDuration,
      getDurationIn,
      getDurationOut,
      updateDuration,
      hasEntered,
      hasExited
    } = component;

    const flow = Object.freeze({ value: flowValue, [flowValue]: true });

    return Object.freeze({
      getDuration,
      getDurationIn,
      getDurationOut,
      updateDuration,
      hasEntered,
      hasExited,
      flow
    });
  };
}

export { makeGetEnergyInterface };
