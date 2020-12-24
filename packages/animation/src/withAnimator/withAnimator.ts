/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { ComponentType, FC, createElement, forwardRef, Component, Ref } from 'react';

import { AnimatorClassSettings, AnimatorInstanceSettings, AnimatorProvidedSettings } from '../constants';
import { mergeClassAndInstanceAnimatorSettings } from '../utils/mergeClassAndInstanceAnimatorSettings';
import { Animator } from '../Animator';
import { useAnimator } from '../useAnimator';

interface WithAnimatorInputProps {
  animator: AnimatorProvidedSettings
}

interface WithAnimatorOutputProps {
  animator?: AnimatorInstanceSettings
}

function withAnimator<T extends Component<P> | FC<P>, P extends WithAnimatorInputProps = WithAnimatorInputProps> (classAnimator?: AnimatorClassSettings) {
  const withAnimatorWrapper = (InputComponent: ComponentType<P>) => {
    interface AnimatorMiddlewareProps {
      InputComponent: ComponentType<P>
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

    // The input component will receive the `animator: AnimatorProvidedSettings` prop.
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
    });

    const componentName = InputComponent.displayName || InputComponent.name || 'Component';

    OutputComponent.displayName = `withAnimator(${componentName})`;

    return OutputComponent;
  };

  return withAnimatorWrapper;
}

export { withAnimator };
