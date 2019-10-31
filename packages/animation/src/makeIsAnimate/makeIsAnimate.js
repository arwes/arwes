function makeIsAnimate (component) {
  return function isAnimate () {
    let animate = true;

    const providedAnimate = component.props.animationContext.animate;
    if (providedAnimate !== void 0) {
      animate = providedAnimate;
    }

    const propAnimate = component.props.animate;
    if (propAnimate !== void 0) {
      animate = propAnimate;
    }

    return animate;
  };
}

export { makeIsAnimate };
