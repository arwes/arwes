```js
const SOUND_CLICK_URL = '/sounds/click.mp3';
const VOLUME_LOW = 0.1;
const VOLUME_HIGH = 1;

const ButtonComponent = ({ bleeps, children }) => {
  const onClick = () => {
    // It will not come if it is disabled in settings.
    if (bleeps.tap) {
      bleeps.tap.play();
    }
  };
  return <button onClick={onClick}>{children}</button>;
};

const bleepsSettings = {
  tap: {
    player: 'click'
  }
};

const Button = withBleeps(bleepsSettings)(ButtonComponent);

function Sandbox() {
  const [isMounted, setIsMounted] = React.useState(false);
  const [volume, setVolume] = React.useState(VOLUME_HIGH);
  const [disabled, setDisabled] = React.useState(false);
  const [audio, setAudio] = React.useState(() => ({
    common: { volume, disabled }
  }));
  const [players] = React.useState(() => ({
    click: {
      src: [SOUND_CLICK_URL]
    }
  }));

  const onMountChange = () => setIsMounted(!isMounted);
  const onDisableChange = () => setDisabled(!disabled);
  const getIsVolumeHigh = () => audio.common.volume === VOLUME_HIGH;
  const onVolumeChange = () =>
    setVolume(getIsVolumeHigh() ? VOLUME_LOW : VOLUME_HIGH);

  React.useEffect(() => {
    setAudio({ common: { volume, disabled } });
  }, [volume, disabled]);

  return (
    <BleepsProvider audio={audio} players={players}>
      <div>
        <button onClick={onMountChange}>
          {isMounted ? 'Unmount' : 'Mount'}
        </button>
        {' '}
        <button onClick={onVolumeChange}>
          Volume {getIsVolumeHigh() ? 'Down' : 'Up'}
        </button>
        {' '}
        <button onClick={onDisableChange}>
          {disabled ? 'Enable' : 'Disable'}
        </button>
      </div>
      <br />
      {isMounted && (
        <div>
          <Button>Bleep 1!</Button>
          {' '}
          <Button>Bleep 2!</Button>
          {' '}
          <Button>Bleep 3!</Button>
        </div>
      )}
    </BleepsProvider>
  );
}

render(<Sandbox />);
```
