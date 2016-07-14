import React from 'react';

const Box = React.createClass({
  render () {
    const props = this.props;
    const small = props.small ? 'pr-box_small' : '';
    const cls = `pr-box ${small}`;
    return (
      <div className={cls}>
        <div className='pr-box__frame'>
          {props.children}
        </div>
        <div className='pr-box__corner pr-box__corner1'></div>
        <div className='pr-box__corner pr-box__corner2'></div>
        <div className='pr-box__corner pr-box__corner3'></div>
        <div className='pr-box__corner pr-box__corner4'></div>
      </div>
    );
  }
});

export default Box;
