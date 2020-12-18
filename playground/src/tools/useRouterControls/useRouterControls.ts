import { useContext } from 'react';

import {
  RouterControls,
  RouterControlsContext
} from 'playground/src/components/RouterControlsContext';

function useRouterControls (): RouterControls | null {
  return useContext(RouterControlsContext);
}

export { RouterControls, useRouterControls };
