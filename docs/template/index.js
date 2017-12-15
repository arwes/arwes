import React from 'react';

import ThemeProvider from '../../src/ThemeProvider';
import createTheme from '../../src/tools/createTheme';
import SoundsProvider from '../../src/SoundsProvider';
import createSounds from '../../src/tools/createSounds';

const resources = {
  bg: {
    small: '/static/img/background.jpg',
    medium: '/static/img/background-medium.jpg',
    large: '/static/img/background-large.jpg',
    xlarge: '/static/img/background-large.jpg'
  },
  pattern: '/static/img/glow.png',
};

const sounds = {
  shared: {
    volume: 0.5,
  },
  players: {
    click: {
      sound: { src: ['/static/sound/click.mp3'] },
      settings: { oneAtATime: true }
    },
    typing: {
      sound: { src: ['/static/sound/typing.mp3'] },
      settings: { oneAtATime: true }
    },
    deploy: {
      sound: { src: ['/static/sound/deploy.mp3'] },
      settings: { oneAtATime: true }
    },
  }
};

class Wrapper extends React.Component {

  componentDidMount () {
    this.removeServerStyles();
    this.setGA();
  }

  render () {
    return this.props.children;
  }

  removeServerStyles () {
    const pagesStyles = document.querySelector('#pages-styles');
    if (pagesStyles) pagesStyles.remove();
  }

  setGA () {
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=UA-50433259-2';
    document.body.appendChild(gaScript);

    const gaBody = document.createElement('script');
    gaBody.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag () {dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-50433259-2');
    `;
    document.body.appendChild(gaBody);
  }
}

export default (App) => {
  return () => (
    <ThemeProvider theme={createTheme()}>
      <SoundsProvider sounds={createSounds(sounds)}>
        <Wrapper>
          <App resources={resources} />
        </Wrapper>
      </SoundsProvider>
    </ThemeProvider>
  );
};
