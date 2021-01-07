import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { RouterControlsContext } from '../RouterControlsContext';

const initialControls = {
  packageName: '',
  componentName: '',
  sandboxName: ''
};

function RouterControlsProvider ({ children }) {
  const location = useLocation();
  const history = useHistory();
  const [controls, setControls] = useState(initialControls);

  const onRouteChange = () => {
    const route = location.pathname.split('/').filter(Boolean);
    const [packageName = '', componentName = '', sandboxName = ''] = route;

    setControls({ packageName, componentName, sandboxName });
  };

  const changeRoute = route => {
    history.push(route);
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
    const route = '/' + params.filter(Boolean).join('/');

    changeRoute(route);
  };

  useEffect(() => {
    onRouteChange();
  }, [location.pathname]);

  const value = { controls, changeControl };

  return (
    <RouterControlsContext.Provider value={value}>
      {children}
    </RouterControlsContext.Provider>
  );
}

export { RouterControlsProvider };
