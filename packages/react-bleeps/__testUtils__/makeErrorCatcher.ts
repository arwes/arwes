/* eslint-env jest */
/* istanbul ignore file */

import { ReactNode, Component, ComponentClass } from 'react';

interface ErrorCatcher {
  error?: Error
  Catcher?: ComponentClass
}

function makeErrorCatcher (): ErrorCatcher {
  const errorCatcher: ErrorCatcher = {};

  class Catcher extends Component<any, any> {
    render (): ReactNode {
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
