/* eslint-disable @typescript-eslint/explicit-function-return-type */

import {
  ComponentType,
  ComponentProps,
  FC,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  Ref,
  RefAttributes,
  createElement,
  forwardRef,
  useMemo
} from 'react';
import { AnimatorClassSettings, AnimatorInstanceSettings } from '../constants';

import { Animator } from '../Animator';
import { mergeClassAndInstanceAnimatorSettings } from '../utils/mergeClassAndInstanceAnimatorSettings';

interface WithAnimatorOutputProps {
  animator?: AnimatorInstanceSettings
}

function withAnimator (classAnimator?: AnimatorClassSettings) {
  const withAnimatorWrapper = <T extends ComponentType<P>, P = ComponentProps<T>>(InputComponent: T) => {
    interface AnimatorMiddlewareProps {
      InputComponent: T
      forwardedRef: Ref<T>
    }

    const AnimatorMiddleware: FC<AnimatorMiddlewareProps> = props => {
      const { InputComponent, forwardedRef, ...otherProps } = props;

      return createElement(InputComponent, {
        ...(otherProps as P),
        ref: forwardedRef
      });
    };

    type C = P & WithAnimatorOutputProps;

    const OutputComponent = forwardRef<T, C>((props, forwardedRef) => {
      const { animator: instanceAnimator, ...otherProps } = props;

      const resultAnimator = useMemo(
        () => mergeClassAndInstanceAnimatorSettings(classAnimator, instanceAnimator),
        [instanceAnimator]
      );

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

export { WithAnimatorOutputProps, withAnimator };
