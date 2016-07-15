const React = require('react');

const Loading = React.createClass({

  getDefaultProps () {
    return {
      done: false,
      status: ''
    };
  },

  render () {
    const props = this.props;
    const status = props.status ? `pr-loading_${props.status}` : '';
    const done = props.done ? 'pr-loading_done' : '';
    const cls = `pr-loading ${status} ${done}`;
    return (
      <div className={cls}>
        <div className='pr-loading__frame'>
          <div className='pr-loading__content'>
            <div className='pr-loading__circle1' />
            <div className='pr-loading__circle2' />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Loading;
