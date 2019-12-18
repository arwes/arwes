import { TYPE_STREAM } from '../constants';

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
      component.props.parentEnergyContext.type === TYPE_STREAM
    ) {
      return true;
    }

    return false;
  };
}

export { makeIsOutsourced };
