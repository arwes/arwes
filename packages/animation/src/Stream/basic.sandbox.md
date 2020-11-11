```js
const COLOR_ON = '#27efb5'; // cyan
const COLOR_OFF = '#efb527'; // orange

const Item = withEnergy()(props => {
  const element = React.useRef();
  const { energy: { flow, getDuration } } = props;
  const duration = getDuration();

  React.useEffect(() => {
    if (flow.entering) {
      anime({
        targets: element.current,
        background: [COLOR_OFF, COLOR_ON],
        duration: duration.enter,
        easing: 'linear'
      });
    }
    else if (flow.exiting) {
      anime({
        targets: element.current,
        background: [COLOR_ON, COLOR_OFF],
        duration: duration.exit,
        easing: 'linear'
      });
    }
  }, [flow.value]);

  return (
    <div
      ref={element}
      style={{ padding: 5, background: COLOR_OFF }}
    >
      <div>{flow.value}</div>
    </div>
  );
});

function Sandbox () {
  const timeout = React.useRef();
  const [activate, setActivate] = React.useState(true);
  const duration = { enter: 500, exit: 500, stagger: 250 };

  React.useEffect(() => {
    timeout.current = setTimeout(
      () => setActivate(!activate),
      3500
    );
    return () => clearTimeout(timeout.current);
  }, [activate]);

  return (
    <AnimationProvider duration={duration}>
      <Stream activate={activate} serial>
        <Item />
        <Item />
        <Stream>
          <div style={{ marginLeft: 20 }}>
            <Item />
            <Item />
            <Item />
          </div>
        </Stream>
        <Item />
        <Item />
      </Stream>
    </AnimationProvider>
  );
}

render(<Sandbox />);
```
