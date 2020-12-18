The Arwes sounds management is composed by a set of tools which follow the
[project guidelines](../guidelines/guidelines.md) and is implemented using
[howlerjs](https://howlerjs.com) in [React](https://reactjs.org). It goes hand
in hand with the [animation management](../animation-management/animation-management.md)
though it is not a dependency.

- A sound can be played by a `player` from nodes.
- The `player` behavior can be determined by the `audio` settings received in
the node.
- The `players` and `audio` values can be setup for all system nodes, for nodes
of a certain type, or an specific node.
- If many nodes play the same `player` at the same time, it is responsibility
of the `player` to determine if the sound is played multiple times or only once.
- Only if a node is animated, it can play sounds.
- If multiple nodes in a system play the same sound at the same time, the sound
should be played only once.
- If a sound is playing and another node tries to play it again, the sound should
restarts.
