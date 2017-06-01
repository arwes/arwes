import React from 'react';
import { render } from 'react-dom';
import Arwes from 'src/components/Arwes';
import Frame from 'src/components/Frame';

const data = [{
  id: 20,
  name: 'Real-Time Web con WebSocket',
  description: 'Talk about real-time applications implementing technologies based on WebSocket, an standard to create simultaneous bidirectional communication in web platforms.',
}, {
  id: 21,
  name: 'Calumet Realtime',
  description: 'Real-Time communication framework for the project COMA of Grupo Calumet. RealTime is a web server based on Node.js, Express.js, Socket.io and Waterline to integrate with the existing platform of users.',
}, {
  id: 22,
  name: 'React / Redux Examples',
  description: 'A serie of examples to learn the tools based on React and Redux libraries. The examples were used in workshops to teach and learn about the React ecosystem.',
}, {
  id: 23,
  name: 'Chrome DevTools',
  description: 'Talk about the Developer Tools (DevTools) of the browser Google Chrome for programmers and designers working with web technologies. Inspect the DOM, track errors, review resources and much more.',
}, {
  id: 24,
  name: 'Asiste',
  description: 'Web platform to manage social and business events. It lets you control users, organizations, their portfolios and conversions in the event. You can also contact them publicly. It is a Progressive Web Application.',
}, {
  id: 25,
  name: 'BucaramangaJS Website',
  description: 'Official website for the meetup community BucaramangaJS, an intention to share the JavaScript knownledge and expertise with the Bucaramanga community.',
}, {
  id: 26,
  name: 'Katherine Navarro Website',
  description: 'Katherine Navarro\'s personal website with basic information and social media links.',
}];

function App () {
  return (
    <Arwes>
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
          { data.reverse().map(item => (
            <Frame key={item.id} content corners={2} component='article'>
              <h1 className='content-title'>{item.name}</h1>
              <p>{item.description}</p>
            </Frame>
          )) }
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
