import { ENTERING, ENTERED } from '../constants';

function makeIsActivated (component) {
  return function isActivated () {
    // Is root
    if (component.isRoot()) {
      if (component.props.activate !== void 0) {
        return component.props.activate;
      }

      return true;
    }

    // Is controlled child
    else if (component.props.parentEnergyContext) {
      const parentFlow = component.props.parentEnergyContext.flow;

      if (component.props.merge) {
        return !!(parentFlow.entering || parentFlow.entered);
      }

      return !!parentFlow.entered;
    }

    // Is outsourced

    const { flowValue } = component.state;

    return flowValue === ENTERING || flowValue === ENTERED;
  };
}

export { makeIsActivated };
