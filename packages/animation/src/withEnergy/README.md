Any component can be wired to the animation flow using a HOC named `withEnergy`.
This will convert a component into an animation node in the system. It uses the
`Energy` component under the hood.

### Options

The HOC can receive options as an object defining the default options the
nodes will take: `animate`, `root`, `merge`, and `duration`. It can also
take the following options:

- `cycles: boolean = true` - If the component should enable the flow actions on
this component: `enter` and `exit` methods will be required on the component.

```js
const options = { cycles: false, root: true, duration: { delay: 1000 } };
const MyNode = withEnergy(options)(MyComponent);
```

### Component Props Provided

When a component uses the HOC, it can receive the animation settings by the
object prop named `energy`.

```js
<MyNode energy={{ root: true, activate: false }} />
```

### Component Props Received

And the node component will receive the following props:

- `energy: EnergyInterface` - An interface to access the `Energy`
component instance API.
  - `flow: Object` - The animation flow state. It indicates in which point
    of the animation flow the component is.
    - `value: string` - One of `entering`, `entered`, `exiting`, `exited`.
    - `entering: boolean`
    - `entered: boolean`
    - `exiting: boolean`
    - `exited: boolean`

```js
MyComponent.propTypes = {
    energy: PropTypes.object.isRequired
    ...
}
const MyNode = withEnergy()(MyComponent);
```

### Cycles

The node component should implement two methods, `enter` and `exit`, unless
the HOC receives option `cycles = false` or `animate = false`. The methods
will be called when the node in the flow has to enter or exit.

```js
class MyComponent extends React.PureComponent {
    enter () { /* Run animations on entering. */ }
    exit () { /* Run animations on exiting. */ }
}
const MyNode = withEnergy()(MyComponent);
```

The node component should use these methods or the flow states to animate
the component elements. The actual animation functionalities are up to the
component to implement.
