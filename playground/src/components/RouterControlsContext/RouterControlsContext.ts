import { createContext } from 'react';

interface RouterControls {
  controls: {
    packageName: string
    componentName: string
    sandboxName: string
  }
  changeControl: (name: string, value: string) => void
}

const RouterControlsContext = createContext<RouterControls | null>(null);

RouterControlsContext.displayName = 'RouterControlsContext';

export { RouterControls, RouterControlsContext };
