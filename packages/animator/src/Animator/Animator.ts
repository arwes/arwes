import {
  ReactElement,
  ReactNode,
  createElement,
  useMemo,
  useContext,
  useRef,
  useEffect
} from 'react';

import type {
  AnimatorSystemNode,
  AnimatorSettings,
  AnimatorSystem,
  AnimatorControl,
  AnimatorInterface
} from '../types';
import { AnimatorContext } from '../utils/AnimatorContext';
import { AnimatorGeneralContext } from '../utils/AnimatorGeneralContext';
import { createAnimatorSystem } from '../utils/createAnimatorSystem';
import { animatorDefaults } from './defaults';

interface AnimatorProps extends AnimatorSettings {
  root?: boolean
  disabled?: boolean
  dismissed?: boolean
  children?: ReactNode
}

const Animator = (props: AnimatorProps): ReactElement => {
  const { root, disabled, dismissed, children, ...settings } = props;

  const parentAnimatorInterface = useContext(AnimatorContext);
  const animatorGeneralInterface = useContext(AnimatorGeneralContext);

  const settingsRef = useRef<AnimatorSettings>(settings);
  const dynamicSettingsRef = useRef<AnimatorSettings | null>(null);
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
        ...animatorDefaults,
        ...animatorGeneralSettings,
        ...settingsRef.current,
        ...dynamicSettingsRef.current,
        duration: {
          ...animatorDefaults.duration,
          ...animatorGeneralSettings?.duration,
          ...settingsRef.current?.duration,
          ...dynamicSettingsRef.current?.duration
        },
        onTransition: (node: AnimatorSystemNode): void => {
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
      ? system.setup(control)
      : system.register(parentAnimatorInterface.node, control);

    return Object.freeze({ system, node });
  }, [parentAnimatorInterface, isRoot, isDisabled, isDismissed]);

  prevAnimatorRef.current = animatorInterface;

  if (prevAnimatorRef.current) {
    prevAnimatorRef.current.node.onSettingsChange();
  }

  useEffect(() => {
    return () => {
      if (prevAnimatorRef.current) {
        prevAnimatorRef.current.system.unregister(prevAnimatorRef.current.node);
      }
    };
  }, []);

  return createElement(AnimatorContext.Provider, { value: animatorInterface }, children);
};

export type { AnimatorProps };
export { Animator };
