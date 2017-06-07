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
            <h1 className='title'>Romel Pérez</h1>
          </div>
        </div>
      </Frame>
      <div className='row'>
        <div className='col s12'>
          <Frame content>
            <p>The page is a demo of the frame containers components to layout content in an application implementing Arwes.</p>
          </Frame>
          <Frame content corners={1}>
            <p>If you want to create more customized containers you should use the frame inside a wrapper component with the custom designs.</p>
          </Frame>
        </div>
      </div>
      <div className='row'>
        <div className='col s12'>
          <Frame content corners={2} component='article'>
            <h1 className='content-title'>BucaramangaJS Website</h1>
            <p>Official website for the meetup community BucaramangaJS, an intention to share the JavaScript knownledge and expertise with the Bucaramanga community.</p>
          </Frame>
          <Frame content corners={2} component='article'>
            <h1 className='content-title'>Asiste</h1>
            <p>Web platform to manage social and business events. It lets you control users, organizations, their portfolios and conversions in the event. You can also contact them publicly. It is a Progressive Web Application.</p>
          </Frame>
          <Frame content corners={2} component='article'>
            <h1 className='content-title'>Calumet Realtime</h1>
            <p>Real-Time communication framework for the project COMA of Grupo Calumet. RealTime is a web server based on Node.js, Express.js, Socket.io and Waterline to integrate with the existing platform of users.</p>
          </Frame>
          <Frame content corners={2} component='article'>
            <h1 className='content-title'>Chrome DevTools</h1>
            <p>Talk about the Developer Tools (DevTools) of the browser Google Chrome for programmers and designers working with web technologies. Inspect the DOM, track errors, review resources and much more.</p>
          </Frame>
          <Frame content corners={2} component='article' theme='success'>
            <h1 className='content-title'>React / Redux Examples</h1>
            <p>A serie of examples to learn the tools based on React and Redux libraries. The examples were used in workshops to teach and learn about the React ecosystem.</p>
          </Frame>
          <Frame content corners={2} component='article' theme='alert'>
            <h1 className='content-title'>Real-Time Web con WebSocket</h1>
            <p>Talk about real-time applications implementing technologies based on WebSocket, an standard to create simultaneous bidirectional communication in web platforms.</p>
          </Frame>
          <Frame content corners={2} component='article' theme='disabled'>
            <h1 className='content-title'>Katherine Navarro Website</h1>
            <p>Katherine Navarro's personal website with basic information and social media links.</p>
          </Frame>
        </div>
      </div>
      <Frame border='up' className='footer' component='footer'>
        <div className='row'>
          <div className='col s12'>
            <p>Copyright 2017 Romel Pérez</p>
          </div>
        </div>
      </Frame>
    </Arwes>
  );
}

render(<App />, document.querySelector('#app'));
