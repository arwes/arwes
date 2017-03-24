const React = require('react');

const Separator = React.createClass({

  getDefaultProps () {
    return {
      anim: false
    };
  },

  render () {
    const props = this.props;
    const cls = 'pr-separator '+ (props.anim ? 'pr-separator_anim' : '');
    return (
      <div className={cls}>
        <div className='pr-separator__content'>
          <div className='pr-separator__gear' />
        </div>
      </div>
    );
  }
});

module.exports = Separator;
