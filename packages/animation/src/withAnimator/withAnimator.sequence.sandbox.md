```jsx
const COLOR_ON = '#27efb5'; // cyan
const COLOR_OFF = '#efb527'; // orange

function useAnimateEntering (animator, element) {
  anime({
    targets: element.current,
    easing: 'linear',
    duration: animator.duration.enter,
    backgroundColor: [COLOR_OFF, COLOR_ON]
  });
}

function useAnimateExiting (animator, element) {
  anime({
    targets: element.current,
    easing: 'linear',
    duration: animator.duration.exit,
    backgroundColor: [COLOR_ON, COLOR_OFF]
  });
}

function ItemComponent (props) {
  const { animator, children } = props;
  const element = React.useRef();

  animator.setupAnimateRefs(element);

  return (
    <div
      ref={element}
      style={{ padding: 10, backgroundColor: COLOR_OFF }}
    >
      <div>{animator.flow.value}</div>
      <div style={{ marginLeft: 10 }}>{children}</div>
    </div>
  );
}

const Item = withAnimator({
  useAnimateEntering,
  useAnimateExiting
})(ItemComponent);

function Sandbox () {
  const [activate, setActivate] = React.useState(true);
  const timeout = React.useRef();

  React.useEffect(() => {
    timeout.current = setTimeout(() => setActivate(!activate), 3000);
    return () => clearTimeout(timeout.current);
  }, [activate]);

  // The grand-children of the node with "sequence" management
  // are not taken in account for the calculation.

  return (
    <AnimatorGeneralProvider animator={{
      duration: { enter: 200, exit: 200 }
    }}>
      <Animator animator={{
        activate,
        manager: 'sequence',
        combine: true
      }}>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </Animator>
    </AnimatorGeneralProvider>
  );
}

render(<Sandbox />);
```
