```js
const COLOR_ON = '#27efb5'; // cyan
const COLOR_OFF = '#efb527'; // orange

const Item = withEnergy()(props => {
  const element = React.useRef();
  const { energy: { flow, getDuration }, children } = props;
  const duration = getDuration();

  React.useEffect(() => {
    if (flow.entering) {
      anime({
        targets: element.current,
        backgroundColor: [COLOR_OFF, COLOR_ON],
        duration: duration.enter,
        easing: 'linear'
      });
    }
    else if (flow.exiting) {
      anime({
        targets: element.current,
        backgroundColor: [COLOR_ON, COLOR_OFF],
        duration: duration.exit,
        easing: 'linear'
      });
    }

    return () => anime.remove(element.current);
  }, [flow.value]);

  return (
    <div
      ref={element}
      style={{ padding: 5, backgroundColor: COLOR_OFF }}
    >
      <div>{flow.value}</div>
      <div style={{ marginLeft: 10 }}>{children}</div>
    </div>
  );
});

function Sandbox () {
  const timeout = React.useRef();
  const [activate, setActivate] = React.useState(true);

  React.useEffect(() => {
    timeout.current = setTimeout(
      () => setActivate(!activate),
      2500
    );
    return () => clearTimeout(timeout.current);
  }, [activate]);

  return (
    <AnimationProvider duration={500}>
      <Item energy={{ activate }}>
        <Item>
          <Item />
        </Item>
      </Item>
    </AnimationProvider>
  );
}

render(<Sandbox />);
```
