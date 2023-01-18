import { ReactElement, createElement, useMemo, useContext, useRef } from 'react';

import { TOOLS_IS_BROWSER } from '@arwes/tools';
import { useOnMount, useOnChange } from '@arwes/react-tools';
import {
  AnimatorNode,
  AnimatorSettings,
  AnimatorSystem,
  AnimatorControl,
  AnimatorInterface,
  ANIMATOR_DEFAULT_SETTINGS,
  ANIMATOR_ACTIONS,
  createAnimatorSystem,
  AnimatorDuration
} from '@arwes/animator';
import { AnimatorContext } from '../internal/AnimatorContext/index';
import { AnimatorGeneralContext } from '../internal/AnimatorGeneralContext/index';
import type { AnimatorProps, AnimatorPropsSettings } from './Animator.types';

const Animator = (props: AnimatorProps): ReactElement => {
  const { root, disabled, dismissed, children, ...settings } = props;

  const parentAnimatorInterface = useContext(AnimatorContext);
  const animatorGeneralInterface = useContext(AnimatorGeneralContext);

  const settingsRef = useRef<AnimatorPropsSettings>(settings);
  const dynamicSettingsRef = useRef<AnimatorPropsSettings | null>(null);
  const foreignRef = useRef<unknown>(null);
  const prevAnimatorRef = useRef<AnimatorInterface | undefined>(undefined);

  settingsRef.current = settings;

  const animatorGeneralSettings = animatorGeneralInterface?.getSettings();
  const isRoot = !!root || !parentAnimatorInterface;
  const isDisabled = !!disabled || animatorGeneralSettings?.disabled;
  const isDismissed = !!dismissed || animatorGeneralSettings?.dismissed;

  const animatorInterface: AnimatorInterface | undefined = useMemo(() => {
    if (prevAnimatorRef.current) {
      prevAnimatorRef.current.system.unregister(prevAnimatorRef.current.node);
    }

    if (isDisabled) {
      return parentAnimatorInterface;
    }

    if (isDismissed) {
      return undefined;
    }

    const system: AnimatorSystem = isRoot
      ? createAnimatorSystem()
      : parentAnimatorInterface.system;

    const getSettings = (): AnimatorSettings => {
      const animatorGeneralSettings = animatorGeneralInterface?.getSettings();

      return {
        ...ANIMATOR_DEFAULT_SETTINGS,
        ...animatorGeneralSettings,
        ...settingsRef.current,
        ...dynamicSettingsRef.current,
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        duration: {
          ...ANIMATOR_DEFAULT_SETTINGS.duration,
          ...animatorGeneralSettings?.duration,
          ...settingsRef.current?.duration,
          ...dynamicSettingsRef.current?.duration
        } as AnimatorDuration,
        onTransition: (node: AnimatorNode): void => {
          settingsRef.current?.onTransition?.(node);
          dynamicSettingsRef.current?.onTransition?.(node);
        }
      };
    };

    const setDynamicSettings = (newSettings: AnimatorSettings | null): void => {
      dynamicSettingsRef.current = newSettings;
    };

    const getForeignRef = (): unknown => {
      return foreignRef.current;
    };

    const setForeignRef = (ref: unknown): void => {
      foreignRef.current = ref;
    };

    const control: AnimatorControl = Object.freeze({
      getSettings,
      setDynamicSettings,
      getForeignRef,
      setForeignRef
    });

    const node = isRoot
      ? system.register(undefined, control)
      : system.register(parentAnimatorInterface.node, control);

    return Object.freeze({ system, node });
  }, [parentAnimatorInterface, isRoot, isDisabled, isDismissed]);

  prevAnimatorRef.current = animatorInterface;

  useOnChange(() => {
    if (TOOLS_IS_BROWSER && animatorInterface) {
      animatorInterface.node.send(ANIMATOR_ACTIONS.update);
    }
  }, [settings.active]);

  useOnMount(() => {
    return () => {
      if (prevAnimatorRef.current) {
        prevAnimatorRef.current.system.unregister(prevAnimatorRef.current.node);
      }
    };
  });

  return createElement(AnimatorContext.Provider, { value: animatorInterface }, children);
};

export { Animator };
