const makeFilterObjectKeys = (allowedKeys: string[]) =>
  (providedObject: Record<string, any>) =>
    allowedKeys
      .filter(key => providedObject[key] !== undefined)
      .reduce((obj, key) => ({ ...obj, [key]: providedObject[key] }), {});

export { makeFilterObjectKeys };
