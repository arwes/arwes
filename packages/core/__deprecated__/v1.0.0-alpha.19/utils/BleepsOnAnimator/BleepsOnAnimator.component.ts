import { useEffect } from 'react';
import { ENTERED, ENTERING, EXITED, EXITING, useAnimator } from '@arwes/animator';
import { BleepName, useBleeps } from '@arwes/bleeps';

interface BleepsOnAnimatorTransition {
  name: BleepName
  loop?: true
}

interface BleepsOnAnimatorProps {
  entering?: BleepsOnAnimatorTransition
  exiting?: BleepsOnAnimatorTransition
  disabled?: boolean
}

const BleepsOnAnimator = (props: BleepsOnAnimatorProps): null => {
  const { entering, exiting, disabled } = props;

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
      const transitions = [entering, exiting].filter(Boolean) as BleepsOnAnimatorTransition[];

      transitions.forEach(({ name }) => {
        bleeps[name]?.stop();
      });
    };
  }, []);

  useEffect(() => {
    if (!animator.animate) {
      return;
    }

    switch (animator.flow.value) {
      case ENTERING: {
        if (!disabled && entering) {
          bleeps[entering.name]?.play();
        }
        break;
      }

      case ENTERED: {
        if (entering?.loop) {
          bleeps[entering.name]?.stop();
        }
        break;
      }

      case EXITING: {
        if (!disabled && exiting) {
          bleeps[exiting.name]?.play();
        }
        break;
      }

      case EXITED: {
        if (exiting?.loop) {
          bleeps[exiting.name]?.stop();
        }
        break;
      }
    }
  }, [animator.flow, disabled]);

  return null;
};

export { BleepsOnAnimatorTransition, BleepsOnAnimatorProps, BleepsOnAnimator };
