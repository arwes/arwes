import { useEffect } from 'react';
import { ENTERED, ENTERING, EXITED, EXITING, useAnimator } from '@arwes/animation';
import { BleepName, useBleeps } from '@arwes/sounds';

interface BleepsOnTransitions {
  entering?: BleepName
  exiting?: BleepName
}

// TODO: Add unit tests.

const useBleepsOnAnimator = (bleepsOnTransitions: BleepsOnTransitions): void => {
  const animator = useAnimator();
  const bleeps = useBleeps();

  if (!animator) {
    throw new Error('Animator parent component is required.');
  }

  useEffect(() => {
    if (!animator.animate) {
      return;
    }

    return () => {
      const enteringBleep = bleepsOnTransitions.entering as BleepName;
      const exitingBleep = bleepsOnTransitions.exiting as BleepName;

      bleeps[enteringBleep]?.stop();
      bleeps[exitingBleep]?.stop();
    };
  }, []);

  useEffect(() => {
    if (!animator.animate) {
      return;
    }

    const enteringBleep = bleepsOnTransitions.entering as BleepName;
    const exitingBleep = bleepsOnTransitions.exiting as BleepName;

    switch (animator.flow.value) {
      case ENTERING: {
        bleeps[enteringBleep]?.play();
        break;
      }
      case ENTERED: {
        bleeps[enteringBleep]?.stop();
        break;
      }
      case EXITING: {
        bleeps[exitingBleep]?.play();
        break;
      }
      case EXITED: {
        bleeps[exitingBleep]?.stop();
        break;
      }
    }
  }, [animator.flow]);
};

export { useBleepsOnAnimator };
