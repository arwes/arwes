/* eslint-env jest */
/* istanbul ignore file */

import React from 'react';

interface ErrorCatcher {
  error?: Error
  Catcher?: React.ComponentClass
}

function makeErrorCatcher (): ErrorCatcher {
  const errorCatcher: ErrorCatcher = {};

  class Catcher extends React.Component<any, any> {
    render (): React.ReactNode {
      return this.props.children;
    }

    componentDidCatch (err: Error): void {
      errorCatcher.error = err;
    }
  }

  errorCatcher.Catcher = Catcher;

  return errorCatcher;
}

export { ErrorCatcher, makeErrorCatcher };
