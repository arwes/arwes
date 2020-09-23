/* eslint-disable react/prop-types */

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
      backgroundColor: '#000909'
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    width: '100%',
    height: 40,
    borderBottom: '1px solid #06d8d7',
    backgroundColor: '#031214',
    fontFamily: '"Titillium Web", sans-serif',
    color: '#a1ecfb',
    userSelect: 'none',

    '& a': {
      textDecoration: 'none',
      color: 'inherit',
      outline: 'none',

      '&hover, &:focus': {
        outline: 'none'
      }
    }
  },
  headerHeading: {
    display: 'flex',
    flexDirection: 'row'
  },
  headerLogo: {
    display: 'inline-block',
    margin: 7,
    width: 26,
    height: 26
  },
  headerTitle: {
    display: 'inline-block',
    margin: [0, 10, 0, 0],
    lineHeight: '40px',
    fontSize: 20,
    fontWeight: 'bold'
  },
  headerSelect: {
    display: 'inline-block',
    margin: 5,
    height: 30,
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    fontFamily: '"Titillium Web", sans-serif',
    lineHeight: '30px',
    fontSize: 14,
    color: '#a1ecfb',

    '& option, & optgroup': {
      backgroundColor: '#031214',
      color: '#a1ecfb'
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

function Playground ({ classes }) {
  const [sandboxKey, setSandboxKey] = useState('/');
  const sandbox = sandboxesItems.find(({ key }) => key === sandboxKey);

  useEffect(() => {
    router = new Navigo(null, true);

    router.on('/', () => setSandboxKey('/'));

    sandboxesItems.forEach(item => {
      router.on(item.key, () => setSandboxKey(item.key)).resolve();
    });
  }, []);

  function onChange (event) {
    const sandboxKey = event.target.value;
    router.navigate(sandboxKey);
  }

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <a className={classes.headerHeading} href='/'>
          <img className={classes.headerLogo} src='arwes.png' />
          <h1 className={classes.headerTitle}>Arwes Playground</h1>
        </a>
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
};

const App = withStyles(styles)(Playground);

render(<App />, document.querySelector('#root'));
