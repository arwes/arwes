# Animation System

The Arwes Animation System is composed by a set of tools which follow the
[Arwes Animation and Sounds Guidelines](../../guidelines/animation-and-sounds.md)
implemented from React components.

## System Nodes

- An application is a `system`.
- An animated component is a `node`.
- A sub-system is a branch of the system of nodes with one root node.
- The animation is a "flow" of states in the nodes.
- A node can have one of the following four animation flow states:
    - `entering` - Transitioning in. The animations are assembling the component.
    - `entered` - Transitioned in. The animation is completed and component
    is shown.
    - `exiting` - Transitioning out. Animations are disassembling the component.
    - `exited` - Transitioned out. The animation is completed and the component
    is hidden.
- A node can only have the following changes between flow states:

![Animation Node Flow State](./animation-node-flow-state.png)

- The animation flow enters from parent nodes to children nodes.
- The animation flow exits from a root node to all its descendant nodes at
the same time.
- By default, a system nodes are exited and when activated, the nodes start
begin entering level by level.

![Animation System Flow](./animation-system-flow.png)

- By default a node is animated. If a node is not animated, its descendant nodes
will not be animated.

## `SoundsProvider`

There should be a provider to the system (A React context provider) to setup
the following settings:

- `duration: (number|Object)` - Duration of entering and exiting animations in
milliseconds. If number, it only specifies `enter` and `exit` times. This time
should be around 150-300 milliseconds.
  - `enter: number` - The duration the component lasts entering.
  - `exit: number` - The duration the component lasts exiting.
  - `stagger: number` - If staggering animations, the duration. Used to animate
  lists of nodes.

## `Animation`

An animated node component can have the following prop:

- `animation: Object` - Animation settings.
  - `animate: boolean = true` - Enable animations.
  - `activate: boolean = true` - Activate animation in flow if it is a parent
  animation node or `root`.
  - `root: boolean` - Animation operates independently from the rest of
  the system as a sub-system.
  - `duration: (number|Object)` - Extend the provider's duration setting.
  - `onUpdate: Function(flowStatus: string)` - Get notification when flow
  state changes.

## `withAnimation`

Any component can be wired to the animation flow using a HOC named `withAnimation`.
It will receive two props:

- `animation: Object` - A copy of the animation settings processed for the component.
- `flow: Object` - The animation flow state. It indicates in what point of the
animation flow the component is.
  - `status: string` - One of `entering`, `entered`, `exiting`, `exited`.
  - `entering: boolean`
  - `entered: boolean`
  - `exiting: boolean`
  - `exited: boolean`

The node component should use the animation settings and the flow state to animate.
The methods to animate the component is up to the component.
