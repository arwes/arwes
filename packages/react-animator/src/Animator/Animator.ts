import {
  type ReactElement,
  type ForwardedRef,
  createElement,
  useMemo,
  useContext,
  useRef,
  useEffect,
  useState
} from 'react';

import {
  type AnimatorNode,
  type AnimatorSubscriber,
  type AnimatorSettings,
  type AnimatorSettingsPartial,
  type AnimatorSystem,
  type AnimatorControl,
  type AnimatorInterface,
  type AnimatorDuration,
  ANIMATOR_DEFAULT_SETTINGS,
  ANIMATOR_STATES as STATES,
  ANIMATOR_ACTIONS as ACTIONS,
  createAnimatorSystem
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
  const {
    root,
    disabled,
    dismissed,
    unmountOnExited,
    unmountOnEntered,
    checkToSendAction,
    checkToSend,
    nodeRef,
    children,
    ...settings
  } = props;

  const parentAnimatorInterface = useContext(AnimatorContext);
  const animatorGeneralInterface = useContext(AnimatorGeneralContext);

  const settingsRef = useRef<AnimatorSettingsPartial>(settings);
  const dynamicSettingsRef = useRef<AnimatorSettingsPartial | null>(null);
  const foreignRef = useRef<unknown>(null);
  const prevAnimatorRef = useRef<AnimatorInterface | undefined>(undefined);
  const isFirstRender1Ref = useRef<boolean | null>(true);
  const isFirstRender2Ref = useRef<boolean | null>(true);

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

  const [isEnabledToUnmount, setIsEnabledToUnmount] = useState<boolean | undefined>(() =>
    (unmountOnExited && animatorInterface?.node.state === STATES.exited) ||
    (unmountOnEntered && animatorInterface?.node.state === STATES.entered)
  );

  useEffect(() => {
    animatorInterface?.node.send(ACTIONS.setup);

    return () => {
      if (prevAnimatorRef.current) {
        prevAnimatorRef.current.system.unregister(prevAnimatorRef.current.node);
      }
    };
  }, []);

  useEffect(() => {
    if (isFirstRender1Ref.current) {
      isFirstRender1Ref.current = false;
      return;
    }

    animatorInterface?.node.send(ACTIONS.update);
  }, [settings.active, settings.manager, settings.merge, settings.combine]);

  useEffect(() => {
    if ((unmountOnExited || unmountOnEntered) && animatorInterface) {
      const subscriber: AnimatorSubscriber = node => {
        setIsEnabledToUnmount(
          (unmountOnExited && node.state === STATES.exited) ||
          (unmountOnEntered && node.state === STATES.entered)
        );
      };

      animatorInterface.node.subscribe(subscriber);

      return () => {
        animatorInterface?.node.unsubscribe(subscriber);
      };
    }
  }, [unmountOnExited, unmountOnEntered, animatorInterface]);

  useEffect(() => {
    if (isFirstRender2Ref.current) {
      isFirstRender2Ref.current = false;
      return;
    }

    if (animatorInterface) {
      animatorInterface.node.send(checkToSendAction ?? ACTIONS.refresh);
    }
  }, checkToSend ?? []);

  return createElement(
    AnimatorContext.Provider,
    { value: animatorInterface },
    isEnabledToUnmount ? null : children
  );
};

export { Animator };
