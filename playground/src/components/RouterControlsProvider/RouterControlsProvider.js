import React, { useRef, useState, useEffect } from 'react';
import Navigo from 'navigo';

import { RouterControlsContext } from '../RouterControlsContext';

const initialControls = {
  packageName: '',
  componentName: '',
  sandboxName: ''
};

function RouterControlsProvider ({ children }) {
  const [controls, setControls] = useState(initialControls);
  const router = useRef();

  const onRouteChange = () => {
    const route = window.location.hash.replace('#', '');
    const [packageName = '', componentName = '', sandboxName = ''] = route.split('/');

    setControls({ packageName, componentName, sandboxName });
  };

  const changeControl = (name, value) => {
    let controlsSideEffectChanges = {};

    if (name === 'packageName') {
      controlsSideEffectChanges = { componentName: '', sandboxName: '' };
    }
    else if (name === 'componentName') {
      controlsSideEffectChanges = { sandboxName: '' };
    }

    const newControls = { ...controls, ...controlsSideEffectChanges, [name]: value };
    const params = [newControls.packageName, newControls.componentName, newControls.sandboxName];
    const route = params.filter(Boolean).join('/');

    router.current.navigate(route);
  };

  useEffect(() => {
    router.current = new Navigo(null, true);
    router.current.on('*', onRouteChange).resolve();
  }, []);

  const value = { controls, changeControl };

  return (
    <RouterControlsContext.Provider value={value}>
      {children}
    </RouterControlsContext.Provider>
  );
}

export { RouterControlsProvider };
