# Animation System

The Arwes Animation System is composed by a set of tools which follow the
[Arwes Animation and Sounds Guidelines](../../guidelines/animation-and-sounds.md)
implemented from React components. It goes hand in hand with the [Sounds System](../sounds/sounds-system.md).

## Nodes

- An animated component is a "node".
- An application is a "system". A tree of nodes with a root.
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

- By default a node is animated.
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
- `root: boolean` - Animation operates independently from its parent node,
making it a root node. (Any node is root if it does not have a parent node.)
- `activate: boolean = true` - Activate animation flow if it is a root node.
Otherwise this component animation will be controlled externally, not this prop.
- `duration: number | Object` - Duration settings for this node. If number is
provided, it only specifies `enter` and `exit` times. Any duration is set in
milliseconds.
    - `enter: number = 200` - The duration the component lasts entering.
    - `exit: number = 200` - The duration the component lasts exiting.
    - `stagger: number = 50` - The duration to start animating between nodes
    in a list if applicable.
    - `delay: number = 0` - Time to delay only before transitioning from
    `exited` to `entering`.
- `merge: boolean` - If enabled and it is not a root node, the node will enter
in the flow when its parent changes to `entering`.
- `onActivate: Function(boolean)` - Get notified when the node is activated or
deactivated.

### Methods

- `getFlow(): flow` - Returns the current node flow state.
- `hasEntered(): boolean` - If the node has entered in the system flow at least once.
- `hasExited(): boolean` - If the node has exited in the system flow at least once.
- `getDurationIn(): number` - Get the duration the node lasts entering,
including `delay`.
- `getDurationOut(); number` - Get the duration the node lasts exiting.
- `updateDuration(duration: number | Object)` - Update the animation duration.

> To access these APIs, you would use an object referenced as `AnimationInterface`.

## `AnimationProvider`

There can be a provider (a React context provider) in the system to setup
default animation settings to all descendant nodes.

The available props are: `animate` and `duration`.

The descendant nodes will extend those props if available and defined.

The providers can be stacked and their props will be merged.

### Example

```js
<AnimationProvider animate duration={{ enter: 250 }}>
    <App />
</AnimationProvider>
```

## `withAnimation`

Any component can be wired to the animation flow using a HOC named `withAnimation`.
This will convert a component into an animation node in the system. It uses the
`Animation` component under the hood.

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

- `animation: AnimationInterface` - An interface to access the `Animation`
component instance API.
- `flow: Object` - The animation flow state. It indicates in which point of the
animation flow the component is.
    - `status: string` - One of `entering`, `entered`, `exiting`, `exited`.
    - `entering: boolean`
    - `entered: boolean`
    - `exiting: boolean`
    - `exited: boolean`

```js
MyComponent.propTypes = {
    animation: PropTypes.object.isRequired,
    flow: PropTypes.object.isRequired,
    ...
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
component to implement.

## `Secuence`

The `Secuence` virtual component can be used to handle serial flow changes in
a list of nodes. The nodes do not necessarily have to be direct children.

This component behaves the same way as the `Animation` component.

By default, when the `Secuence` enters in the flow, its children nodes will [stagger](https://css-tricks.com/staggering-animations/)
in the animation. For example, if the `duration.stagger = 50`, the first node
will transition to `entering` at `0ms`, the second at `50ms`, the third at `100ms`,
and so on.

The first item node will enter in the flow right away when the `Secuence` enters.

### Props

It receives the same props as `Animation` and the following:

- `serial: boolean = false` - If `true`, the nodes will transition to `entering`
one after the previous one finishes. The first one will still transition at `0ms`.
- `controlledChildren: boolean = true` - If `true`, the component will control
its children flow state.

### Methods

- `getDurationIn(): number` - According to `serial` value, it sums all
children duration or calculate the time they take to enter in staggering mode.
- `getDurationOut(); number` - Get the duration the first children node lasts
exiting.
- `activateChildren(Function({ animation: AnimationInterface, component: Element, index: number }): boolean | null)` -
Iterate over each child node and depending on the returned value, it updates
the flow state. If boolean is returned, it changes the activation of the child
node, unless it is the same current value. If no value is returned, the state
remains the same.

### Example 1

Animate a list of nodes using a staggering strategy with 100ms between them.

```js
<ul className='list'>
    <Secuence duration={{ stagger: 100 }}>
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

There is a long list of animated components inside a container element with scroll.
Whenever the `Secuence` node is activated/deactivated or the container's scroll
changes, check the components visibility and show/hide them.

```js
// Assuming there is a method `isVisible` of `MyNode`
// to determine if they are visible on browser viewport.

const secuenceRef = createRef();
const containerRef = createRef();

const updateChildrenFlow = () => {
    const secuenceFlow = secuenceRef.current.getFlow();
    const isSecuenceActivated = secuenceFlow.entering || secuenceFlow.entered;

    secuenceRef.current.activateChildren(({ component }) => {
        if (isSecuenceActivated && component.isVisible()) {
            return true;
        }
        return false;
    });
};

...
<Secuence
    ref={secuenceRef}
    controlledChildren={false}
    onActivate={updateChildrenFlow}
>
    <div ref={containerRef}>
        <MyNode />
        <MyNode />
        <MyNode />
        <MyNode />
    </div>
</Secuence>
...

containerRef.current.addEventListener('scroll', updateChildrenFlow);
```

## Animation Tools

A recommended tool to make animations using the animation flow in the components
is [animejs](https://animejs.com). But any other library can be used.
