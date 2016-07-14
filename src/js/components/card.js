import React from 'react';
import Box from './box.js';

const Card = React.createClass({

  getDefaultProps () {
    return {
      title: 'Title',
      href: '',
      lang: null,
      info: null
    };
  },

  render () {
    const props = this.props;

    const titleText = props.href ?
      <a href={props.href}>{props.title}</a> :
      props.title;

    const titleCls = props.info ?
      'small-12 medium-8' :
      'small-12';

    const title = (
      <h1 className={`pr-card__title column ${titleCls}`}>
        {titleText}
      </h1>
    );

    const info = props.info ?
      <div className='column small-12 medium-4 pr-card__info'>{props.info}</div> :
      null;

    return (
      <article className='pr-card' lang={props.lang}>
        <Box>
          <div className='pr-card__frame'>
            <div className='row align-justify'>
              {title}
              {info}
            </div>
            <div className='row pr-card__content'>
              <div className='column small-12'>
                {props.children}
              </div>
            </div>
          </div>
        </Box>
      </article>
    );
  }
});

export default Card;
