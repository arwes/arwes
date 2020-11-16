The Arwes Animation System is composed by a set of tools which follow the
[Arwes Animation and Sounds Guidelines](../guidelines/animation-and-sounds.md)
implemented from React components. It goes hand in hand with the [Sounds System](../sounds/sounds-management-system.md).

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
- For a node to enter:
  - It is a "root node" and it is activated to enter.
  - Its parent was changed to `entered`.
  - It is controlled by its parent component.
- The animation flow "exits" from a root node to all its descendant nodes at
the same time, or it is controlled by its parent. So it is recommended to have
the same exit duration for all nodes.
- Flow "exits" in a node when it changes from `entered` to `exiting` to `exited`.

![Animation System Flow](./animation-system-flow.png)

- By default, a node is animated.
- A node is added to the system as `exited` if animation is enabled. According
to its configuration, it could start entering or stay in the same state.
- If a node is removed from the system and it is as `entered` or `entering`,
it should start `exiting` and completely removed from the DOM when `exited`.

## Animation Tools

A recommended tool to make animations using the animation flow in the components
is [animejs](https://animejs.com). But any other library can be used.

TODO: A node can be controlled to be animated and play sounds programmatically.
By default, it has its animations and sounds controlled by its parent node.

TODO: For animations and sounds, if a node becomes a root, then it becomes independent
from its parent and it creates a sub-system.
