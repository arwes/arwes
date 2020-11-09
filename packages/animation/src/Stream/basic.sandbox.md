```js
const COLOR_ON = '#27efb5'; // green
const COLOR_OFF = '#efb527'; // orange

const Item = withEnergy()(
  class ItemBase extends React.PureComponent {
    constructor () {
      super(...arguments);
      this.element = React.createRef();
    }

    render () {
      return (
        <li ref={this.element} style={{ padding: 5, backgroundColor: COLOR_OFF }}>
          <div>{this.props.energy.flow.value}</div>
        </li>
      );
    }

    enter () {
      anime({
        targets: this.element.current,
        backgroundColor: [COLOR_OFF, COLOR_ON],
        duration: this.props.energy.getDuration().enter,
        easing: 'linear'
      });
    }

    exit () {
      anime({
        targets: this.element.current,
        backgroundColor: [COLOR_ON, COLOR_OFF],
        duration: this.props.energy.getDuration().exit,
        easing: 'linear'
      });
    }
  }
);

class Sandbox extends React.PureComponent {
  constructor () {
    super(...arguments);
    this.interval = null;
    this.element = React.createRef();
    this.state = { activate: true };
  }

  componentDidMount () {
    this.interval = setInterval(() => {
      this.setState({ activate: !this.state.activate });
    }, 4000);
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }

  render () {
    return (
      <AnimationProvider duration={{ enter: 500, exit: 500, stagger: 250 }}>
        <Stream activate={this.state.activate} serial>
          <ul>
            <Item />
            <Item />
            <Stream>
              <ul>
                <Item />
                <Item />
                <Item />
              </ul>
            </Stream>
            <Item />
            <Item />
          </ul>
        </Stream>
      </AnimationProvider>
    );
  }
}

render(<Sandbox />);
```
