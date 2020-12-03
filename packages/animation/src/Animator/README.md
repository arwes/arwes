The `Energy` component is an interface used to control the animation flow
in a component. It represents a node in the system.

> This component is not used directly, instead it is used by the HOC
(High Order Component) `withEnergy`.

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
  - `delay: number = 0` - Time to delay before transitioning to `entered`.
  - `offset: number = 0` - When this node is child of `Stream`, this is the
  time to delay before transitioning to `entered` from this node and the
  following nodes.
- `merge: boolean` - If enabled and it is not a root node, the node will enter
in the flow when its parent changes to `entering`.
- `imperative: boolean = false` - If `true`, the flow state is controlled
imperatively, not declaratively.
- `onActivation: Function(boolean)` - Get notified when the node is activated or
deactivated.

### Methods

- `getFlow(): flow` - Returns the current node flow state.
- `hasEntered(): boolean` - If the node has transitioned to `entered` at least once.
- `hasExited(): boolean` - If the node has transitioned to `exited` at least once.
- `getDuration(): Object` - Get the node duration values.
- `updateDuration(duration: number | Object)` - Update the animation duration.
- `updateActivation(boolean)` - Updates the node flow activation with provided
value. Applicable if: `imperative = true`.

> To access these APIs, you would use an object referenced as `EnergyInterface`.
