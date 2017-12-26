import React from 'react';
import Table from '../../src/Table';
import Code from '../../src/Code';
import Link from './Link';

const getType = (prop) => {
  return prop.flowType || prop.type;
};

const renderType = prop => {
  const type = getType(prop);

  if (!type) {
		return 'unknown';
	}

  const { name } = type;

	switch (name) {
		case 'arrayOf':
			return `${type.value.name}[]`;
		case 'objectOf':
			return `{${renderType(type.value)}}`;
		case 'instanceOf':
			return type.value;
		default:
			return name;
	}
};

const renderDefault = prop => {
  if (prop.defaultValue) {
    return <Code>{prop.defaultValue.value}</Code>;
  }
  if (prop.required) {
    return <i>Required</i>;
  }
  return '';
};

const getComponentPropsItems = (props, compile) => {
  return Object.keys(props).map(key => {
    const prop = props[key];
    return [
      key,
      renderType(prop),
      renderDefault(prop),
      compile(prop.description).tree
    ];
  });
};

export default ({ component, compile }) => {
  return (
    <div>

      <h1>{component.name}</h1>

      {compile(component.readme).tree}

      {!!component.api && !!component.api.props && (
      <Table
        headers={['Prop name', 'Type', 'Default', 'Description']}
        dataset={getComponentPropsItems(component.api.props, compile)}
        minWidth={700}
      />
      )}

      <p>
        <small>
        Source code:
        {' '}
        <Link href={'https://github.com/romelperez/arwes/blob/master/' + component.path}>
          <code>{component.path}</code>
        </Link>
        </small>
      </p>

    </div>
  );
};
