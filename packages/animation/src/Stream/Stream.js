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
import { STREAM, ENTERING, ENTERED, EXITING, EXITED } from '../constants';

const SCHEDULER_ID_TRANSITIONING = 'TRANSITIONING';
const SCHEDULER_ID_TRANSITIONED = 'TRANSITIONED';

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
        stagger: PropTypes.number,
        delay: PropTypes.number,
        offset: PropTypes.number
      })
    ]),
    imperative: PropTypes.bool,
    serial: PropTypes.bool,
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

    this.type = STREAM;
    this.state = this.getInitialState();
    this.subscribers = [];
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

  getDynamicDuration (duration) {
    let enter = 0;

    if (this.props.serial) {
      enter = this.subscribers.reduce((total, subscriber) => {
        const subscriberDuration = subscriber.getDuration();
        return total + subscriberDuration.offset + subscriberDuration.delay + subscriberDuration.enter;
      }, 0);
    }
    // Staggering
    else {
      let accumulation = 0;

      this.subscribers.forEach((subscriber, index) => {
        const subscriberDuration = subscriber.getDuration();
        accumulation += subscriberDuration.offset;
        const staggerDuration = (duration.stagger * index);

        enter = Math.max(
          enter,
          staggerDuration + accumulation + subscriberDuration.delay + subscriberDuration.enter
        );
      });
    }

    const exit = this.subscribers.reduce((total, subscriber) => (
      Math.max(total, subscriber.getDuration().exit)
    ), 0);

    return { enter, exit };
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

  _subscribe (component) {
    this.subscribers.push(component);
  }

  _unsubscribe (component) {
    this.subscribers = this.subscribers.filter(item => item !== component);
  }

  updateActivation (activated) {
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

    this.scheduler.start(
      SCHEDULER_ID_TRANSITIONING,
      duration.delay,
      () => {
        this.setFlowValue(ENTERING);

        if (this.props.onActivation) {
          this.props.onActivation(true);
        }
      }
    );

    this.scheduler.start(
      SCHEDULER_ID_TRANSITIONED,
      duration.delay + duration.enter,
      () => this.setFlowValue(ENTERED)
    );

    if (this.props.serial) {
      this.enterChildrenInSerial();
    }
    else {
      this.enterChildrenInStaggering();
    }
  }

  enterChildrenInSerial () {
    const duration = this.getDuration();

    let acummulation = 0;

    this.subscribers.forEach((subscriber, index) => {
      const itemDuration = subscriber.getDuration();
      acummulation += itemDuration.offset;
      const itemTime = duration.delay + acummulation;

      this.scheduler.start(index, itemTime, () => subscriber.updateActivation(true));

      acummulation += subscriber.getDuration().enter;
    });
  }

  enterChildrenInStaggering () {
    const duration = this.getDuration();

    let accumulation = 0;

    this.subscribers.forEach((subscriber, index) => {
      const itemDuration = subscriber.getDuration();
      accumulation += itemDuration.offset;
      const itemTime = accumulation + duration.delay + (duration.stagger * index);

      this.scheduler.start(index, itemTime, () => subscriber.updateActivation(true));
    });
  }

  exit () {
    const flowValue = this.state.flowValue;

    if (flowValue === EXITING || flowValue === EXITED) {
      return;
    }

    const duration = this.getDuration();

    this.scheduler.start(
      SCHEDULER_ID_TRANSITIONING,
      0,
      () => {
        this.setFlowValue(EXITING);

        if (this.props.onActivation) {
          this.props.onActivation(false);
        }
      }
    );

    this.subscribers.forEach((subscriber, index) => {
      this.scheduler.start(index, 0, () => subscriber.updateActivation(false));
    });

    this.scheduler.start(
      SCHEDULER_ID_TRANSITIONED,
      duration.exit,
      () => this.setFlowValue(EXITED)
    );
  }
}

const Stream = React.forwardRef((props, ref) => {
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

Stream.displayName = 'Stream';

export { Component, Stream };
