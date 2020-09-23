import { useState, useRef, useEffect } from 'react';
import Navigo from 'navigo';

const initialControls = {
  packageName: '',
  componentName: '',
  sandboxName: ''
};

function useRouterControls () {
  const [controls, setControls] = useState(initialControls);
  const router = useRef();

  const onRouteChange = () => {
    const route = window.location.hash.replace('#', '');
    const [packageName = '', componentName = '', sandboxName = ''] = route.split('/');

    setControls({ packageName, componentName, sandboxName });
  };

  const onControlChange = (name, value) => {
    let controlsSideEffectChanges = {};

    if (name === 'packageName') {
      controlsSideEffectChanges = { componentName: '', sandboxName: '' };
    }
    else if (name === 'componentName') {
      controlsSideEffectChanges = { sandboxName: '' };
    }

    const newControls = { ...controls, [name]: value, ...controlsSideEffectChanges };
    const params = [newControls.packageName, newControls.componentName, newControls.sandboxName];
    const route = params.filter(Boolean).join('/');

    router.current.navigate(route);
  };

  useEffect(() => {
    router.current = new Navigo(null, true);
    router.current.on('*', onRouteChange).resolve();
  }, []);

  return { controls, onControlChange };
}

export { useRouterControls };
