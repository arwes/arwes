import howler from 'howler';

import makeCreatePlayer from './makeCreatePlayer';

const createPlayer = makeCreatePlayer({ Howl: howler.Howl });

export default createPlayer;
