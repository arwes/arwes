import React from 'react';
import { render } from 'react-dom';
import Arwes from 'src/components/Arwes';
import Frame from 'src/components/Frame';

function App () {
  return (
    <Arwes resources>
      <div className='row app-content'>
        <div className='col s12'>
          <Frame content corners={2}>
            <h1>Application structure</h1>
            <p>Demo of structure of an application and the organization of the components.</p>
            <p>Copyright 2017 <a href="http://romelperez.com">Romel Pérez</a></p>
          </Frame>
        </div>
      </div>
    </Arwes>
  );
}

render(<App />, document.querySelector('#app'));
