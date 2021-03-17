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
  const { animator } = props;
  const element = React.useRef();

  animator.setupAnimateRefs(element);

  return (
    <div
      ref={element}
      style={{
        padding: 10,
        backgroundColor: COLOR_OFF,
        fontSize: 16
      }}
    >
      {animator.flow.value}
    </div>
  );
}

const Item = withAnimator({
  useAnimateEntering,
  useAnimateExiting
})(ItemComponent);

// The "manager" defines how will the children nodes be transitioned
// to flow "entered".
// This manager will assume there is a grid of 4 columns.
// It will make a stagger animation for each row items with the
// parent node "duration.stagger" time.
const manager = parentNode => {
  const rowsLength = 4;
  const staggerTime = parentNode.duration.stagger;

  // The list of each node with its respective enter time.
  const times = parentNode.nodes.map((node, index) => {
    const calcPosition = (index + 1) % rowsLength;
    const isLast = calcPosition === 0;
    const rowPosition = isLast ? rowsLength : calcPosition;

    const time = (rowPosition - 1) * staggerTime;
    return { node, time };
  });

  // If the animator has enabled `combine`, it must return
  // the total duration of the manager transition as `duration`.

  return { times };
};

function Sandbox () {
  const [activate, setActivate] = React.useState(true);
  const timeout = React.useRef();

  React.useEffect(() => {
    timeout.current = setTimeout(() => setActivate(!activate), 1500);
    return () => clearTimeout(timeout.current);
  }, [activate]);

  // A grid of 4x4 items.
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gridTemplateRows: 'repeat(4, 1fr)',
      gridColumnGap: '10px',
      gridRowGap: '10px',
      width: 360,
      height: 360
    }}>
      <Animator animator={{
        activate,
        manager,
        duration: { enter: 0, exit: 0, stagger: 200 }
      }}>
        <AnimatorGeneralProvider animator={{
          duration: { enter: 500, exit: 500 }
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
          <Item />
          <Item />

          <Item />
          <Item />
          <Item />
          <Item />
        </AnimatorGeneralProvider>
      </Animator>
    </div>
  );
}

render(<Sandbox />);
```
