const METHODS = [
  'getDuration',
  'updateDuration',
  'hasEntered',
  'hasExited',
  '_subscribe',
  '_unsubscribe'
];

function makeGetEnergyInterface (component) {
  return function getEnergyInterface (flowValue) {
    const { type } = component;

    const flow = Object.freeze({ value: flowValue, [flowValue]: true });
    const methods = {};

    METHODS.forEach(methodName => {
      if (component[methodName]) {
        methods[methodName] = component[methodName].bind(component);
      }
    });

    return Object.freeze({ type, flow, ...methods });
  };
}

export { METHODS, makeGetEnergyInterface };
