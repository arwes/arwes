```js
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
    timeout.current = setTimeout(() => setActivate(!activate), 1500);
    return () => clearTimeout(timeout.current);
  }, [activate]);

  return (
    <AnimatorGeneralSettingsProvider animator={{ duration: 200 }}>
      <Animator animator={{
        activate,
        manager: 'stagger',
        duration: { enter: 0, exit: 0, stagger: 30 }
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
    </AnimatorGeneralSettingsProvider>
  );
}

render(<Sandbox />);
```
