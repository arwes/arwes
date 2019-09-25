import React from 'react';
import PropTypes from 'prop-types';
import { useAnimation } from '../useAnimation';
import { EnergyContext } from '../EnergyContext';
import { useEnergy } from '../useEnergy';

const ENTERING = 'entering';
const ENTERED = 'entered';
const EXITING = 'exiting';
const EXITED = 'exited';
const createFlow = value => ({ value, [value]: true });

class Component extends React.PureComponent {
  static propTypes = {
    animate: PropTypes.bool,
    root: PropTypes.bool,
    activate: PropTypes.bool,
    duration: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        enter: PropTypes.number,
        exit: PropTypes.number
      })
    ]),
    animationContext: PropTypes.any,
    parentEnergyContext: PropTypes.any,
    children: PropTypes.any
  };

  constructor () {
    super(...arguments);
    this.activated = false;
    this.scheduleTimeout = null;
    this.state = this.getInitialState();
  }

  componentDidMount () {
    const animate = this.isAnimate();
    const activated = this.isActivated();

    if (animate && activated) {
      this.enter();
    }
  }

  componentDidUpdate (prevProps, prevState) {
    const animate = this.isAnimate();
    const activated = this.isActivated();

    if (animate && activated !== this.activated) {
      this.activated = activated;

      if (activated) {
        this.enter();
      }
      else {
        this.exit();
      }
    }
  }

  componentWillUnmount () {
    this.unschedule();
  }

  render () {
    return (
      <EnergyContext.Provider value={this.state}>
        {this.props.children}
      </EnergyContext.Provider>
    );
  }

  getInitialState () {
    const flowValue = this.isAnimate() ? EXITED : ENTERED;
    const flow = createFlow(flowValue);

    return { flow };
  }

  getFlow () {
    return this.state.flow;
  }

  setFlowValue (flowValue) {
    const flow = createFlow(flowValue);

    this.setState(state => ({ ...state, flow }));
  }

  isAnimate () {
    let animate = true;

    const providedAnimate = this.props.animationContext.animate;
    if (providedAnimate !== void 0) {
      animate = providedAnimate;
    }

    const propAnimate = this.props.animate;
    if (propAnimate !== void 0) {
      animate = propAnimate;
    }

    return animate;
  }

  isRoot () {
    let root = true;

    if (this.props.parentEnergyContext) {
      root = false;
    }

    if (this.props.root !== void 0) {
      root = this.props.root;
    }

    return root;
  }

  getDuration () {
    const defaultDuration = { enter: 200, exit: 200 };

    const providedDuration = this.props.animationContext.duration;

    const propValue = this.props.duration;
    const propDuration = typeof propValue === 'number'
      ? { enter: propValue, exit: propValue }
      : propValue;

    const duration = {
      ...defaultDuration,
      ...providedDuration,
      ...propDuration
    };

    return duration;
  }

  isActivated () {
    if (this.isRoot()) {
      if (this.props.activate !== void 0) {
        return this.props.activate;
      }
      return true;
    }
    else {
      return !!this.props.parentEnergyContext.flow.entered;
    }
  }

  enter () {
    this.schedule(0, () => {
      const flowValue = this.state.flow.value;

      if (flowValue === ENTERING || flowValue === ENTERED) {
        return;
      }

      this.setFlowValue(ENTERING);

      const duration = this.getDuration();
      this.schedule(duration.enter, () => this.setFlowValue(ENTERED));
    });
  }

  exit () {
    this.schedule(0, () => {
      const flowValue = this.state.flow.value;

      if (flowValue === EXITING || flowValue === EXITED) {
        return;
      }

      this.setFlowValue(EXITING);

      const duration = this.getDuration();
      this.schedule(duration.exit, () => this.setFlowValue(EXITED));
    });
  }

  unschedule () {
    clearTimeout(this.scheduleTimeout);
  }

  schedule (time, callback) {
    this.unschedule();
    this.scheduleTimeout = setTimeout(callback, time);
  }
}

const Energy = React.forwardRef((props, ref) => {
  const animationContext = useAnimation();
  const parentEnergyContext = useEnergy();

  return (
    <Component
      {...props}
      ref={ref}
      animationContext={animationContext}
      parentEnergyContext={parentEnergyContext}
    />
  );
});

Energy.displayName = 'Energy';

export { Component, Energy };
