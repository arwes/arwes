```js
const COLOR_ON = '#27efb5'; // cyan
const COLOR_OFF = '#efb527'; // orange

// Item

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
  const { name, animator, children } = props;
  const element = React.useRef();
  animator.setupAnimateRefs(element);
  return (
    <div
      ref={element}
      style={{
        padding: 10,
        backgroundColor: COLOR_OFF,
        border: '10px solid transparent'
      }}
    >
      <div>Name: <b>{name}</b></div>
      <div>Flow: <b>{animator.flow.value}</b></div>
    </div>
  );
}

const Item = withAnimator({
  useAnimateEntering,
  useAnimateExiting
})(ItemComponent);

// ItemExtended

function useAnimateExited (animator, element) {
  anime.set(element.current, { borderColor: 'red' });
}

function useAnimateEntered (animator, element) {
  anime.set(element.current, { borderColor: 'green' });
}

const ItemExtended = extendAnimator({
  useAnimateExited,
  useAnimateEntered
})(Item);

// Sandbox

function Sandbox () {
  const duration = { enter: 1000, exit: 1000 };
  const [activate, setActivate] = React.useState(true);
  const timeout = React.useRef();

  React.useEffect(() => {
    timeout.current = setTimeout(
      () => setActivate(!activate),
      2000
    );
    return () => clearTimeout(timeout.current);
  }, [activate]);

  return (
    <>
      <Item
        name='Item'
        animator={{ duration, activate }}
      />
      <br />
      <ItemExtended
        name='ItemExtended'
        animator={{ duration, activate }}
      />
    </>
  );
}

render(<Sandbox />);
```
