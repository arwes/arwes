```js
const COLOR_ON = '#27efb5'; // cyan
const COLOR_OFF = '#efb527'; // orange

function useAnimateEntering (animator, element) {
  anime({
    targets: element.current,
    backgroundColor: [COLOR_OFF, COLOR_ON],
    duration: animator.duration.enter,
    easing: 'linear'
  });
}

function useAnimateExiting (animator, element) {
  anime({
    targets: element.current,
    backgroundColor: [COLOR_ON, COLOR_OFF],
    duration: animator.duration.exit,
    easing: 'linear'
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
  const duration = 1000;
  const [activate, setActivate] = React.useState(true);
  const timeout = React.useRef();

  React.useEffect(() => {
    timeout.current = setTimeout(
      () => setActivate(!activate),
      activate ? 4000 : 2000
    );
    return () => clearTimeout(timeout.current);
  }, [activate]);

  return (
    <AnimatorGeneralSettingsProvider animator={{ duration }}>
      <Item animator={{ activate }}>
        <Item>
          <Item />
          <Item />
        </Item>
        <Item>
          <Item />
          <Item />
        </Item>
        <Item>
          <Item />
          <Item />
        </Item>
      </Item>
    </AnimatorGeneralSettingsProvider>
  );
}

render(<Sandbox />);
```
