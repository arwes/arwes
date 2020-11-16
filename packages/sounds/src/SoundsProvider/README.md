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

The providers can be stacked and their props will be merged.
