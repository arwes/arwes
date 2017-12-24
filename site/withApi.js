import React from 'react';
import withContent from './withContent';
import Api from './components/Api';

export default (props) => {
  return withContent({
    html: <Api {...props} />
  });
};
