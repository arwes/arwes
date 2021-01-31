/* eslint-disable @typescript-eslint/explicit-function-return-type */

// TODO: Review and analyze if the extension functionality is necessary or
// if it can be removed, since it creates excesive typing overload and
// decreases performance.
// TODO: Test cases are not correctly checking typing.

import { forwardRef, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes, createElement } from 'react';

import { AnimatorClassSettings, AnimatorInstanceSettings } from '../constants';
import { mergeClassAndInstanceAnimatorSettings } from '../utils/mergeClassAndInstanceAnimatorSettings';

interface ExtendAnimatorInputProps {
  animator: AnimatorInstanceSettings
}

function extendAnimator<C extends React.ComponentType<P>, P extends ExtendAnimatorInputProps = ExtendAnimatorInputProps> (extendedClassAnimator: AnimatorClassSettings) {
  const extendAnimatorWrapper = (InputComponent: C) => {
    const OutputComponent = forwardRef<C, P>((props, ref) => {
      const { animator: instanceAnimator, ...otherProps } = props;
      const resultAnimator = mergeClassAndInstanceAnimatorSettings(
        extendedClassAnimator,
        instanceAnimator
      );

      return createElement(InputComponent, {
        ...(otherProps as P),
        animator: resultAnimator,
        ref
      });
    }) as ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<C>> & { defaultProps: Partial<P> & ExtendAnimatorInputProps };

    const componentName = InputComponent.displayName || InputComponent.name || 'Component';

    OutputComponent.displayName = `extendAnimator(${componentName})`;

    return OutputComponent;
  };

  return extendAnimatorWrapper;
}

export { ExtendAnimatorInputProps, extendAnimator };
