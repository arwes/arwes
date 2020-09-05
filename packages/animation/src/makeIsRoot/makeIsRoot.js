function makeIsRoot (component) {
  return function isRoot () {
    let root = true;

    if (component.props.parentEnergyContext) {
      root = false;
    }

    if (component.props.root !== undefined) {
      root = component.props.root;
    }

    return root;
  };
}

export { makeIsRoot };
