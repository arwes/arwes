class Example extends React.Component {
    constructor () {
        super(...arguments);
        this.state = { show: true };
    }
    render () {
        return (
            <Arwes>
                <button onClick={() => this.onToggle()}>Show/Hide</button>
                <div style={{ display: 'inline-block', padding: '20px' }}>
                    <Frame show={this.state.show} animate={!!1} level={3} corners={4}>
                        <div style={{ padding: '20px 40px', fontSize: '32px' }}>
                            Cyberpunk
                        </div>
                    </Frame>
                </div>
            </Arwes>
        );
    }
    onToggle () {
        this.setState({ show: !this.state.show });
    }
}
render(<Example />);
