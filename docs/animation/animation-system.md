# Animation System

The Arwes Animation System is composed by a set of tools which follow the
[Arwes Animation and Sounds Guidelines](../../guidelines/animation-and-sounds.md)
implemented from React components.

## System Nodes

- An animated component is a "node".
- An application is a "system". A tree of nodes.
- A sub-system is a branch of the system.
- The animation is a "flow" of states in the nodes.
- A node can have one of the following four animation flow states:
    - `entering` - Transitioning in. The animations are assembling the component.
    - `entered` - Transitioned in. The animation is completed and component
    is shown. If component is not animated, this will be always the state.
    - `exiting` - Transitioning out. Animations are disassembling the component.
    - `exited` - Transitioned out. The animation is completed and the component
    is hidden. If component is animated, this will be its initial state always.
- A node can only have the following changes between flow states:

![Animation Node Flow State](./animation-node-flow-state.png)

- The animation flow enters from parent nodes to children nodes.
- The animation flow exits from a root node to all its descendant nodes at
the same time.
- By default, a system nodes are exited and when activated, the nodes begin
entering level by level.

![Animation System Flow](./animation-system-flow.png)

- By default a node is animated. If a node is not animated, its descendant nodes
will not be animated.
- A node is added to the system as `exited` if animation is enabled. If its
direct parent is `entered`, it should start `entering`. Otherwise it stays as
`exited`.
- If a node is removed from the system and it is as `entered` or `entering`,
it should start `exiting`.

## `Animation`

The `Animation` component is an interface used to control the animation flow
in a component. It represents a node in the system.

This component is not used directly, instead it is used by a HOC (High Order Component).

It accepts the following animation settings:

- `animate: boolean = true` - Enable animations.
- `root: boolean` - Animation operates independently from the rest of
the system as a sub-system.
- `activate: boolean = true` - Activate animation in flow if it is a parent
animation node or `root`. Otherwise this component animation will be controlled
by its parent component, not this prop.
- `duration: (number|Object)` - Duration of entering and exiting animations in
milliseconds. If number, it only specifies `enter` and `exit` times.
    - `enter: number` - The duration the component lasts entering.
    - `exit: number` - The duration the component lasts exiting.
    - `stagger: number` - The duration to start animating between nodes in a list.
    - `delay: number = 0` - Time to delay before transitioning from `exited` to `entering`.
    It does not apply from `exiting`. It adds to the total `enter` duration if
    calculated.
- `onUpdate: Function(flowStatus: string)` - Get notified when flow state changes.

This component offers the following methods:

- `updateDuration(duration: number | Object)` - It can update the animation duration
processed of the component. But it should only be called before the node
is going to transition from one state to another.

## `AnimationProvider`

There can be a provider (a React context provider) in the system to setup
default animation settings to all descendant nodes.

The available props are: `animate` and `duration`.

```js
<AnimationProvider animate={true} duration={duration}>
    <App />
</AnimationProvider>
```

The nodes will extend those props provided if available and defined.

## `withAnimation`

Any component can be wired to the animation flow using a HOC named `withAnimation`.
This will convert a component in a node in the system. It uses the `Animation`
component under the hood.

The HOC can receive options as an object defining the default options the
component will take: `animate`, `root`, `activate`, and `duration`. It can also
take the following props:

- `flow: boolean = true` - If the component should enable the flow actions on
this component: `enter` and `exit` methods will be required on the component.

```js
const options = { root: true, duration: 500 };
const AnimatedMyComponent = withAnimation(options)(MyComponent);
```

When a component uses the HOC, it can receive the animation settings by the
object prop named `animation`.

```js
<AnimatedMyComponent animation={{ root: true, activate: false }} />
```

And inside the component, it will receive the following props:

- `animation: Object` - A copy of the animation settings processed for the component.
The priority of settings is: 1) Provider 2) HOC 3) Component. But also some new
properties.
    - `updateDuration: Function` - A reference to the `Animation` component method.
    It can be called on `componentDidMount`.
- `flow: Object` - The animation flow state. It indicates in what point of the
animation flow the component is.
    - `status: string` - One of `entering`, `entered`, `exiting`, `exited`.
    - `entering: boolean`
    - `entered: boolean`
    - `exiting: boolean`
    - `exited: boolean`

```js
class MyComponent extends React.PureComponent {
    static propTypes = {
        animation: PropTypes.object.isRequired,
        flow: PropTypes.object.isRequired,
        ...
    }
}
const AnimatedMyComponent = withAnimation()(MyComponent);
```

The node component should implement two methods, `enter` and `exit`, unless
the HOC receives option `flow` as `false`. The methods will be called when
the node in the flow has to enter or when it has to exit. They will not be
called if the node is not animatable.

```js
class MyComponent extends React.PureComponent {
    enter () { /* Run animations on entering. */ }
    exit () { /* Run animations on exiting. */ }
}
const AnimatedMyComponent = withAnimation()(MyComponent);
```

The node component should use these methods or the flow states to animate
the component elements. The actual animation functionalities are up to the component
to use.
