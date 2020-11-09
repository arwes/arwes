```js
const PlayerComponent = ({ players, audio, name }) => (
  <button onClick={() => !audio.mute && players[name].play()}>
    Play {name}
  </button>
);

const Player = withSounds()(PlayerComponent);

const players = {
  information: new Howl({ src: ['/sounds/information.mp3'] }),
  ask: new Howl({ src: ['/sounds/ask.mp3'] }),
  warning: new Howl({ src: ['/sounds/warning.mp3'] }),
  error: new Howl({ src: ['/sounds/error.mp3'] })
};

function Sandbox () {
  const [mute, setMute] = React.useState(false);

  return (
    <SoundsProvider players={players} audio={{ mute }}>
      <button onClick={() => setMute(!mute)}>
        {mute ? 'Unmute' : 'Mute'}
      </button>
      <br />
      <Player name='information' />
      <Player name='ask' />
      <Player name='warning' />
      <Player name='error' />
    </SoundsProvider>
  );
}

render(<Sandbox />);
```
