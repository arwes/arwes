import React from 'react';
import testSetup from '../test-setup';
import Image from './Image';

const { mount } = testSetup(Image);

describe('Image', function () {

  it('Should render without crashing', function () {
    mount({
      Animation: ({ children }) => children({}),
      Frame: ({ children }) => <div>{children}</div>,
      src: '/img/wallpaper.jpg'
    });
  });

});
