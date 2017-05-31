import React from 'react';
import { render } from 'react-dom';
import Arwes from 'src/components/Arwes';
import Frame from 'src/components/Frame';

const data = [{
  id: 0,
  name: 'Comunidad Laureanista',
  description: 'Official website for the Instituto Técnico Industrial Laureano Gómez Castro school.',
  date: '2011-11-22',
  lang: 'es',
  type: 0,
  weight: 1,
  link: 'http://comunidad-itilgc.com'
}, {
  id: 1,
  name: 'Conky Command',
  description: 'A geek conky (linux widget) for netbook desktop. It has science fiction design for black desktop environments. It should be used in netbooks or displays of 1024x600 pixels.',
  date: '2013-08-07',
  lang: 'en',
  type: 0,
  weight: 3,
  link: 'https://github.com/romelperez/conky-command'
}, {
  id: 2,
  name: 'Calumet Elise',
  description: 'Frontend library to develop web applications in the project COMA (Comunidad Académica by Grupo Calumet).',
  date: '2013-10-01',
  lang: 'es',
  type: 0,
  weight: 1,
  link: 'http://cormoran.uis.edu.co/eisi/Calumet/Estandar'
}, {
  id: 4,
  name: 'GRI S.A.S. Website',
  description: 'Official website for the company GRI Gestión en Responsabilidad Integral S.A.S. with a custom CMS.',
  date: '2014-09-22',
  lang: 'es',
  type: 0,
  weight: 1,
  link: 'http://grigestion.co'
}, {
  id: 3,
  name: 'UIS Clima',
  description: 'System of applications to record and display information about the weather in the city of Bucaramanga for the Universidad Industrial de Santander schools websites.',
  date: '2015-01-27',
  lang: 'es',
  type: 0,
  weight: 1,
  link: 'https://github.com/calumet/clima-cliente'
}, {
  id: 5,
  name: 'Calumet Estándar',
  description: 'Documentation for the project Elise Library, general tools, technologies and methodologies used in projects by Grupo Calumet.',
  date: '2015-08-17',
  lang: 'es',
  type: 1,
  weight: 1,
  link: 'http://cormoran.uis.edu.co/eisi/Calumet/Estandar'
}, {
  id: 6,
  name: 'PRHONE Simple Config Parser',
  description: 'PRHONE SCP, parse simple config files to extract configurable information for your projects.',
  date: '2015-08-22',
  lang: 'en',
  type: 0,
  weight: 3,
  link: 'https://github.com/romelperez/prhone-scp'
}, {
  id: 7,
  name: 'Calumet Aprender',
  description: 'Organized recompilation of resources and examples to learn programming with the technologies used in projects by the Grupo Calumet along with teaching talks of basic web programming.',
  date: '2015-09-19',
  lang: 'es',
  type: 2,
  weight: 2,
  link: 'https://github.com/calumet/aprender'
}, {
  id: 8,
  name: 'Promesas en JavaScript',
  description: 'A talk about the JavaScript Promises specification in Node version >= 4.0 and in the browser with the library Bluebird.',
  date: '2015-12-11',
  lang: 'es',
  type: 2,
  weight: 2,
  link: 'http://www.meetup.com/BucaramangaJS/events/226728738/'
}, {
  id: 9,
  name: 'Aplicaciones Frontend',
  description: 'How to build an web application from a front-end perspective using jQuery, Backbone and Browserify.',
  date: '2016-01-30',
  lang: 'es',
  type: 2,
  weight: 2,
  link: 'http://www.meetup.com/BucaramangaJS/events/228227734/'
}, {
  id: 10,
  name: 'PRHONE Mini-Database',
  description: 'PRHONE MDB, mini-database manager using Node file system API in a relational way for simple storing or for practicing Node web servers without using a real DBMS.',
  date: '2016-03-03',
  lang: 'en',
  type: 0,
  weight: 3,
  link: 'https://github.com/romelperez/prhone-mdb'
}, {
  id: 11,
  name: 'PRHONE Simple JavaScript Logger',
  description: 'PRHONE Log, a simple JavaScript logger aimed for client side applications but it can be used in Node.js environments.',
  date: '2016-06-15',
  lang: 'en',
  type: 0,
  weight: 3,
  link: 'https://github.com/romelperez/prhone-log'
}, {
  id: 12,
  name: 'PRHONE Browser Utils',
  description: 'PRHONE Utils, browser JavaScript utilities for general purposes, including feature detection, control of windows and frames dimentions and utility functions.',
  date: '2016-06-21',
  lang: 'en',
  type: 0,
  weight: 3,
  link: 'https://github.com/romelperez/prhone-utils'
}, {
  id: 13,
  name: 'VulcanUp',
  description: 'Custom widget as a jQuery plugin to upload single files and preview images using blueimp/jQuery-File-Upload.',
  date: '2016-07-08',
  lang: 'en',
  type: 0,
  weight: 2,
  link: 'https://github.com/vulcan-estudios/vulcanup'
}, {
  id: 14,
  name: 'VulcanVal',
  description: 'A package to validate data objects (possibly extracted from HTML forms) in client and server sides seamlessly and a customizable jQuery plugin to validate them in realtime.',
  date: '2016-07-13',
  lang: 'en',
  type: 0,
  weight: 1,
  link: 'http://vulcan-estudios.github.io/vulcanval'
}, {
  id: 15,
  name: 'Arwes',
  description: 'Simple graphical user interface framework inspired in science fiction (sci-fi) and futuristic designs and animations for web sites and applications made in SASS and React.',
  date: '2016-07-14',
  lang: 'en',
  type: 0,
  weight: 1,
  link: 'https://github.com/romelperez/arwes'
}, {
  id: 16,
  name: 'Introducción a Polymer',
  description: 'An introduction to the Polymer, a library to create web components, created and supported by Google, along with easy examples explaining its main features and how to use it.',
  date: '2016-07-29',
  lang: 'es',
  type: 2,
  weight: 2,
  link: '/charlas/polymer'
}, {
  id: 17,
  name: 'Introducción a JavaScript ES2015',
  description: 'An introduction to the main features of JavaScript ECMAScript 2015 using the transpiler Babel in Node.js with Babel CLI and the module bundler Webpack.',
  date: '2016-10-25',
  lang: 'es',
  type: 1,
  weight: 3,
  link: 'https://www.youtube.com/watch?v=03UkQmxJQcE'
}, {
  id: 18,
  name: 'Introducción a Vagrant',
  description: 'An introduction to Vagrant, a tool to create and work with virtualized environments to develop software. It is configurable and modular. Tests made in Ubuntu/Xenial.',
  date: '2016-10-26',
  lang: 'es',
  type: 1,
  weight: 3,
  link: 'https://www.youtube.com/watch?v=CONv9eCNuNY'
}, {
  id: 19,
  name: 'Introducción a Testing de Web Apps',
  description: 'General introduction to automated testing of web applications using JavaScript and Node.js, along with some libraries and frameworks to examine the ideas.',
  date: '2016-11-12',
  lang: 'es',
  type: 1,
  weight: 2,
  link: 'https://github.com/vulcan-estudios/web-testing'
}, {
  id: 20,
  name: 'Real-Time Web con WebSocket',
  description: 'Talk about real-time applications implementing technologies based on WebSocket, an standard to create simultaneous bidirectional communication in web platforms.',
  date: '2017-02-17',
  lang: 'es',
  type: 2,
  weight: 2,
  link: '/charlas/websocket'
}, {
  id: 21,
  name: 'Calumet Realtime',
  description: 'Real-Time communication framework for the project COMA of Grupo Calumet. RealTime is a web server based on Node.js, Express.js, Socket.io and Waterline to integrate with the existing platform of users.',
  date: '2017-03-02',
  lang: 'es',
  type: 0,
  weight: 1,
  link: 'https://github.com/calumet/realtime'
}, {
  id: 22,
  name: 'React / Redux Examples',
  description: 'A serie of examples to learn the tools based on React and Redux libraries. The examples were used in workshops to teach and learn about the React ecosystem.',
  date: '2017-03-04',
  lang: 'es',
  type: 0,
  weight: 3,
  link: 'https://github.com/vulcan-estudios/react-examples'
}, {
  id: 23,
  name: 'Chrome DevTools',
  description: 'Talk about the Developer Tools (DevTools) of the browser Google Chrome for programmers and designers working with web technologies. Inspect the DOM, track errors, review resources and much more.',
  date: '2017-03-30',
  lang: 'es',
  type: 2,
  weight: 2,
  link: '/charlas/chrome-devtools'
}, {
  id: 24,
  name: 'Asiste',
  description: 'Web platform to manage social and business events. It lets you control users, organizations, their portfolios and conversions in the event. You can also contact them publicly. It is a Progressive Web Application.',
  date: '2017-04-26',
  lang: 'es',
  type: 0,
  weight: 1,
  link: 'http://asiste.com.co'
}, {
  id: 25,
  name: 'BucaramangaJS Website',
  description: 'Official website for the meetup community BucaramangaJS, an intention to share the JavaScript knownledge and expertise with the Bucaramanga community.',
  date: '2017-05-11',
  lang: 'es',
  type: 0,
  weight: 2,
  link: 'http://bucaramangajs.org'
}, {
  id: 26,
  name: 'Katherine Navarro Website',
  description: 'Katherine Navarro\'s personal website with basic information and social media links.',
  date: '2017-05-13',
  lang: 'es',
  type: 0,
  weight: 3,
  link: 'http://katherinenavarro.com'
}];

function App () {
  return (
    <Arwes>
      <Frame content border='down' className='header'>
        <div className='container'>
          <h1>Romel Pérez</h1>
        </div>
      </Frame>
      <div className='container'>
        { data.reverse().map(item => (
          <Frame key={item.id} content corners={2}>
            <a href={item.link}><h3>{item.name}</h3></a>
            <p>{item.description}</p>
          </Frame>
        )) }
      </div>
      <Frame content border='up' className='footer'>
        <div className='container'>
          <p>Copyright 2017 Romel Pérez</p>
        </div>
      </Frame>
    </Arwes>
  );
}

render(<App />, document.querySelector('#app'));
