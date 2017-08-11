import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import fecha from 'fecha';
import Frame from '../Frame';

export default class CardProject extends Component {

  constructor () {
    super(...arguments);
  }

  render () {

    const {
      name,
      stars,
      type,
      date,
      lang,
      className,
      children,
      ...rest
    } = this.props;
    const cls = classNames('arwes-card-project', className);

    const stats = [];

    // stars
    stats.push(
      <span>
        <i className={'mdi mdi-circle' + (stars < 1 ? '-outline' : '')} />
        <i className={'mdi mdi-circle' + (stars < 2 ? '-outline' : '')} />
        <i className={'mdi mdi-circle' + (stars < 3 ? '-outline' : '')} />
      </span>
    );

    // type
    stats.push(
      <span>
        <i className={`mdi mdi-${type.icon}`} /> {type.name}
      </span>
    );

    // date
    if (date) {
      stats.push(
        <time dateTime={fecha.format(date, 'YYYY-MM-DD')}>
          <i className='mdi mdi-calendar' /> {fecha.format(date, 'YYYY-MM')}
        </time>
      );
    }

    // lang
    stats.push(
      <span className='arwes-card-project__lang'>
        <i className='mdi mdi-note-text' /> {lang}
      </span>
    );

    return (
      <div className={cls} lang={lang} {...rest}>
        <Frame border corners={2} level={-1}>
          <div className='arwes-card-project__head'>
            <h3>{name}</h3>
            <i className='mdi mdi-package' />
          </div>
          <div className='arwes-card-project__body'>
            <p>{children}</p>
          </div>
          <div className='arwes-card-project__foot'>
            <p>
              {stats.map((stat, index) => (
                stat && (
                  <span key={index} className='arwes-card-project__stat'>
                    {stat}
                  </span>
                )
              ))}
            </p>
          </div>
        </Frame>
      </div>
    );
  }
}

CardProject.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  stars: PropTypes.oneOf([0, 1, 2, 3]),
  type: PropTypes.shape({
    name: PropTypes.string,
    icon: PropTypes.string,
  }),
  date: PropTypes.object,
  lang: PropTypes.string,
};

CardProject.defaultProps = {
  stars: 0,
  type: {
    name: 'Project',
    icon: 'chip',
  },
  lang: 'en',
};
