import React from 'react';
import { render } from 'react-dom';
import Arwes from 'src/components/Arwes';
import Frame from 'src/components/Frame';
import CardProject from 'src/components/CardProject';

function App () {

  const resources = {
    bg: '/img/background-large.jpg',
    pattern: '/img/glow.png',
  };

  return (
    <Arwes anim resources={resources}>

      <Frame className='header' node='header' border={[0, 0, 4]} level={2}>
        <div className='row'>
          <div className='col'>
            <img src='/img/logo.png' />
          </div>
          <div className='col'>
            <h1>Arwes</h1>
            <p>Cyberpunk GUI Framework</p>
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

      <div className='row'>
        <div className='col s12'>
          <CardProject
            name='Project, Officia deserunt anim id est laborum'
            type='talk'
            stars={1}
            type={{
              name: 'Talk',
              icon: 'account-multiple'
            }}
            date={new Date(2017, 6, 20)}
            lang='es'
          >
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
            in reprehenderit.
          </CardProject>
          <CardProject
            name='Project, Ut enim ad minim veniam'
            type={{
              name: 'Code',
              icon: 'code-array'
            }}
            date={new Date(2017, 4, 20)}
            stars={2}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis laboris nisi ut aliquip ex. Duis aute irure.
          </CardProject>
          <CardProject
            name='Project, Sunt in culpa qui officia'
            type={{
              name: 'Guide',
              icon: 'book'
            }}
            date={new Date(2017, 3, 20)}
            stars={3}
            lang='es'
          >
            Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.
          </CardProject>
        </div>
      </div>

      <Frame className='footer' node='footer' border={[1, 0, 0]} level={2}>
        <div className='row'>
          <div className='col s12'>
            <p>Copyright &copy; 2017 <a href="https://romelperez.com">Romel Pérez</a></p>
          </div>
        </div>
      </Frame>

    </Arwes>
  );
}

render(<App />, document.querySelector('#app'));
