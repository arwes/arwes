import React from 'react';
import Group from 'react-group';

import withStyles from '../../src/tools/withStyles';
import Table from '../../src/Table';
import Code from '../../src/Code';
import Link from './Link';

const Markdown = withStyles({
  root: {
    '& p': {
      display: 'inline-block',
    },
  },
})(({ classes, children, ...etc }) => (
  <span className={classes.root} {...etc}>{children}</span>
));

function getType (prop) {
  return prop.flowType || prop.type;
}

function renderType (type) {
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
}

function renderDefault (prop) {
  if (prop.defaultValue) {
    return <Code>{prop.defaultValue.value}</Code>;
  }
  if (prop.required) {
    return <i>Required</i>;
  }
  return '';
}

function renderEnum (prop) {
  if (!Array.isArray(getType(prop).value)) {
    return <div>{getType(prop).value}</div>;
  }

  const values = getType(prop).value.map(({ value }) => (
    <Code key={value}>{value}</Code>
  ));

  return (
    <div>
      One of:{' '}
      <Group separator=', ' inline>
        {values}
      </Group>
    </div>
  );
}

function renderUnion (prop) {
  if (!Array.isArray(getType(prop).value)) {
    return <div>{getType(prop).value}</div>;
  }

  const values = getType(prop).value.map((value, index) => (
    <Code key={`${value.name}-${index}`}>{renderType(value)}</Code>
  ));

  return (
    <div>
      One of type:{' '}
      <Group separator=', ' inline>
        {values}
      </Group>
    </div>
  );
}

function renderShape (props) {
  const rows = [];
  for (const name in props) {
    const prop = props[name];
    const defaultValue = renderDefault(prop);
    rows.push(
      <div key={name}>
        <Code>{name}</Code>
        {': '}
        <Code>{renderType(prop)}</Code>
        {defaultValue && ' — '}
        {defaultValue}
        {!!prop.description && ' — '}
        {!!prop.description && prop.description}
      </div>
    );
  }
  return rows;
}

function renderExtra (prop) {
  const type = getType(prop);

  if (!type) {
    return null;
  }

  switch (type.name) {
    case 'enum':
      return renderEnum(prop);
    case 'union':
      return renderUnion(prop);
    case 'shape':
      return renderShape(prop.type.value);
    case 'arrayOf':
      if (type.value.name === 'shape') {
        return renderShape(prop.type.value.value);
      }
      return null;
    case 'objectOf':
      if (type.value.name === 'shape') {
        return renderShape(prop.type.value.value);
      }
      return null;
    default:
      return null;
  }
}

function renderDescription (prop, compile) {
  return (
    <div>
      {compile(prop.description).tree}
      {renderExtra(prop)}
    </div>
  );
}

function getComponentPropsItems (props, compile) {
  return Object.keys(props).map(key => {
    const prop = props[key];
    return [
      key,
      renderType(getType(prop)),
      renderDefault(prop),
      renderDescription(prop, compile)
    ];
  });
}

function renderArgument (arg, compile) {
  return (
    <span>
      {!!arg.name && <Code>{arg.name}</Code>}
      {!!arg.name && !!arg.type && ':'}
      {!!arg.type && <Code>{arg.type.name}</Code>}
      {!!arg.description && (
        <span>
          {' — '}
          <Markdown>{compile(arg.description).tree}</Markdown>
        </span>
      )}
    </span>
  );
}

function getComponentMethodsItems (methods, compile) {
  return methods.map(method => {
    const { name, params = [], description, returns } = method;
    return [
      name,
      params.map((param, index) => (
        <div key={index}>
          {renderArgument(param, compile)}
        </div>
      )),
      <div>
        {!!description && compile(description).tree}
        {!!returns && (
          <div>Returns {renderArgument(returns, compile)}</div>
        )}
      </div>
    ];
  });
}

export default withStyles({
  option: {
    display: 'inline-block',
    whiteSpace: 'nowrap',
  }
})(({ classes, component, compile }) => {
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

      {!!component.api && !!component.api.methods && !!component.api.methods.length && (
      <Table
        headers={['Method name', 'Parameters', 'Description']}
        dataset={getComponentMethodsItems(component.api.methods, compile)}
        minWidth={700}
      />
      )}

      <p>
        <small className={classes.option}>
          Source code:
          {' '}
          <Link href={'https://github.com/romelperez/arwes/blob/master/' + component.path}>
            <code>{component.path}</code>
          </Link>
        </small>
        {' '}
        <small className={classes.option}>
          Open in:
          {' '}
          <Link href={'/play/#' + component.name.toLowerCase()}>
            Playground
          </Link>
        </small>
      </p>

    </div>
  );
});
