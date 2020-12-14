A component can be converted in a node using the High Order Component (HOC)
`withSounds`.

The HOC accepts `players` and `audio` settings to customize all nodes created
of this type.

The component can be provided with the same props.

And the component will receive the `players` and `audio` objects as props. Their
values will be the result of merging the props provided to the component in order
of `<SoundsProvider />`, `withSounds`, and the component itself.

```js
const MyComponent = ({ players, audio }) => (
    <button
        onClick={() => {
            if (players.click && !audio.mute) {
                players.click.play();
            }
        }}
    >
        Play me!
    </button>
);

const settings = {
    players: {
        click: createPlayer('click.ogg')
    },
    audio: {
        mute: true
    }
};
const MyNode = withSounds(settings)(MyComponent);

<MyNode
    players={{
        click: createPlayer('click.wav')
    }}
    audio={{
        mute: false
    }}
/>
```
