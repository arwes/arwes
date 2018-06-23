import React from 'react';
import Arwes from '../Arwes';
import Image from './index';

export default () => (
  <Arwes>
    <div style={{ margin: '0 auto', padding: 20, maxWidth: 600 }}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <Image animate resources="/img/wallpaper.jpg">
        The vast universe around us
      </Image>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
  </Arwes>
);
