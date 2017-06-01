import React from 'react';
import { render } from 'react-dom';
import Arwes from 'src/components/Arwes';
import Frame from 'src/components/Frame';

function App () {
  return (
    <Arwes>
      <div className='row'>
        <div className='col s12'>
          <Frame content corners={2}>
            <h1>Title</h1>
            <p>content</p>
          </Frame>
        </div>
      </div>
    </Arwes>
  );
}

render(<App />, document.querySelector('#app'));
