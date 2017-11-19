import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ThemeProvider } from 'theming';

import theme from './tools/createTheme/theme';

Enzyme.configure({ adapter: new Adapter() });

export default function (TheComponent) {
  return {
    mount: (props, children) => {
      return mount(
        <ThemeProvider theme={theme}>
          <TheComponent {...props}>
            {children}
          </TheComponent>
        </ThemeProvider>
      );
    },
    shallow: (props, children) => {
      return shallow(
        <ThemeProvider theme={theme}>
          <TheComponent {...props}>
            {children}
          </TheComponent>
        </ThemeProvider>
      );
    }
  };
}
