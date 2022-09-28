```jsx
const COLOR_ON = "#27efb5"; // cyan
const COLOR_OFF = "#efb527"; // orange

function onAnimateEntering(animator, element) {
  anime({
    targets: element.current,
    easing: "linear",
    duration: animator.duration.enter,
    backgroundColor: [COLOR_OFF, COLOR_ON],
  });
}

function onAnimateExiting(animator, element) {
  anime({
    targets: element.current,
    easing: "linear",
    duration: animator.duration.exit,
    backgroundColor: [COLOR_ON, COLOR_OFF],
  });
}

function ItemComponent(props) {
  const { children } = props;
  const element = React.useRef();
  const animator = useAnimator();

  animator.setupAnimateRefs(element);

  return (
    <div ref={element} style={{ padding: 10, backgroundColor: COLOR_OFF }}>
      <div>{animator.flow.value}</div>
      <div style={{ marginLeft: 10 }}>{children}</div>
    </div>
  );
}

const Item = withAnimator({
  onAnimateEntering,
  onAnimateExiting,
})(ItemComponent);

function Sandbox() {
  const duration = { enter: 1000, exit: 1000 };
  const [showChild, setShowChild] = React.useState(false);
  const [activate, setActivate] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => setShowChild(true), 2000);
    return () => clearTimeout(timeout);
  }, []);

  React.useEffect(() => {
    const timeout = setTimeout(() => setActivate(false), 1950);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatorGeneralProvider animator={{ duration }}>
      <Item animator={{ activate: true }}>{showChild && <Item />}</Item>
      <Item animator={{ activate: activate }}>{showChild && <Item />}</Item>
      <Item animator={{ activate: false }}>{showChild && <Item />}</Item>
      <Item animator={{ animate: false }}>{showChild && <Item />}</Item>
    </AnimatorGeneralProvider>
  );
}

render(<Sandbox />);
```
