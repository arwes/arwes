# Animation System

The Arwes Animation System is composed by a set of tools which follow the
[Arwes Animation and Sounds Guidelines](../../guidelines/animation-and-sounds.md)
implemented from React components.It goes hand in hand with the [Sounds System](../sounds/sounds-system.md).

## Nodes

- An animated component is a "node".
- An application is a "system". A tree of nodes with one root.
- A sub-system is a branch of the system. Starting from a node as root.
- The animation is a "flow" of states in the nodes.
- A node can have one of the following four animation flow states:
    - `exited` - Transitioned out. The animation is completed and the component
    is hidden. If component is animated, this will be always its initial state.
    - `entering` - Transitioning in. The animations are assembling the component.
    - `entered` - Transitioned in. The animation is completed and component
    is shown. If component is not animated, this will be always its state.
    - `exiting` - Transitioning out. Animations are disassembling the component.
- A node can only have the following changes between flow states:

![Animation Node Flow State](./animation-node-flow-state.png)

- The animation flow "enters" from parent nodes to children nodes.
- By default, a system nodes are `exited` and when activated, the nodes begin
entering level by level.
- Flow "enters" in a node when it changes from `exited` to `entering` to `entered`.
- For a node to enter, either it is a "root node" and it is activated to enter,
or its parent was changed to `entered`.
- The animation flow "exits" from a root node to all its descendant nodes at
the same time. So it is recommended to have the same exit duration for all nodes.
- Flow "exits" in a node when it changes from `entered` to `exiting` to `exited`.

![Animation System Flow](./animation-system-flow.png)

- By default a node is animated. If a node is not animated, its descendant nodes
will not be animated.
- A node is added to the system as `exited` if animation is enabled. If it is a
root and activated, or its direct parent is `entered`, it should start `entering`.
Otherwise it stays as `exited`.
- If a node is removed from the system and it is as `entered` or `entering`,
it should start `exiting` and completely removed from the DOM when `exited`.

## `Animation`

The `Animation` component is an interface used to control the animation flow
in a component. It represents a node in the system.

This component is not used directly, instead it is used by a HOC (High Order Component).

### Props

- `animate: boolean = true` - Enable animations.
- `root: boolean` - Animation operates independently from the rest of
the system as a sub-system.
- `activate: boolean = true` - Activate animation flow if it is a parent root
animation node or `root` is enabled. Otherwise this component animation will
be controlled by its parent component, not this prop.
- `duration: number | Object` - Duration settings for this node. If number is
provided, it only specifies `enter` and `exit` times. Any duration is set in
milliseconds.
    - `enter: number = 200` - The duration the component lasts entering.
    - `exit: number = 200` - The duration the component lasts exiting.
    - `stagger: number = 50` - The duration to start animating between nodes in a list
    if applicable.
    - `delay: number = 0` - Time to delay before transitioning from `exited` to `entering`.
    It does not apply from `exiting`.
    - `stable: boolean` - If a component is stable, its duration can not be changed
    after definition. It should be used to determine how long animations last.
- `merge: boolean` - If enabled and it is not a root node, the node will enter
in the flow when its parent changes to `entering`.
- `onUpdate: Function(flow)` - Get notified when flow state changes.
- `onUpdateCheck: Function(({ component, prev: flow, next: flow }) => boolean)` -
Called before the node is going to transition. If `false` is returned,
the node is not transitioned. If `true` is returned, the transition will be
transitioned. This converts the node partially to a `root` node.

### Methods

- `updateDuration(duration: number | Object)` - It can update the animation duration
processed of the component. But it should only be called before the node
is going to transition from one state to another. It will not have effect when
`duration.stable = true`.
- `getDurationIn(): number` - Get the duration the node lasts entering,
including `delay`.
- `getDurationOut(); number` - Get the duration the node lasts exiting.
- `hasEntered(): boolean` - If the node has entered in the system flow at least once.
- `hasExited(): boolean` - If the node has exited in the system flow at least once.
- `checkUpdate()` - If `onUpdateCheck` is defined, run it.

## `AnimationProvider`

There can be a provider (a React context provider) in the system to setup
default animation settings to all descendant nodes.

The available props are: `animate` and `duration`.

The descendant nodes will extend those props if available and defined.

### Example

```js
<AnimationProvider animate duration={{ enter: 250 }}>
    <App />
</AnimationProvider>
```

## `withAnimation`

Any component can be wired to the animation flow using a HOC named `withAnimation`.
This will convert a component into a node in the system. It uses the `Animation`
component under the hood.

### Options

The HOC can receive options as an object defining the default options the
nodes will take: `animate`, `root`, `activate`, and `duration`. It can also
take the following options:

- `cycles: boolean = true` - If the component should enable the flow actions on
this component: `enter` and `exit` methods will be required on the component.

```js
const options = { cycles: false, root: true, duration: { delay: 1000 } };
const MyNode = withAnimation(options)(MyComponent);
```

### Component Props Provided

When a component uses the HOC, it can receive the animation settings by the
object prop named `animation`.

```js
<MyNode animation={{ root: true, activate: false }} />
```

### Component Props Received

And the node component will receive the following props:

- `animation: Object` - A copy of the animation settings processed for the component.
But also some new properties.
    - `updateDuration: Function` - A reference to the `Animation` component method
    of the same name. It can be called on `componentDidMount`.
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
const MyNode = withAnimation()(MyComponent);
```

### Cycles

The node component should implement two methods, `enter` and `exit`, unless
the HOC receives option `cycles = false`. The methods will be called when
the node in the flow has to enter or exit. They will not be called if the node
has `animate = false`.

```js
class MyComponent extends React.PureComponent {
    enter () { /* Run animations on entering. */ }
    exit () { /* Run animations on exiting. */ }
}
const MyNode = withAnimation()(MyComponent);
```

The node component should use these methods or the flow states to animate
the component elements. The actual animation functionalities are up to the
component to use.

## `Secuence`

The `Secuence` virtual component can be used to handle serial flow changes in
a list of nodes.

This component behaves as a node.

By default, when the `Secuence` enters in the flow, its children nodes will start
animating in serial. For example, once the component's first child changes to
`entered`, the second child will change from `exited` to `entering`, and so on.

The first item will enter in the flow right away when the `Secuence` is ready
to enter. If the `Secuence`'s parent it `entered` or it is a `root`, then
its first child will change to `entering` if applicable.

### Props

It receives the same props as `Animation` and the following:

- `stagger: boolean` - If `true`, the flow in the list will stagger given the
`duration.stagger` duration. So if `duration.stagger = 75`, then the first item
will enter at 0ms, the second at 75ms, the third at 150ms, and so on.
- `onUpdateCheck: Function(({ component, prev: flow, next: flow, index: number }) => boolean)` -
Called before a children node is going to transition. If `false` is returned,
that node is not transitioned. If `true` is returned, the transition will be
executed when its calculated time was decided. So it will work the same way with
the serial or staggering flow animation strategy used. This converts the node
partially to a `root` node.

### Methods

- `getDurationIn(): number` - Get the duration all children nodes last entering.
- `getDurationOut(); number` - Get the duration the first children node lasts
exiting.
- `checkUpdate()` - If `onUpdateCheck` is defined, run it on each
children node.

### Example 1

Animate a list of nodes using a staggering strategy with 100ms between them.

```js
<ul className='list'>
    <Secuence stagger duration={{ stagger: 100 }}>
        <li className='item'>
            <MyNode />
        </li>
        <li className='item'>
            <MyNode />
        </li>
        <li className='item'>
            <MyNode />
        </li>
    </Secuence>
</ul>
```

### Example 2

```js
// Assuming there is a method `isVisible()` of all children components
// to determine if they are visible on viewport.
// This will only allow to show the elements if they are visible.
const onUpdateCheck = ({ component, next }) =>
    next.entering ? component.isVisible() : true;

let secuence;
let container;

...
<Secuence
    ref={ref => (secuence = ref)}
    onUpdateCheck={onUpdateCheck}
>
    <div ref={ref => (container = ref)}>
        <MyNode />
        <MyNode />
        <MyNode />
        <MyNode />
    </div>
</Secuence>
...

// Assuming the `<MyNode />` elements are visible according to the container's
// scroll. So, whenever is a change in the container's scroll, check
// the nodes elements visibility and update their activation.
container.addEventListener('scroll', () => secuence.checkUpdate());
```

## Animation Tools

A recommended tool to make animations using the animation flow in the components
is [animejs](https://animejs.com). But any other library can be used.
