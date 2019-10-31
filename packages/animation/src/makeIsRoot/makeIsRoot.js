function makeIsRoot (component) {
  return function isRoot () {
    let root = true;

    if (component.props.parentEnergyContext) {
      root = false;
    }

    if (component.props.root !== void 0) {
      root = component.props.root;
    }

    return root;
  };
}

export { makeIsRoot };
