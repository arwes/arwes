const React = require('react');

const Loading = React.createClass({

  getDefaultProps () {
    return {
      status: ''
    };
  },

  render () {
    const props = this.props;
    const status = props.status ? `pr-loading_${props.status}` : '';
    const cls = `pr-loading ${status}`;
    return (
      <div className={cls}>
        <div className='pr-loading__content'>
          <div className='pr-loading__circle1' />
          <div className='pr-loading__circle2' />
        </div>
      </div>
    );
  }
});

module.exports = Loading;
