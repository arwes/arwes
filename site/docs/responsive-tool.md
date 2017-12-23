# Responsive Tool

Arwes has some utilities to handle responsive functionalities. You can use the
`createResponsive` module and create your tool.

```javascript
import { createTheme, createResponsive } from 'arwes';

const myTheme = createTheme();
const responsive = createResponsive({
  getTheme: () => myTheme
});

// To know in what breakpoint the viewport is at:
const state = responsive.get();
// `{ medium: true, status: 'medium' }`
// if device is on medium breakpoint, for example.

// To listen for breakpoint changes:
const listener = responsive.on(state => console.log(state));

// To turn it off:
responsive.off(listener);
```

You need to provide the [Design System](/docs/design-system) theme for it to know
about the breakpoints.

In a component you can use it the same way:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme,
  withStyles, createResponsive } from 'arwes';

class MyComponentClass extends React.Component {
  constructor () {
    super(...arguments);
    this.responsive = createResponsive({
      getTheme: () => this.props.theme
    });
  }
  render () {
    const { status } = this.responsive.get();
    return <div>Responsive status: {status}</div>;
  }
}

const MyComponent = withStyles()(MyComponentClass);

const App = () => (
  <ThemeProvider theme={createTheme()}>
    <MyComponent />
  </ThemeProvider>
);

ReactDOM.render(<App />, document.querySelector('#root'));
```

So the component can render `Responsive status: large` when viewport is in
breakpoint large when it is mounted.
