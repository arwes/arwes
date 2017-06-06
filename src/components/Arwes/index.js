import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import docReady from 'doc-ready';

export default class Arwes extends Component {

  constructor () {
    super(...arguments);
    this.state = {
      ready: false,
    };
  }

  componentDidMount () {
    docReady(() => {
      this.setState({ ready: true });
    });
  }

  render () {

    const { resources, className, children, ...rest } = this.props;
    const cls = classNames('arwes', {
      'arwes--resources': resources,
      'arwes--ready': this.state.ready,
    }, className);

    return (
      <div className={cls} {...rest}>
        <div className="arwes__pattern">
          <div className="arwes__intern"></div>
          <div className="arwes__main">
            {children}
          </div>
        </div>
      </div>
    );
  }
}

Arwes.propTypes = {
  resources: PropTypes.bool,
};

Arwes.defaultProps = {
  resources: false,
};
