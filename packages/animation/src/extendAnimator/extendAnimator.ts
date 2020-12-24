/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { ComponentType, createElement, forwardRef, Component, FC } from 'react';

import { AnimatorInstanceSettings } from '../constants';
import { mergeClassAndInstanceAnimatorSettings } from '../utils/mergeClassAndInstanceAnimatorSettings';

interface ExtendAnimatorProps {
  animator?: AnimatorInstanceSettings
}

function extendAnimator<T extends (Component<P> | FC<P>), P extends ExtendAnimatorProps = ExtendAnimatorProps> (extendedClassAnimator: AnimatorInstanceSettings) {
  const extendAnimatorWrapper = (InputComponent: ComponentType<P>) => {
    const OutputComponent = forwardRef<T, P>((props, ref) => {
      const { animator: instanceAnimator, ...otherProps } = props;
      const resultAnimator = mergeClassAndInstanceAnimatorSettings(
        extendedClassAnimator,
        instanceAnimator
      );

      return createElement<P>(InputComponent, {
        ...(otherProps as P),
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
