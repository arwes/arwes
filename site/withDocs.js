import React from 'react';
import Docs from './components/Docs';

export default (props, App) => {
  return () => {
    return (
      <Docs App={App} {...props} />
    );
  };
};
