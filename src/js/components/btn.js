const React = require('react');
const Box = require('./box');

const Btn = React.createClass({

  getDefaultProps () {
    return {
      href: null,
      icon: ''
    };
  },

  render () {
    const props = this.props;
    const icon = <i className={`mdi mdi-${props.icon}`} />;

    return (
      <a href={props.href}>
        <div className='pr-btn'>
          <Box small={true}>
            <div className='pr-btn__frame'>
              {icon}
              {' '}
              {this.props.children}
            </div>
          </Box>
        </div>
      </a>
    );
  }
});

module.exports = Btn;
