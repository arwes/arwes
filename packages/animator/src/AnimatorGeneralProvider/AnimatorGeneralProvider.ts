import { createElement, ReactElement, ReactNode, useRef, useMemo } from 'react';

import type { AnimatorGeneralProviderSettings, AnimatorGeneralInterface } from '../types';
import { AnimatorGeneralContext } from '../utils/AnimatorGeneralContext';

interface AnimatorGeneralProviderProps extends AnimatorGeneralProviderSettings {
  children?: ReactNode
}

const AnimatorGeneralProvider = (props: AnimatorGeneralProviderProps): ReactElement => {
  const { children, ...animatorGeneralSettings } = props;

  const animatorGeneralSettingsRef = useRef(animatorGeneralSettings);

  animatorGeneralSettingsRef.current = animatorGeneralSettings;

  const animatorGeneralInterface: AnimatorGeneralInterface = useMemo(() => {
    // TODO: Merge with existing parent general animator settings.
    const getSettings = () => animatorGeneralSettingsRef.current;
    return Object.freeze({ getSettings });
  }, []);

  // TODO: Shouldn't there be a dependencies check for updates?

  return createElement(AnimatorGeneralContext.Provider, { value: animatorGeneralInterface }, children);
};

export type { AnimatorGeneralProviderProps };
export { AnimatorGeneralProvider };
