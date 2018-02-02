# Animation System

For animation effects, Arwes uses the same [Design System](/docs/design-system)
provider to set up some settings. Though it is required, animations are more
configured directly in the components rather than using the provider.

Most components use the [`<Transition />`](https://reactcommunity.org/react-transition-group/#Transition)
component behind the scenes to enable animations and they have the following
props to configure its animations:

- `animate: bool` - Indicates whether the component should be animated.
By default `false`.
- `show: bool` - If component is animated, then should the component show itself or not.
By default `true`.
- `animation: object` - Extra settings to pass to the `<Transition />` component.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme, Arwes, Button } from 'arwes';

const App = () => (
  <ThemeProvider theme={createTheme()}>
    <Arwes animate show>
      <div style={{ padding: 20 }}>
        <h1>My App</h1>
        <p>A SciFi Project</p>
        <Button animate show>Travel to Space</Button>
      </div>
    </Arwes>
  </ThemeProvider>
);

ReactDOM.render(<App />, document.querySelector('#root'));
```

In the example the components `<Arwes />` and `<Button />` are animatable and they
are shown at the same time when mounted. If `show` were to be passed as `false`,
they will be hidden, but by default still mounted.

Usually the components themselves would be with `opacity: 0` when hidden, but
its children would be left without effects. This is so you can animate them the
way you like. For example, the `<Button />` would have the button frame hidden
but its content would be left open for your own animations.

Since the components are rendered but hidden, they are SEO compatible so you can
create complete animations without losing crawler visibility.

Normally, the components have the same duration to be animated when shown and hidden.
They use the setting `animTime` (time in ms) in the **theme** provided by
`<ThemeProvider />`.

## Animation Component

If you want to create your own custom animated components, you can use the
`<Animation />` component. It uses the [`<Transition />`](https://reactcommunity.org/react-transition-group/#Transition)
and will only be enabled if `animate` is passed as `true`.

The component receives a function as `children` and it will receive an object
with the animation state:

- `status: string` - The `<Transition />` received status parameter.
- `entering: bool` - Started to be shown.
- `entered: bool` - Animation is completed and now is shown.
- `exiting: bool` - Started to be hidden.
- `exited: bool` - Animation is completed and now is hidden.

If animation is not enabled, it will be `entered` always.

A complete example can be seen in the [`<Animation />` playground](/play#Animation).

## Nested Animations

Since there are many animations which can happen in serial order when mounting
components, for most components you can use **functions as children**, where
specified, to control animation events. If you want to show a parent component
first and when it is shown completely, show its children, you can do:

```javascript
const App = () => (
  <ThemeProvider theme={createTheme()}>
    <Arwes animate show>
      {anim => (
        <div style={{ padding: 20 }}>
          <h1>My App</h1>
          <p>A SciFi Project</p>
          <Button animate show={anim.entered}>Travel to Space</Button>
        </div>
      )}
    </Arwes>
  </ThemeProvider>
);
```

When the `<Arwes />` renders its children, it will pass an object parameter
to define its state in the animation. When its animations are completed
the property `entered` will be `true` and its children can now start showing
and being animated.

With this now you can nest multiple components to make animations more realistic.
