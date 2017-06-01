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
      <Frame content border='down' className='header' component='header'>
        <div className='container'>
          <h1 className='title'>Romel Pérez</h1>
        </div>
      </Frame>
      <div className='container'>
        { data.reverse().map(item => (
          <Frame key={item.id} content corners={2} component='article'>
            <h1 className='content-title'>{item.name}</h1>
            <p>{item.description}</p>
          </Frame>
        )) }
      </div>
      <Frame content border='up' className='footer' component='footer'>
        <div className='container'>
          <p>Copyright 2017 Romel Pérez</p>
        </div>
      </Frame>
    </Arwes>
  );
}

render(<App />, document.querySelector('#app'));
