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
      <Frame className='header' node='header' border='0 0 4px' level={2}>
        <div className='row'>
          <div className='col s12'>
            <h1 className='title'>Arwes Project</h1>
          </div>
        </div>
      </Frame>
      <div className='row'>
        <div className='col s12'>
          <Frame content border level={0}>
            <h1 className='content-title'>level 0, corners 0</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis laboris nisi ut aliquip ex. Duis aute irure.</p>
          </Frame>
          <Frame content border corners={1} level={1}>
            <h1 className='content-title'>level 1, corners 1</h1>
            <p>Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa mollit anim id est laborum ea commodo consequat.</p>
          </Frame>
          <Frame content border corners={2} level={2}>
            <h1 className='content-title'>level 2, corners 2</h1>
            <p>Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa mollit anim id est laborum ea commodo consequat.</p>
          </Frame>
          <Frame content border corners={3} level={3}>
            <h1 className='content-title'>level 3, corners 3</h1>
            <p>Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa mollit anim id est laborum ea commodo consequat.</p>
          </Frame>
        </div>
      </div>
      <div className='row'>
        <div className='col s12'>
          <Frame content border corners={2} node='article'>
          <h1 className='content-title'>status normal, Quis laboris nisi ut aliquip</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis laboris nisi ut aliquip ex. Duis aute irure.</p>
          </Frame>
          <Frame content border corners={2} node='article' theme='success'>
            <h1 className='content-title'>status success, Est laborum ea commodo consequat</h1>
            <p>Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa mollit anim id est laborum ea commodo consequat.</p>
          </Frame>
          <Frame content border corners={2} node='article' theme='alert'>
          <h1 className='content-title'>status alert, Ut enim ad minim veniam, quis laboris</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis laboris nisi ut aliquip ex. Duis aute irure.</p>
          </Frame>
          <Frame content border corners={2} node='article' theme='disabled'>
            <h1 className='content-title'>status disabled, Velit esse cillum dolore eu</h1>
            <p>Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa mollit anim id est laborum ea commodo consequat.</p>
          </Frame>
        </div>
      </div>
      <Frame className='footer' node='footer' border='1px 0 0' level={2}>
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
