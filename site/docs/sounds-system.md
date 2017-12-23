# Sounds System

Arwes uses a [HOC](https://reactjs.org/docs/higher-order-components.html)
to provide sounds to the components. This provider should be at the root of the
application and receives the sounds settings. Some components play specific
provided sounds when provided and you can create your own components to play
your own sounds.

The library [Howler](https://howlerjs.com/) is used to do the real playing. The
provider takes configuration for the sounds and behind the scenes Howler plays
them.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme,
  SoundsProvider, createSounds, Button } from 'arwes';

const mySounds = {
  shared: { volume: 1, },  // Shared sound settings
  players: {  // The player settings
    click: {  // With the name the player is created
      sound: { src: ['/sound/click.mp3'] }  // The settings to pass to Howler
    },
    typing: {
      sound: { src: ['/sound/typing.mp3'] },
      settings: { oneAtATime: true }  // The custom app settings
    },
    deploy: {
      sound: { src: ['/sound/deploy.mp3'] },
      settings: { oneAtATime: true }
    },
  }
};

const App = () => (
  <ThemeProvider theme={createTheme()}>
    <SoundsProvider sounds={createSounds(mySounds)}>
      <Button animate>Click me</Button>
    </SoundsProvider>
  </ThemeProvider>
);

ReactDOM.render(<App />, document.querySelector('#root'));
```

The `<Button />` component plays the `click` sound when provided. It uses
the component `<Frame />` which uses the `deploy` sound when component is
animated and sound is provided. The `typing` sound is used by the component
`<Words />` when characters are being animated and rendered.

In each player provided, the `sound` object are the settings to pass to Howler.
Read [Howler docs](https://howlerjs.com/) for more details.

## Play Sounds

You can create your own plays with your own components. You can use the
`withSounds` HOC to get and play the provided sounds.

Suppose you want to play an alert sound when you click on a button:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme,
  SoundsProvider, createSounds, withSounds, Button } from 'arwes';

const mySounds = {
  players: {
    alert: {
      sound: { src: ['/sound/alert.mp3'] }
    },
  }
};

const MyButton = withSounds()(props => (
  <Button
    onClick={props.sounds.alert.play()}
    {...props}
  />
));

const App = () => (
  <ThemeProvider theme={createTheme()}>
    <SoundsProvider sounds={createSounds(mySounds)}>
      <MyButton animate>Alert!</MyButton>
    </SoundsProvider>
  </ThemeProvider>
);
```

When you click on the button you are gonna hear the alert sound played.
