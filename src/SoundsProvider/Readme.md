Sounds provider process the sounds to play and rain them down to the child
components with the HOC `withSounds` so they may use them. The sounds are optinal
so if a component uses a particular sound, it should check if it has value first.

More sounds can be configured with `createSounds` tool and passed to the provider
so any child component can use them.
