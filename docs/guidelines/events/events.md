A node will transition from one [state](../states/states.md) to another when events
occur under certain conditions.

If a node is a "root" node in a [system](../systems/systems.md), it should listen
to external programatic changes to transition its state such as receiving the order
to transition in.

If a node is not a root node, it is listening to its parent nodes to determine
when to change its state.

An event in the node component such as mouse clicks, keyboard strokes, data loads,
or realtime notifications can trigger state transitions from one node to another,
to a particular sub-system, or even broadcast to the whole system.

- A link click event can make the entire system to transition out before changing
to a new application view.
- A form checkbox toggle event can make a sub-system in the system to transition
out before it is replaced for another.
- A menu hover event can make the menu children item nodes to transition in.

Node components events should not necessarily change its state. Such as toggling
a form checkbox or filling out a form input.

For subtle interactions, like hovering a link or typing a key, subtle animations
and sounds could be played. These should not bring attention.

For decisive interactions, like selecting an option or typing enter, more concise
animations and sounds could be played. These could bring attention.
