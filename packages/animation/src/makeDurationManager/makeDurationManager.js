function makeDurationManager (component) {
  let customDuration;

  function get () {
    const defaultDuration = { enter: 200, exit: 200, stagger: 0, delay: 0 };

    const providedDuration = component.props.animationContext.duration;

    const propValue = component.props.duration;
    const propDuration = typeof propValue === 'number'
      ? { enter: propValue, exit: propValue }
      : propValue;

    const duration = {
      ...defaultDuration,
      ...providedDuration,
      ...propDuration,
      ...customDuration
    };

    return duration;
  }

  function update (duration) {
    const value = typeof duration === 'number'
      ? { enter: duration, exit: duration }
      : duration;

    customDuration = value;
  }

  return { get, update };
}

export { makeDurationManager };
