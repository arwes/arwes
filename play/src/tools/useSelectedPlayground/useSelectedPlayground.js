import { playgroundConfigs } from '../../playgroundConfigs';
import { useRouterControls } from '../useRouterControls';

function useSelectedPlayground () {
  const { controls } = useRouterControls();

  const packagesNames = playgroundConfigs.map(playground => playground.name);
  const packageConfig = playgroundConfigs.find(playground => playground.name === controls.packageName);

  let componentsNames = [];
  let componentConfig;
  if (packageConfig) {
    const { components } = packageConfig;
    componentsNames = components.map(component => component.name);
    componentConfig = components.find(component => component.name === controls.componentName);
  }

  let sandboxesNames = [];
  let sandboxConfig;
  if (componentConfig) {
    const { sandboxes } = componentConfig;
    sandboxesNames = sandboxes.map(sandbox => sandbox.name);
    sandboxConfig = sandboxes.find(sandbox => sandbox.name === controls.sandboxName);
  }

  return {
    packagesNames,
    packageConfig,
    componentsNames,
    componentConfig,
    sandboxesNames,
    sandboxConfig
  };
}

export { useSelectedPlayground };
