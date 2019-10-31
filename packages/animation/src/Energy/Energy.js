import React from 'react';
import PropTypes from 'prop-types';
import { useAnimation } from '../useAnimation';
import { EnergyContext } from '../EnergyContext';
import { useEnergy } from '../useEnergy';
import { makeIsAnimate } from '../makeIsAnimate';
import { makeIsRoot } from '../makeIsRoot';
import { makeIsActivated } from '../makeIsActivated';
import { makeGetEnergyInterface } from '../makeGetEnergyInterface';
import { makeDurationManager } from '../makeDurationManager';
import { makeFlowManager } from '../makeFlowManager';
import { makeScheduler } from '../makeScheduler';

const ENTERING = 'entering';
const ENTERED = 'entered';
const EXITING = 'exiting';
const EXITED = 'exited';

class Component extends React.PureComponent {
  /* eslint-disable react/no-unused-prop-types */
  static propTypes = {
    animate: PropTypes.bool,
    root: PropTypes.bool,
    activate: PropTypes.bool,
    duration: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        enter: PropTypes.number,
        exit: PropTypes.number,
        delay: PropTypes.number
      })
    ]),
    merge: PropTypes.bool,
    onActivate: PropTypes.func,
    animationContext: PropTypes.any,
    parentEnergyContext: PropTypes.any,
    children: PropTypes.any
  };
  /* eslint-enable react/no-unused-prop-types */

  constructor () {
    super(...arguments);

    this.isAnimate = makeIsAnimate(this);
    this.isRoot = makeIsRoot(this);
    this.isActivated = makeIsActivated(this);
    this.getEnergyInterface = makeGetEnergyInterface(this);
    this.durationManager = makeDurationManager(this);
    this.flowManager = makeFlowManager(this);
    this.scheduler = makeScheduler();

    this.state = this.getInitialState();
    this._flowHasEntered = false;
    this._flowHasExited = false;
  }

  getInitialState () {
    const flowValue = this.isAnimate() ? EXITED : ENTERED;
    const energyInterface = this.getEnergyInterface(flowValue);

    return { flowValue, energyInterface };
  }

  componentDidMount () {
    this.flowManager.checkMount();
  }

  componentDidUpdate () {
    this.flowManager.checkUpdate();
  }

  componentWillUnmount () {
    this.scheduler.stop();
  }

  render () {
    return (
      <EnergyContext.Provider value={this.state.energyInterface}>
        {this.props.children}
      </EnergyContext.Provider>
    );
  }

  setFlowValue (flowValue) {
    const energyInterface = this.getEnergyInterface(flowValue);

    this.setState(
      state => ({ ...state, flowValue, energyInterface }),
      () => {
        if (flowValue === ENTERED) {
          this._flowHasEntered = true;
        }
        else if (flowValue === EXITED) {
          this._flowHasExited = true;
        }
      }
    );
  }

  getFlow () {
    return this.state.energyInterface.flow;
  }

  getDuration = () => {
    return this.durationManager.get();
  }

  getDurationIn = () => {
    const duration = this.durationManager.get();
    return duration.enter + duration.delay;
  }

  getDurationOut = () => {
    const duration = this.durationManager.get();
    return duration.exit;
  }

  updateDuration = duration => {
    this.durationManager.update(duration);
  }

  hasEntered = () => {
    return this._flowHasEntered;
  }

  hasExited = () => {
    return this._flowHasExited;
  }

  enter () {
    const flowValue = this.state.flowValue;

    if (flowValue === ENTERING || flowValue === ENTERED) {
      return;
    }

    const duration = this.getDuration();
    const delay = flowValue === EXITED ? duration.delay : 0;

    this.scheduler.start(delay, () => {
      const duration = this.getDuration();

      this.setFlowValue(ENTERING);
      this.scheduler.start(duration.enter, () => this.setFlowValue(ENTERED));
    });
  }

  exit () {
    const flowValue = this.state.flowValue;

    if (flowValue === EXITING || flowValue === EXITED) {
      return;
    }

    this.scheduler.start(0, () => {
      const duration = this.getDuration();

      this.setFlowValue(EXITING);
      this.scheduler.start(duration.exit, () => this.setFlowValue(EXITED));
    });
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
