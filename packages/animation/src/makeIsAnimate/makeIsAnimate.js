function makeIsAnimate (component) {
  return function isAnimate () {
    let animate = true;

    const providedAnimate = component.props.animationContext.animate;
    if (providedAnimate !== undefined) {
      animate = providedAnimate;
    }

    const propAnimate = component.props.animate;
    if (propAnimate !== undefined) {
      animate = propAnimate;
    }

    return animate;
  };
}

export { makeIsAnimate };
