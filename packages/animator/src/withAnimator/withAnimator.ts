/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { AnimatorClassSettings, AnimatorInstanceSettings, AnimatorRef } from '../constants';
import { ComponentType, FC, ForwardRefExoticComponent, PropsWithoutRef, Ref, RefAttributes, createElement, forwardRef } from 'react';

import { Animator } from '../Animator';
import { mergeClassAndInstanceAnimatorSettings } from '../utils/mergeClassAndInstanceAnimatorSettings';
import { useAnimator } from '../useAnimator';

interface WithAnimatorInputProps {
  animator: AnimatorRef
}

interface WithAnimatorOutputProps {
  animator?: AnimatorInstanceSettings
}

function withAnimator (classAnimator?: AnimatorClassSettings) {
  const withAnimatorWrapper = <T extends ComponentType<P>, P extends WithAnimatorInputProps = React.ComponentProps<T>>(InputComponent: T) => {
    interface AnimatorMiddlewareProps {
      InputComponent: T
      forwardedRef: Ref<T>
    }

    const AnimatorMiddleware: FC<AnimatorMiddlewareProps> = props => {
      const { InputComponent, forwardedRef, ...otherProps } = props;
      const componentAnimator = useAnimator();

      return createElement(InputComponent, {
        ...(otherProps as P),
        animator: componentAnimator,
        ref: forwardedRef
      });
    };

    // The input component will receive the `animator: AnimatorRef` prop.
    // But it will be excluded from the output component proptypes.
    // The output component will optionally allow the `animator: AnimatorInstanceSettings` prop.
    type C = Pick<P, Exclude<keyof P, keyof WithAnimatorInputProps>> & WithAnimatorOutputProps;

    const OutputComponent = forwardRef<T, C>((props, forwardedRef) => {
      const { animator: instanceAnimator, ...otherProps } = props;
      const resultAnimator = mergeClassAndInstanceAnimatorSettings(classAnimator, instanceAnimator);

      return createElement(
        Animator,
        { animator: resultAnimator },
        createElement(AnimatorMiddleware, {
          ...otherProps,
          InputComponent,
          forwardedRef
        })
      );
    }) as ForwardRefExoticComponent<PropsWithoutRef<C> & RefAttributes<T>> & { defaultProps: Partial<C> & WithAnimatorOutputProps };

    const componentName = InputComponent.displayName || InputComponent.name || 'Component';
    OutputComponent.displayName = `withAnimator(${componentName})`;

    return OutputComponent;
  };

  return withAnimatorWrapper;
}

export { WithAnimatorInputProps, WithAnimatorOutputProps, withAnimator };
