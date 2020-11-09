import { useContext } from 'react';

import { RouterControlsContext } from 'playground/src/components/RouterControlsContext';

function useRouterControls () {
  return useContext(RouterControlsContext);
}

export { useRouterControls };
