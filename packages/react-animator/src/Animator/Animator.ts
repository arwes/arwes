import { ReactElement, createElement, useMemo, useContext, useRef, useEffect, ForwardedRef } from 'react';

import {
  AnimatorNode,
  AnimatorSettings,
  AnimatorSettingsPartial,
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
import type { AnimatorProps } from './Animator.types';

const setNodeRefValue = (nodeRef: ForwardedRef<AnimatorNode> | undefined, node: AnimatorNode | null): void => {
  if (typeof nodeRef === 'function') {
    nodeRef(node);
  }
  else if (nodeRef) {
    nodeRef.current = node;
  }
};

const Animator = (props: AnimatorProps): ReactElement => {
  const { root, disabled, dismissed, children, nodeRef, ...settings } = props;

  const parentAnimatorInterface = useContext(AnimatorContext);
  const animatorGeneralInterface = useContext(AnimatorGeneralContext);

  const settingsRef = useRef<AnimatorSettingsPartial>(settings);
  const dynamicSettingsRef = useRef<AnimatorSettingsPartial | null>(null);
  const foreignRef = useRef<unknown>(null);
  const prevAnimatorRef = useRef<AnimatorInterface | undefined>(undefined);
  const isFirstRenderRef = useRef<boolean | null>(true);

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
      setNodeRefValue(nodeRef, null);
      return parentAnimatorInterface;
    }

    if (isDismissed) {
      setNodeRefValue(nodeRef, null);
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

    const setDynamicSettings = (newSettings: AnimatorSettingsPartial | null): void => {
      dynamicSettingsRef.current = newSettings;
    };

    const getDynamicSettings = (): AnimatorSettingsPartial | null => {
      return dynamicSettingsRef.current;
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
      getDynamicSettings,
      getForeignRef,
      setForeignRef
    });

    const node = isRoot
      ? system.register(undefined, control)
      : system.register(parentAnimatorInterface.node, control);

    setNodeRefValue(nodeRef, node);

    return Object.freeze({ system, node });
  }, [parentAnimatorInterface, isRoot, isDisabled, isDismissed]);

  prevAnimatorRef.current = animatorInterface;

  useEffect(() => {
    animatorInterface?.node.send(ANIMATOR_ACTIONS.setup);

    return () => {
      if (prevAnimatorRef.current) {
        prevAnimatorRef.current.system.unregister(prevAnimatorRef.current.node);
      }
    };
  }, []);

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    animatorInterface?.node.send(ANIMATOR_ACTIONS.update);
  }, [settings.active, settings.manager, settings.merge, settings.combine]);

  return createElement(AnimatorContext.Provider, { value: animatorInterface }, children);
};

export { Animator };
