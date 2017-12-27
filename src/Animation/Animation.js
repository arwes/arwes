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

  /**
   * Enable the animation for this component and its children.
   */
  animate: PropTypes.bool,

  /**
   * If animatable, should component start its animation or not.
   */
  show: PropTypes.bool,

  /**
   * A function to render the children. It will receive an object parameter
   * with information about the animation status, with the following properties:
   * - `status: string` - The `<Transition />` received status parameter.
   * - `entering: bool` - Started to be shown.
   * - `entered: bool` - Animation is completed and now is shown.
   * - `exiting: bool` - Started to be hidden.
   * - `exited: bool` - Animation is completed and now is hidden.
   */
  children: PropTypes.func.isRequired,

  /**
   * Do the animation on first mount.
   * Passed down to `<Transition />`.
   */
  appear: PropTypes.bool,

  /**
   * Animation enter and exit duration in ms.
   * Passed down to `<Transition />`.
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
