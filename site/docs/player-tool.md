# Player Tool

Arwes uses a simple tool that wraps around [Howler](https://howlerjs.com/) to
play audio files. Basically it creates a player with a given configuration.

```javascript
import { createPlayer } from 'arwes';

const player = createPlayer(null, {
  sound: {  // Configuration to pass to howler.Howl class
    src: ['/sound/ringtone.mp3'],
    volume: 0.75
  },
  settings: {  // Custom settings
    oneAtATime: true  // Play only one audio at a time
  }
});

player.play();  // actually plays the audio
```

In this case the audio is only going to be played one time at a time, no matter
how many calls to play it receives.
