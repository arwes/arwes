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
