The Arwes Sounds System is composed by a set of tools which follow the
[Arwes Animation and Sounds Guidelines](../guidelines/animation-and-sounds.md)
implemented from React components. It goes hand in hand with the
[Animation Management System](../animation/animation-management-system.md).

## Sounds

- An audible component is a "node".
- An application is a "system". A tree of nodes with one root.
- A sub-system is a branch of the system. Starting from a node as root.
- A sound can be played by a `player` from nodes.
- The `player` behavior can be determined by the `audio` settings received in
the node.
- The `players` and `audio` values can be setup for all system nodes, for nodes
of a certain type, or an specific node.
- If many nodes play the same `player` at the same time, it is responsibility
of the `player` to determine if the sound is played multiple times or only once.

Only if a node is animated, it can play sounds.

If multiple nodes in a system play the same sound at the same time, the sound
should be played only once.

If a sound is playing and another node tries to play it again, the sound should
restarts.

## Sound Tools

A recommended tool to play sounds in the components is [howlerjs](https://howlerjs.com).
But any other player can be used.
