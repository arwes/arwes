import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { arc } from 'd3-shape';

import AnimationComponent from '../Animation';

const radians = degress => (degress * Math.PI) / 180;
const createArc = arc();

const Aux = ({ children }) => children;
const createArcLight = (details, classes, ...props) => (
  <Aux>
    <path
      {...props}
      className={cx(classes.light, classes.elementFilter, props.className)}
      d={createArc(details)}
    />
    <path
      {...props}
      className={cx(classes.light, props.className)}
      d={createArc(details)}
    />
  </Aux>
);

export default function Logo (props) {

  const {
    theme,
    classes,
    Animation,
    animation,
    animate,
    show,
    size,
    className,
    ...etc
  } = props;
  const cls = cx(classes.root, className);

  return (
    <Animation
      animate={animate}
      show={show}
      timeout={theme.animTime}
      {...animation}
    >
      {anim => (
        <svg
          className={cx(cls, classes[anim.status])}
          width={size}
          height={size}
          viewBox='0 0 1000 1000'
          version='1.1'
          {...etc}
        >

          <filter id='arwes-logo-filter-blur'>
            <feGaussianBlur in='SourceGraphic' stdDeviation='20' />
          </filter>

          <g style={{ transform: 'translate(500px,500px)' }}>

            {/* 1 arc */}
            <circle
              className={cx(classes.light, classes.elementFilter)}
              cx='0'
              cy='0'
              r='85'
            />
            <circle
              className={classes.light}
              cx='0'
              cy='0'
              r='85'
            />

            {/* 2 arc */}
            <path
              className={classes.center}
              d={createArc({
                innerRadius: 200,
                outerRadius: 275,
                startAngle: 0,
                endAngle: radians(360)
              })}
            />

            {/* 3 arc */}
            <path
              className={classes.outer}
              d={createArc({
                innerRadius: 375,
                outerRadius: 475,
                startAngle: 0,
                endAngle: radians(360)
              })}
            />

            {/* 3 arc - highlights */}
            {createArcLight({
              innerRadius: 375,
              outerRadius: 475,
              startAngle: radians(0 + 15),
              endAngle: radians(90 + 15)
            }, classes)}
            {createArcLight({
              innerRadius: 375,
              outerRadius: 475,
              startAngle: radians(90 + 30 + 15),
              endAngle: radians((90 * 2) + 30 + 15)
            }, classes)}
            {createArcLight({
              innerRadius: 375,
              outerRadius: 475,
              startAngle: radians((90 * 2) + (30 * 2) + 15),
              endAngle: radians((90 * 3) + (30 * 2) + 15)
            }, classes)}

          </g>
        </svg>
      )}
    </Animation>
  );
}

Logo.propTypes = {
  Animation: PropTypes.any.isRequired,

  theme: PropTypes.any.isRequired,
  classes: PropTypes.any.isRequired,

  animate: PropTypes.bool,
  show: PropTypes.bool,
  animation: PropTypes.object,

  layer: PropTypes.oneOf(['primary', 'secondary', 'header', 'control', 'success', 'alert', 'disabled']),

  /**
   * Since it is a square, the width and height of the container.
   */
  size: PropTypes.number,
};

Logo.defaultProps = {
  Animation: AnimationComponent,
  show: true,
  layer: 'primary',
  size: 100,
};
