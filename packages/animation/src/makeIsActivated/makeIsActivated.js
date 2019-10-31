function makeIsActivated (component) {
  return function isActivated () {
    if (component.isRoot()) {
      if (component.props.activate !== void 0) {
        return component.props.activate;
      }
      return true;
    }

    const parentFlow = component.props.parentEnergyContext.flow;

    if (component.props.merge) {
      return !!(parentFlow.entering || parentFlow.entered);
    }
    else {
      return !!parentFlow.entered;
    }
  };
}

export { makeIsActivated };
