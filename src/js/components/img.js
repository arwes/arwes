const React = require('react');
const Box = require('./box');

const Img = React.createClass({

  getDefaultProps () {
    return {
      src: '',
      alt: null,
      small: false
    };
  },

  render () {
    const props = this.props;
    return (
      <div className='pr-img'>
        <Box small={props.small}>
          <div className='pr-img__frame'>
            <div className='pr-img__cover'></div>
            <img src={props.src} alt={props.alt} />
          </div>
        </Box>
      </div>
    );
  }
});

module.exports = Img;
