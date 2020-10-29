import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import withStyles from 'react-jss';
import Navigo from 'navigo';
import sandboxes from './sandboxes';

const sandboxesItems = sandboxes
  .map(({ name, items }) => items.map(item => {
    item.category = name;
    item.key = `${name}/${item.name}`;
    return item;
  }))
  .reduce((total, items) => [...total, ...items], []);

const styles = {
  '@global': {
    html: {
      boxSizing: 'border-box'
    },
    '*, *:before, *:after': {
      boxSizing: 'inherit'
    },
    'html, body': {
      margin: 0,
      padding: 0,
      backgroundColor: '#000'
    }
  },
  root: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    display: 'flex',
    overflow: 'hidden',
    width: '100%',
    height: 40,
    borderBottom: '1px solid #0ff',
    backgroundColor: '#222',
    fontFamily: 'Monaco, Terminal, monospace',
    color: '#0ff',
    userSelect: 'none'
  },
  headerTitle: {
    display: 'inline-block',
    margin: [0, 10],
    lineHeight: '40px',
    fontSize: 20,
    fontWeight: 'bold'
  },
  headerSelect: {
    display: 'inline-block',
    margin: [5, 0],
    height: 30,
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
    cursor: 'pointer',

    backgroundColor: 'transparent',
    fontFamily: 'Monaco, Terminal, monospace',
    lineHeight: '30px',
    fontSize: 14,
    color: '#0ff',

    '& option, & optgroup': {
      backgroundColor: '#000',
      color: '#0ff'
    }
  },
  content: {
    flex: 1,
    position: 'relative',
    display: 'block',
    overflowY: 'auto'
  }
};

let router;

const Playground = withStyles(styles)(({ classes }) => { // eslint-disable-line react/prop-types
  const [sandboxKey, setSandboxKey] = useState('/');
  const sandbox = sandboxesItems.find(({ key }) => key === sandboxKey);

  useEffect(() => {
    router = new Navigo(null, true);

    router.on('/', () => setSandboxKey('/'));

    sandboxesItems.forEach(item => {
      router.on(item.key, () => setSandboxKey(item.key)).resolve();
    });
  }, []);

  function onChange (ev) {
    const sandboxKey = ev.target.value;
    router.navigate(sandboxKey);
  }

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <h1 className={classes.headerTitle}>Arwes Playground</h1>
        <select
          className={classes.headerSelect}
          value={sandboxKey}
          onChange={onChange}
        >
          <option value='/'>-- Select --</option>
          {sandboxes.map(sandbox => (
            <optgroup
              key={sandbox.name}
              label={sandbox.name}
            >
              {sandbox.items.map(item => (
                <option
                  key={item.name}
                  value={`${sandbox.name}/${item.name}`}
                >
                  {item.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </header>
      <main className={classes.content}>
        {!!sandbox && <sandbox.component />}
      </main>
    </div>
  );
});

render(<Playground />, document.querySelector('#root'));
