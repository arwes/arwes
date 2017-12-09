import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';

export default () => {
  return (Inner) => {

    const displayName = Inner.displayName || Inner.name || 'Component';

    const defaultProps = { ...Inner.defaultProps };
    delete defaultProps.sounds;

    class Sounds extends Component {
      static displayName = `ArwesSounds(${displayName})`;
      static defaultProps = defaultProps;
      static contextTypes = {
        sounds: PropTypes.object
      }
      render () {
        const { props, context } = this;
        return <Inner sounds={context.sounds} {...props} />;
      }
    }

    return hoistNonReactStatics(Sounds, Inner);
  };
};
