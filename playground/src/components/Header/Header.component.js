import React from 'react';

function Component ({ classes }) {
  return (
    <header className={classes.root}>
      <a href='/'>
        <h1 className={classes.title}>Arwes Playground</h1>
      </a>
    </header>
  );
};

export { Component };
