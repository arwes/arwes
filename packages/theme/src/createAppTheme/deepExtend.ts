// TODO: Set typing.
function deepExtend (target: any = {}, extension: any = {}): any {
  for (const key in extension) {
    if (typeof extension[key] === 'object' && !Array.isArray(extension[key]) && extension[key] !== null) {
      if (target[key] === undefined || target[key] === null) {
        target[key] = {};
      }
      deepExtend(target[key], extension[key]);
    }
    else {
      target[key] = extension[key];
    }
  }

  return target;
}

export { deepExtend };
