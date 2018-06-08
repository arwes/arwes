```javascript
// import { SoundsProvider, createSounds } from 'arwes';

const Player = withSounds()(props => (
    <button
        style={{ margin: 10 }}
        onClick={() => props.sounds[props.id].play()}
    >
        Play {props.id}
    </button>
));

const sounds = {
    shared: { volume: 1 },
    players: {
        information: { sound: { src: ['/static/sound/information.mp3'] } },
        ask: { sound: { src: ['/static/sound/ask.mp3'] } },
        warning: { sound: { src: ['/static/sound/warning.mp3'] } },
        error: { sound: { src: ['/static/sound/error.mp3'] } },
    },
};

render(
    <SoundsProvider sounds={createSounds(sounds)}>
        <div>
            <Player id='information' />
            <Player id='ask' />
            <Player id='warning' />
            <Player id='error' />
        </div>
    </SoundsProvider>
);
```
