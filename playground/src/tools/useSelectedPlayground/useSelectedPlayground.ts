import { playgroundConfigs } from '../../playgroundConfigs';
import { useRouterControls } from '../useRouterControls';

interface SelectedSandbox {
  name: string
  code: any
}

interface SelectedComponent {
  name: string
  sandboxes: SelectedSandbox[]
}

interface SelectedPlayground {
  packagesNames: string[]
  packageConfig?: {
    name: string
    components: SelectedComponent[]
  }
  componentsNames: string[]
  componentConfig?: SelectedComponent
  sandboxesNames: string[]
  sandboxConfig?: SelectedSandbox
}

function useSelectedPlayground (): SelectedPlayground {
  const routerControls = useRouterControls();

  const packageName: string | undefined = routerControls?.controls.packageName;
  const componentName: string | undefined = routerControls?.controls.componentName;
  const sandboxName: string | undefined = routerControls?.controls.sandboxName;

  const packagesNames = playgroundConfigs.map(playground => playground.name);
  const packageConfig = playgroundConfigs.find(playground => playground.name === packageName);

  let componentsNames: string[] = [];
  let componentConfig: SelectedComponent | undefined;
  if (packageConfig) {
    const { components } = packageConfig;
    componentsNames = components.map(component => component.name);
    componentConfig = components.find(component => component.name === componentName);
  }

  let sandboxesNames: string[] = [];
  let sandboxConfig: SelectedSandbox | undefined;
  if (componentConfig) {
    const { sandboxes } = componentConfig;
    sandboxesNames = sandboxes.map(sandbox => sandbox.name);
    sandboxConfig = sandboxes.find(sandbox => sandbox.name === sandboxName);
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

export {
  SelectedSandbox,
  SelectedComponent,
  SelectedPlayground,
  useSelectedPlayground
};
