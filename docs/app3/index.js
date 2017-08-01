import React from 'react';
import { render } from 'react-dom';
import Arwes from 'src/components/Arwes';
import Frame from 'src/components/Frame';

function App () {

  const resources = {
    bg: '/img/background-large.jpg',
    pattern: '/img/glow.png',
  };

  return (
    <Arwes resources={resources}>
      <div className='row app-content'>
        <div className='col s12'>
          <Frame border content corners={2} level={1}>
            <h1>Application structure</h1>
            <p>Demo of structure of an application and the organization of the components.</p>
            <hr />
            <p>Copyright 2017 <a href="https://romelperez.com">Romel Pérez</a></p>
          </Frame>
        </div>
      </div>
    </Arwes>
  );
}

render(<App />, document.querySelector('#app'));
