import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

export default function (TheComponent) {
  return {
    mount: (props, children) => {
      return mount(
        <TheComponent
          classes={{}}
          {...props}
        >
          {children}
        </TheComponent>
      );
    },
    shallow: (props, children) => {
      return shallow(
        <TheComponent
          classes={{}}
          {...props}
        >
          {children}
        </TheComponent>
      );
    }
  };
}
