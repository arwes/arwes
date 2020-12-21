/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { ComponentType, Ref, createElement, forwardRef } from 'react';

import { AnimatorClassSettings, AnimatorInstanceSettings } from '../constants';
import { mergeClassAndInstanceAnimatorSettings } from '../utils/mergeClassAndInstanceAnimatorSettings';

interface ExtendAnimatorProps {
  animator?: AnimatorInstanceSettings
}

function extendAnimator (extendedClassAnimator: AnimatorClassSettings) {
  const extendAnimatorWrapper = <T extends ExtendAnimatorProps>(InputComponent: ComponentType<T>) => {
    const OutputComponent = forwardRef<Ref<any>, T>((props, ref) => {
      const { animator: instanceAnimator, ...otherProps } = props;
      const resultAnimator = mergeClassAndInstanceAnimatorSettings(
        extendedClassAnimator,
        instanceAnimator
      );

      return createElement(InputComponent, {
        ...(otherProps as T),
        animator: resultAnimator,
        ref
      });
    });

    const componentName = InputComponent.displayName || InputComponent.name || 'Component';

    OutputComponent.displayName = `extendAnimator(${componentName})`;

    return OutputComponent;
  };

  return extendAnimatorWrapper;
}

export { extendAnimator };
