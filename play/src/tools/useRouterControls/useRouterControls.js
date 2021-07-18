import { useContext } from 'react';

import { RouterControlsContext } from '@play/src/components/RouterControlsContext';

function useRouterControls () {
  return useContext(RouterControlsContext);
}

export { useRouterControls };
