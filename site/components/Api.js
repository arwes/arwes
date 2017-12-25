import React from 'react';

import Table from '../../src/Table';

import createCompiler from '../createCompiler';
import Link from './Link';

const compile = createCompiler();

const getComponentPropsItems = (props) => {
  return Object.keys(props).map(key => {
    const prop = props[key];
    return [
      key,
      prop.type && prop.type.name,
      prop.defaultValue && prop.defaultValue.value,
      compile(prop.description).tree
    ];
  });
};

export default ({ component }) => {
  return (
    <div>

      <h1>{component.name}</h1>

      {compile(component.readme).tree}

      {!!component.api && !!component.api.props && (
      <Table
        headers={['Prop name', 'Type', 'Default', 'Description']}
        dataset={getComponentPropsItems(component.api.props)}
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
