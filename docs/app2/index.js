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

            <h1>Awesome random title</h1>
            <p>Lorem ipsum <abbr title='A random title'>dolor sit amet</abbr>, <b>consectetur adipisicing elit</b>, sed do eiusmod <a href='#'>tempor incididunt ut labore et</a> dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse <b>cillum dolore eu fugiat nulla pariatur</b>. Excepteur sint occaecat cupidatat <i>non proident, sunt in culpa</i> qui officia deserunt mollit anim id est laborum.</p>
            <p>Ut labore <small>et dolore magna aliqua</small>. Ut enim ad minim veniam, quis nostrud <sub>exercitation</sub> ullamco <sup>laboris nisi</sup> ut aliquip ex ea commodo consequat. <a href='#'>Duis aute irure dolor in reprehenderit</a> in voluptate velit esse cillum <i>dolore eu fugiat nulla</i> pariatur.</p>
            <blockquote cite='http://romelperez.com'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</blockquote>
            <blockquote cite='http://romelperez.com' data-theme='alert'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</blockquote>
            <blockquote cite='http://romelperez.com' data-theme='success'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</blockquote>
            <blockquote cite='http://romelperez.com' data-theme='disabled'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</blockquote>
            <hr />

            <h2>Another incredible title</h2>
            <figure>
              <img src='/img/wallpaper.jpg' />
              <figcaption>
                The incredible and breathtaking universe around us.
              </figcaption>
            </figure>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <h3>Dig a little bit deeper in the vast amount of knownledge</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <ul>
              <li>An item here</li>
              <li>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</li>
              <li>Another item around here</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</li>
            </ul>
            <h3>Now, let's see the next steps</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <dl>
              <dt>Coffee</dt>
              <dd>A short description like Black hot drink</dd>
              <dt>Milk and other friends</dt>
              <dd>They can have a longer description right here White cold drink</dd>
            </dl>
            <hr />

            <h2>Just one more title with amazing properties with an pretty video just the right way</h2>
            <video width="100%" controls>
              <source src="/video/solar-fields-discovering.mp4" type="video/mp4" />
            </video>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <ol>
              <li>An item here</li>
              <li>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</li>
              <li>Another item around here</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</li>
            </ol>
            <p>Reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <hr />

            <p>Copyright 2017 <a href="https://romelperez.com">Romel Pérez</a></p>

          </Frame>
        </div>
      </div>
    </Arwes>
  );
}

render(<App />, document.querySelector('#app'));
