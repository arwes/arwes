import React from 'react';
import Arwes from '../Arwes';
import List from './index';

export default () => (
  <Arwes>
    <div style={{ padding: 20 }}>
      <List node='ul'>
        <li>Futuristic</li>
        <li>Science Fiction</li>
        <li>Cyberpunk</li>
      </List>
      <List node='ol'>
        <li>Futuristic</li>
        <li>Science Fiction</li>
        <li>Cyberpunk</li>
      </List>
      <List node='dl'>
        <dt>Futuristic</dt>
        <dd>Science Fiction</dd>
        <dt>Futuristic</dt>
        <dd>Science Fiction</dd>
      </List>
    </div>
  </Arwes>
);
