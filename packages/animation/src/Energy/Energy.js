/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { useAnimation } from '../useAnimation';
import { EnergyContext } from '../EnergyContext';
import { useEnergy } from '../useEnergy';
import { makeIsAnimate } from '../makeIsAnimate';
import { makeIsRoot } from '../makeIsRoot';
import { makeIsActivated } from '../makeIsActivated';
import { makeIsOutsourced } from '../makeIsOutsourced';
import { makeGetEnergyInterface } from '../makeGetEnergyInterface';
import { makeDurationManager } from '../makeDurationManager';
import { makeFlowManager } from '../makeFlowManager';
import { makeScheduler } from '../makeScheduler';
import { ENERGY, ENTERING, ENTERED, EXITING, EXITED } from '../constants';

class Component extends React.PureComponent {
  static propTypes = {
    animate: PropTypes.bool,
    root: PropTypes.bool,
    activate: PropTypes.bool,
    duration: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        enter: PropTypes.number,
        exit: PropTypes.number,
        delay: PropTypes.number,
        offset: PropTypes.number
      })
    ]),
    merge: PropTypes.bool,
    imperative: PropTypes.bool,
    onActivation: PropTypes.func,
    animationContext: PropTypes.any,
    parentEnergyContext: PropTypes.any,
    children: PropTypes.any
  };

  constructor () {
    super(...arguments);

    this.isAnimate = makeIsAnimate(this);
    this.isRoot = makeIsRoot(this);
    this.isActivated = makeIsActivated(this);
    this.isOutsourced = makeIsOutsourced(this);
    this.getEnergyInterface = makeGetEnergyInterface(this);
    this.durationManager = makeDurationManager(this);
    this.flowManager = makeFlowManager(this);
    this.scheduler = makeScheduler();

    this.type = ENERGY;
    this.state = this.getInitialState();
    this.flowHasEntered = false;
    this.flowHasExited = false;
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
    this.flowManager.checkUnmount();
    this.scheduler.stopAll();
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
          this.flowHasEntered = true;
        }
        else if (flowValue === EXITED) {
          this.flowHasExited = true;
        }
      }
    );
  }

  getFlow () {
    return this.state.energyInterface.flow;
  }

  getDuration () {
    return this.durationManager.get();
  }

  updateDuration (duration) {
    this.durationManager.update(duration);
  }

  hasEntered () {
    return this.flowHasEntered;
  }

  hasExited () {
    return this.flowHasExited;
  }

  updateActivation (activated) {
    // TODO: User should not be able to call this function, when this component
    // is outsourced by being a <Stream />'s child.
    if (this.isOutsourced()) {
      activated ? this.enter() : this.exit();
    }
    else {
      throw new Error('"updateActivation" can not be called if component is not outsourced.');
    }
  }

  enter () {
    const flowValue = this.state.flowValue;

    if (flowValue === ENTERING || flowValue === ENTERED) {
      return;
    }

    const duration = this.getDuration();

    this.scheduler.start(0, duration.delay, () => {
      const duration = this.getDuration();

      if (this.props.onActivation) {
        this.props.onActivation(true);
      }

      this.setFlowValue(ENTERING);
      this.scheduler.start(0, duration.enter, () => this.setFlowValue(ENTERED));
    });
  }

  exit () {
    const flowValue = this.state.flowValue;

    if (flowValue === EXITING || flowValue === EXITED) {
      return;
    }

    this.scheduler.start(0, 0, () => {
      const duration = this.getDuration();

      if (this.props.onActivation) {
        this.props.onActivation(false);
      }

      this.setFlowValue(EXITING);
      this.scheduler.start(0, duration.exit, () => this.setFlowValue(EXITED));
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
