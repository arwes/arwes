```javascript
const baseStyles = {
    display: 'block',
    width: '100%',
    height: '300px',
    textAlign: 'center',
    lineHeight: '300px',
    fontSize: 32,
    color: '#fff',
    transition: 'all 250ms ease-out',
};
const styles = {
    entering: { background: '#079382', },
    entered: { background: '#0b4c98', },
    exiting: { background: '#c78c34', },
    exited: { background: '#8f2a0b', },
};
class Example extends React.Component {
    constructor () {
        super(...arguments);
        this.state = { show: true };
    }
    render () {
        return (
            <div>
                <button onClick={() => this.onToggle()}>Toggle</button>
                <Animation show={this.state.show} animate timeout={1000}>
                    {anim => (
                        <div style={{ ...baseStyles, ...styles[anim.status] }}>
                            {anim.status}
                        </div>
                    )}
                </Animation>
            </div>
        );
    }
    onToggle () {
        this.setState({ show: !this.state.show });
    }
}
render(<Example />);
```
