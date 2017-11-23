import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import createTheme from './tools/createTheme';

Enzyme.configure({ adapter: new Adapter() });

export default function (TheComponent) {
  return {
    mount: (props, children) => {
      return mount(
        <TheComponent theme={createTheme()} classes={{}} {...props}>
          {children}
        </TheComponent>
      );
    },
    shallow: (props, children) => {
      return shallow(
        <TheComponent theme={createTheme()} classes={{}} {...props}>
          {children}
        </TheComponent>
      );
    }
  };
}
