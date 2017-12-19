import React from 'react';
import Docs from './components/Docs';

export default (App) => {
  return () => {
    return (
      <Docs App={App} />
    );
  };
};
