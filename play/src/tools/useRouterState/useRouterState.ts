import { useLocation, useHistory } from 'react-router-dom';

import { playConfigs } from '@repository/play/playConfigs';
import {
  RouterState,
  ROUTER_STATE_URL_OPTION_CONTROLS,
  ROUTER_STATE_URL_OPTION_EDITOR,
  ROUTER_STATE_URL_OPTION_PREVIEW
} from '../../constants';
import { convertLocationSearchToString } from '../convertLocationSearchToString';
import { convertLocationSearchToObject } from '../convertLocationSearchToObject';
import { getDesktopMediaQueryList } from '../getDesktopMediaQueryList';

const useRouterState = (): [RouterState] => {
  const location = useLocation();
  const history = useHistory();

  const route = location.pathname.split('/').slice(1);
  const options: Record<string, string> = convertLocationSearchToObject(location.search);

  const [, packageName, componentName, sandboxName] = route;

  const packageConfig = playConfigs.find(packageConfig => packageConfig.name === packageName);
  const componentConfig = packageConfig?.components.find(componentConfig => componentConfig.name === componentName);
  const sandboxConfig = componentConfig?.sandboxes.find(sandboxConfig => sandboxConfig.name === sandboxName);

  const isEditorEnabled = !!sandboxConfig;
  const isPreviewEnabled = !!sandboxConfig;
  const isControlsEnabled = true;

  const isDesktop = getDesktopMediaQueryList().matches;

  const isControlsActive = (!options[ROUTER_STATE_URL_OPTION_CONTROLS] && isDesktop) || options[ROUTER_STATE_URL_OPTION_CONTROLS] === 'true';
  const isEditorActive = (!options[ROUTER_STATE_URL_OPTION_EDITOR] && isDesktop) || options[ROUTER_STATE_URL_OPTION_EDITOR] === 'true';
  const isPreviewActive = !options[ROUTER_STATE_URL_OPTION_PREVIEW] || options[ROUTER_STATE_URL_OPTION_PREVIEW] === 'true';

  const routerStateData = {
    route,
    isEditorEnabled,
    isPreviewEnabled,
    isControlsEnabled,
    isControlsActive,
    isEditorActive,
    isPreviewActive
  };

  const changeRouterState = (partialRouterState: Partial<RouterState>): void => {
    const {
      isControlsActive,
      isEditorActive,
      isPreviewActive
    } = { ...routerStateData, ...partialRouterState };

    const newLocationSearch = convertLocationSearchToString({
      [ROUTER_STATE_URL_OPTION_CONTROLS]: isControlsActive,
      [ROUTER_STATE_URL_OPTION_EDITOR]: isEditorActive,
      [ROUTER_STATE_URL_OPTION_PREVIEW]: isPreviewActive
    });

    history.push(`${location.pathname}?${newLocationSearch}`);
  };

  const toggleControls = (): void => {
    changeRouterState({ isControlsActive: !routerStateData.isControlsActive });
  };
  const toggleEditor = (): void => {
    changeRouterState({ isEditorActive: !routerStateData.isEditorActive });
  };
  const togglePreview = (): void => {
    changeRouterState({ isPreviewActive: !routerStateData.isPreviewActive });
  };

  const routerState: RouterState = {
    ...routerStateData,
    toggleControls,
    toggleEditor,
    togglePreview,
    sandboxConfig
  };

  return [routerState];
};

export { useRouterState };
