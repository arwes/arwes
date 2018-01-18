import React from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from './ErrorMessage';

export default class Playground extends React.Component {

  static propTypes = {
    error: PropTypes.any.isRequired,
    onError: PropTypes.func.isRequired
  }

  componentDidCatch (error) {
    this.props.onError(error.message);
  }

  render () {
    const { errorClassName, error, onError, children, ...etc } = this.props;
    const content = error
      ? <ErrorMessage className={errorClassName}>{error}</ErrorMessage>
      : children;
    return (
      <div {...etc}>{content}</div>
    );
  }
}
