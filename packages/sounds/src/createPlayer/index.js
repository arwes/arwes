import { Howl } from 'howler/dist/howler.core.min.js';

import makeCreatePlayer from './makeCreatePlayer';

const createPlayer = makeCreatePlayer({ Howl });

export default createPlayer;
