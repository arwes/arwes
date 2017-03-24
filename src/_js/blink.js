const React = require('react');

const Blink = React.createClass({
  render () {
    return (
      <span className='pr-blink'>&#9611;</span>
    );
  }
});

module.exports = Blink;
