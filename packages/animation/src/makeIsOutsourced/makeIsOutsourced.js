import { STREAM_TYPE } from '../constants';

function makeIsOutsourced (component) {
  return function isOutsourced () {
    if (component.isRoot()) {
      return false;
    }

    if (component.props.imperative) {
      return true;
    }

    if (
      component.props.parentEnergyContext &&
      component.props.parentEnergyContext.type === STREAM_TYPE
    ) {
      return true;
    }

    return false;
  };
}

export { makeIsOutsourced };
