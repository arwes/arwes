import React from 'react';
import Loading from './index';

export default () => (
  <div>
    <Loading animate />
    <Loading animate small />
    <div style={{ position: 'relative', width: 200, height: 200 }}>
      <Loading animate full />
    </div>
  </div>
);
