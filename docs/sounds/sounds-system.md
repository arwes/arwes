# Sounds System

The Arwes Sounds System is composed by a set of tools which follow the
[Arwes Animation and Sounds Guidelines](../../guidelines/animation-and-sounds.md)
implemented from React components. It goes hand in hand with the [Animation System](../animation/animation-system.md).

## Sounds

- An audible component is a "node".
- An application is a "system". A tree of nodes with one root.
- A sub-system is a branch of the system. Starting from a node as root.
- A sound can be played by a `player` from nodes.
- The `player` behavior can be determined by the `audio` settings received in
the node.
- The `players` and `audio` values can be setup for all system nodes, for nodes
of a certain type, or an specific node.
- If many nodes play the same `player` at the same time, it is responsibility
of the `player` to determine if the sound is played multiple times or only once.

## `SoundsProvider`

The React provider `<SoundsProvider />` can be used to setup the `players` and
`audio` settings in a system.

`players` is an object without defined properties. The idea is that it contains
all sound players using any kind of JavaScript tool as properties.

`audio` is an object without defined properties. They can be defined by the
developer and used by the components however it is required.

```js
// `createPlayer` is a factory of sound players.
// The tool used for this is up to the developer.
<SoundsProvider
    players={{
        click: createPlayer('click.mp3'),
        open: createPlayer('open.mp3'),
        flick: createPlayer('flick.mp3')
    }}
    audio={{
        mute: false
    }}
>
    <App />
</SoundsProvider>
```

## `withSounds`

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

## Sound Tools

A recommended tool to play sounds in the components is [howlerjs](https://howlerjs.com).
But any other player can be used.
