import React from 'react';
import Content from './components/Content';

export default (props) => {
  return () => {
    return <Content {...props} />;
  };
};
