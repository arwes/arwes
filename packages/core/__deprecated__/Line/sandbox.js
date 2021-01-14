import React from 'react';
import Line from './index';

export default () => (
  <div style={{ padding: '20px' }}>
    <Line animate />
    <Line animate layer='success' />
    <Line animate layer='alert' />
  </div>
);
