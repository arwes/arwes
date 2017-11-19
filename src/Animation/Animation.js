import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

const getStatuses = status => ({
  entering: status === 'entering',
  entered: status === 'entered',
  exiting: status === 'exiting',
  exited: status === 'exited',
});

export default function Animation (props) {
  const { animate, show, appear, timeout, children, ...rest } = props;
  return (
    <Transition
      appear={animate ? appear : false}
      timeout={animate ? timeout : 0}
      in={show}
      {...rest}
    >
      {status => children(
        animate
        ? { status, ...getStatuses(status) }
        : { status: '' }
      )}
    </Transition>
  );
}

Animation.propTypes = {
  animate: PropTypes.bool,
  show: PropTypes.bool,
  children: PropTypes.func.isRequired,

  /**
   * Do the animation on first mount.
   */
  appear: PropTypes.bool,

  /**
   * Animation in and out duration.
   */
  timeout: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      enter: PropTypes.number,
      exit: PropTypes.number,
    })
  ]),
};

Animation.defaultProps = {
  show: true,
  animate: false,
  appear: true,
  timeout: 0,
};
