import { STREAM_TYPE } from '../constants';

function makeFlowManager (component) {
  let isFlowActivated = false;

  function checkMount () {
    const { parentEnergyContext } = component.props;

    // TODO: Add tests.
    if (parentEnergyContext && parentEnergyContext.type === STREAM_TYPE) {
      parentEnergyContext._subscribe(component);
    }

    if (!component.isAnimate() || component.isOutsourced()) {
      return;
    }

    if (component.isActivated()) {
      component.enter();
    }
  }

  function checkUpdate () {
    if (!component.isAnimate() || component.isOutsourced()) {
      return;
    }

    const activated = component.isActivated();

    if (activated !== isFlowActivated) {
      isFlowActivated = activated;

      if (activated) {
        component.enter();
      }
      else {
        component.exit();
      }
    }
  }

  // TODO: Add tests.
  function checkUnmount () {
    const { parentEnergyContext } = component.props;

    if (parentEnergyContext && parentEnergyContext.type === STREAM_TYPE) {
      parentEnergyContext._unsubscribe(component);
    }
  }

  return { checkMount, checkUpdate, checkUnmount };
}

export { makeFlowManager };
