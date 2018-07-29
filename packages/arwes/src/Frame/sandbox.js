import React from 'react';
import Arwes from '../Arwes';
import Frame from './index';

export default class Example extends React.Component {
  constructor() {
    super(...arguments);
    this.state = { show: true };
  }
  render() {
    return (
      <Arwes>
        <button onClick={() => this.onToggle()}>Show/Hide</button>
        <div style={{ display: 'inline-block', padding: '20px' }}>
          <Frame
            show={this.state.show}
            animate={true}
            hover={true}
            level={3}
            corners={4}
            layer="primary"
          >
            <div style={{ padding: '20px 40px', fontSize: '32px' }}>
              Cyberpunk
            </div>
          </Frame>
        </div>
      </Arwes>
    );
  }
  onToggle() {
    this.setState({ show: !this.state.show });
  }
}
