import React from 'react';
import { render } from 'react-dom';
import Arwes from 'src/components/Arwes';
import Frame from 'src/components/Frame';

function App () {
  return (
    <Arwes resources>
      <Frame border='down' className='header' component='header'>
        <div className='row'>
          <div className='col s12'>
            <h1 className='title'>Arwes Project</h1>
          </div>
        </div>
      </Frame>
      <div className='row'>
        <div className='col s12'>
          <Frame content>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis laboris nisi ut aliquip ex. Duis aute irure.</p>
          </Frame>
          <Frame content corners={1}>
            <p>Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa mollit anim id est laborum ea commodo consequat.</p>
          </Frame>
        </div>
      </div>
      <div className='row'>
        <div className='col s12'>
          <Frame content corners={2} component='article'>
            <h1 className='content-title'>Velit esse cillum dolore</h1>
            <p>Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa mollit anim id est laborum ea commodo consequat.</p>
          </Frame>
          <Frame content corners={2} component='article'>
          <h1 className='content-title'>Consectetur adipisicing elit</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis laboris nisi ut aliquip ex. Duis aute irure.</p>
          </Frame>
          <Frame content corners={2} component='article'>
            <h1 className='content-title'>Dolor in reprehenderit in voluptate</h1>
            <p>Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa mollit anim id est laborum ea commodo consequat.</p>
          </Frame>
          <Frame content corners={2} component='article'>
          <h1 className='content-title'>Quis laboris nisi ut aliquip</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis laboris nisi ut aliquip ex. Duis aute irure.</p>
          </Frame>
          <Frame content corners={2} component='article' theme='success'>
            <h1 className='content-title'>Est laborum ea commodo consequat</h1>
            <p>Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa mollit anim id est laborum ea commodo consequat.</p>
          </Frame>
          <Frame content corners={2} component='article' theme='alert'>
          <h1 className='content-title'>Ut enim ad minim veniam, quis laboris nisi ut aliquip ex</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis laboris nisi ut aliquip ex. Duis aute irure.</p>
          </Frame>
          <Frame content corners={2} component='article' theme='disabled'>
            <h1 className='content-title'>Velit esse cillum dolore eu fugiat nulla pariatur</h1>
            <p>Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa mollit anim id est laborum ea commodo consequat.</p>
          </Frame>
        </div>
      </div>
      <Frame border='up' className='footer' component='footer'>
        <div className='row'>
          <div className='col s12'>
            <p>Copyright 2017 <a href="https://romelperez.com">Romel Pérez</a></p>
          </div>
        </div>
      </Frame>
    </Arwes>
  );
}

render(<App />, document.querySelector('#app'));
