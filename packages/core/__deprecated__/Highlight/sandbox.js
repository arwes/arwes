import React from 'react';
import Arwes from '../Arwes';
import Highlight from './index';

const style = { display: 'inline-block' };
const Example = () => <div style={{ padding: '20px' }}>Cyberpunk</div>;

export default () => (
  <Arwes>
    <Highlight animate={false} style={style}>
      <Example />
    </Highlight>{' '}
    <Highlight style={style}>
      <Example />
    </Highlight>{' '}
    <Highlight layer='success' style={style}>
      <Example />
    </Highlight>{' '}
    <Highlight layer='alert' style={style}>
      <Example />
    </Highlight>
  </Arwes>
);
