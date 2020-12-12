The Arwes animation management is composed by a set of tools which follow the
[project guidelines](../guidelines/guidelines.md) and is implemented in
[React](https://reactjs.org). It goes hand in hand with the
[sounds management](../sounds-management/sounds-management.md) though it is not
a dependency.

## Installation

All the tools are bundled and can be installed with the following NPM package:

```bash
npm install @arwes/animation
```

The animation management tooling requires React v17 as a peer-dependency.

## Animators

Any React component can have animations features and be added to the
[Arwes system](../guidelines/systems/systems.md) by using the `<Animator/>`
component.

The `<Animator/>` component will work as an animated node in the system. It will
be interconnected by sharing data and communicating with its parent and
children nodes.

Normally, the `withAnimator` high-order component (HOC) will handle the
animator component setup instead of the component itself. So class/function
components with specific initial settings can be created.

A HTML button component can be animated like:

```js
function Button (props) {
  const buttonRef = useRef();

  // An animated component will receive `animator` prop with
  // the animator API.
  props.animator.setupAnimateRefs(buttonRef);

  return (
    <button ref={buttonRef}>
      {props.children}
    </button>
  );
}

function useAnimateEntering (animator, buttonRef) {
  // On flow entering, animate the refs HTML elements.
}

function useAnimateExiting (animator, buttonRef) {
  // On flow exiting, animate the refs HTML elements.
}

// "enter" is the duration to transition from exited to entering to entered.
// "exit" is the duration to transition from entered to exiting to exited.
const duration = { enter: 200, exit: 200 };

const AnimatedButton = withAnimator({
  useAnimateEntering,
  useAnimateExiting,
  duration
})(Button);
```

The new wrapped component `<AnimatedButton/>` by the HOC will have animations
enabled and it will handle when to call the animate hooks on flow transitions.

## Animate Hooks

An animator will only handle the flow transitions and flow control management.
The actual HTML elements animations should be handled inside the animate hooks.

By setting up the references to the HTML elements inside the component render
with `animator.setupAnimateRefs()`, the hooks can receive them for manipulations.

The HTML elements animations can be made with any HTML animation library.
Recommended libraries are [animejs](https://animejs.com) and [GreenSock](https://greensock.com).

If the example `<AnimatedButton/>` component should have an animation to enter
and exit, using [animejs](https://animejs.com) it could be written like this:

```js
import anime from 'animejs';

function useAnimateEntering (animator, buttonRef) {
  anime({
    targets: buttonRef.current,
    duration: animator.duration.enter,
    easing: 'linear',
    opacity: [0, 1]
  });
}

function useAnimateExiting (animator, buttonRef) {
  anime({
    targets: buttonRef.current,
    duration: animator.duration.enter,
    easing: 'linear',
    opacity: [1, 0]
  });
}
```

When flow enters, it would animate its opacity from 0 to 1. When flow exits,
it will reverse it.

```arwes_sandbox
function Button (props) {
  const buttonRef = React.useRef();
  props.animator.setupAnimateRefs(buttonRef);
  return (
    <button ref={buttonRef}>
      {props.children}
    </button>
  );
}

function useAnimateEntering (animator, buttonRef) {
  anime({
    targets: buttonRef.current,
    duration: animator.duration.enter,
    easing: 'linear',
    opacity: [0, 1]
  });
}

function useAnimateExiting (animator, buttonRef) {
  anime({
    targets: buttonRef.current,
    duration: animator.duration.enter,
    easing: 'linear',
    opacity: [1, 0]
  });
}

const duration = { enter: 200, exit: 200 };

const AnimatedButton = withAnimator({
  useAnimateEntering,
  useAnimateExiting,
  duration
})(Button);

function Sandbox () {
  const [activate, setActivate] = React.useState(true);
  const timeout = React.useRef();

  React.useEffect(() => {
    timeout.current = setTimeout(() => setActivate(!activate), 1000);
    return () => clearTimeout(timeout.current);
  }, [activate]);

  return (
    <AnimatedButton animator={{ activate }}>
      My Button
    </AnimatedButton>
  );
}

render(<Sandbox />);
```

There is a hook for all the flow states transitions and the component mounting
and unmounting lifecycles.

- `useAnimateMount` - On component mount.
- `useAnimateEntering` - On flow entering.
- `useAnimateEntered` - On flow entered.
- `useAnimateExiting` - On flow exiting.
- `useAnimateExited` - On flow exited.
- `useAnimateUnmount` - On component unmount.

## Instance Settings

An animated component instance can receive an `animator` settings object to
configure only its instance animation settings.

In the example of the `<Button/>` component, it could receive instance
settings like:

```js
<AnimatedButton animator={{ duration: { enter: 150 } }}>
  My Button
</AnimatedButton>
```

In this case, it will have a custom enter duration.

## Nesting

Animator components can be nested to create many variations of animations flows.
By default, a child node will listen to its parent node for flow changes
to transition itself.

An animated `<Menu/>` and `<Item/>` components could be nested like:

```js
<Menu>
  <Item>
  <Item>
  <Item>
</Menu>
```

All the item nodes will transition to entering at once when the menu node is
on flow entered, unless configured otherwise.

## Children Managers

Direct children nodes inside an parent node can transition with different kinds
of managers. A manager is a function which determines when the children nodes
should transition on parent flow changes.

There are `parallel` (default), `stagger`, `sequence` and custom function managers.

In the example of the animated `<Menu/>` and `<Item/>` components, the menu
can make its children items to transition in staggering using the
`duration.stagger` default time like:

```js
<Menu animator={{ manager: 'stagger' }}>
  <Item>
  <Item>
  <Item>
</Menu>
```
