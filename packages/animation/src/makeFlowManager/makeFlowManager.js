function makeFlowManager (component) {
  let isFlowActivated = false;

  function checkMount () {
    const animate = component.isAnimate();
    const activated = component.isActivated();

    if (animate && activated) {
      component.enter();
    }
  }

  function checkUpdate () {
    const animate = component.isAnimate();
    const activated = component.isActivated();

    if (animate && activated !== isFlowActivated) {
      isFlowActivated = activated;

      if (component.props.onActivate) {
        component.props.onActivate(activated);
      }

      if (activated) {
        component.enter();
      }
      else {
        component.exit();
      }
    }
  }

  return { checkMount, checkUpdate };
}

export { makeFlowManager };
