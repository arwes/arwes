/**
 * Map the name and the properties in an object.
 * This is used to map CSS rules as plain objects.
 * @param  {Object} obj - The props.
 * @param  {Function} map - The mapper.
 * @return {Object}
 */
export const mapProps = (obj, map = () => {}) => {

  const newObj = {};
  const props = Object.keys(obj || {});

  if (!props.length) return {};

  const current = props.map(name => ({
    name,
    value: obj[name]
  }));

  const updated = current.map(prop => map(prop.name, prop.value));

  updated.forEach(prop => {
    newObj[prop.name] = prop.value;
  });

  return newObj;
};

/**
 * Get active resource from responsive list.
 * @param  {String|Object} resources - The path to the resource or the resources
 * by responsiveness.
 * @param  {Object} responsive - The current responsive status.
 * @return {String} - The selected resource.
 */
export const getResponsiveResource = (resources, responsive = {}) => {

  let resource = null;

  if (typeof resources === 'string') {
    resource = resources;
  }
  else if (resources) {
    const { small, medium, large } = responsive;
    resource = small
      ? resources.small
      : medium
        ? resources.medium
        : large
          ? resources.large
          : resources.xlarge;
  }

  return resource;
};
