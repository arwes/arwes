import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import withStyles from 'react-jss';
import Navigo from 'navigo';

import sandboxes from './sandboxes';

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
    backgroundColor: '#111',
    fontFamily: 'Monaco, Terminal, monospace',
    color: '#0ff'
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

    '& option': {
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
  const [sandboxName, setSandboxName] = useState('/');
  const sandbox = sandboxes.find(item => item.name === sandboxName);

  useEffect(() => {
    router = new Navigo(null, true);

    router.on('/', () => setSandboxName('/'));

    sandboxes.forEach(item => {
      router.on(item.name, () => setSandboxName(item.name)).resolve();
    });
  }, []);

  function onChange (ev) {
    const sandboxName = ev.target.value;
    router.navigate(sandboxName);
  }

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <h1 className={classes.headerTitle}>Arwes Playground</h1>
        <select
          className={classes.headerSelect}
          value={sandboxName}
          onChange={onChange}
        >
          <option value='/'>
            -- Select component --
          </option>
          {sandboxes.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
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
