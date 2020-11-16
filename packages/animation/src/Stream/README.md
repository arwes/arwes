A stream of energies. The `Stream` virtual component can be used to handle
multiple flow changes in many node children. The nodes do not necessarily have
to be direct children.

This component is an extension of `Energy` component.

### Props

- `serial: boolean = false` - By default, when the node enters in the flow,
its children nodes will [stagger](https://css-tricks.com/staggering-animations/)
in the animation. For example, if `duration.stagger = 50`, the first node
will transition to `entering` at `0ms`, the second at `50ms`, the third at `100ms`,
and so on. If `true`, the nodes will transition to `entering` one after the
previous one finishes. The first one will still transition at `0ms`.
- `duration: Object`
  - `stagger: number = 50` - The duration to start animating between nodes
  in a list if staggering is enabled.
  - _`enter` - It is not available._
  - _`exit` - It is not available._
- _`merge` - It is not available._

### Methods

- `updateChildrenActivation(Function({ energy: EnergyInterface, component: Element,
index: number }): boolean | null)` -
Iterate over each child node and depending on the returned value, it updates
the flow state. If boolean is returned, it changes the activation of the child
node, unless it is the same current value. If no value is returned, the state
remains the same. Applicable if: `imperative = true`.

### Example 1

Animate a list of nodes using a staggering strategy with 100ms between them.

```js
<ul className='list'>
    <Stream duration={{ stagger: 100 }}>
        <li className='item'>
            <MyNode />
        </li>
        <li className='item'>
            <MyNode />
        </li>
        <li className='item'>
            <MyNode />
        </li>
    </Stream>
</ul>
```

### Example 2

There is a long list of animated components inside a container element with scroll.
When the `Stream` node is mounted, and the container's scroll changes, check
the components visibility and show/hide them.

```js
class MyComponent extends React.PureComponent () {
    streamRef = React.createRef();
    containerRef = React.createRef();

    componentDidMount () {
        this.updateChildrenFlow();
        containerRef.current.addEventListener('scroll', this.updateChildrenFlow);
    }

    updateChildrenFlow = () => {
        // Assuming there is a method `isVisible` of `MyNode` to determine
        // if they are visible on browser viewport.
        streamRef.current
            .updateChildrenActivation(({ component }) => component.isVisible());
    }

    render () {
        return (
            <Stream ref={this.streamRef} imperative>
                <div ref={this.containerRef}>
                    <MyNode />
                    <MyNode />
                    <MyNode />
                    <MyNode />
                </div>
            </Stream>
        );
    }
}
```
