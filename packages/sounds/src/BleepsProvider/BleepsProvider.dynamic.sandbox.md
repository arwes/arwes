```jsx
const SOUND_CLICK_URL = '/assets/sounds/click.mp3';
const VOLUME_LOW = 0.1;
const VOLUME_HIGH = 1;

const Button = ({ children }) => {
  const bleeps = useBleeps();
  const onClick = () => {
    // A bleep will not come if it is disabled in settings.
    if (bleeps.tap) {
      bleeps.tap.play();
    }
  };
  return <button onClick={onClick}>{children}</button>;
};

// Since the players and bleeps settings are not updated,
// they are set outside of the function scope
// so they are constant.
const playersSettings = {
  click: {
    src: [SOUND_CLICK_URL]
  }
};
const bleepsSettings = {
  tap: {
    player: 'click'
  }
};

function Sandbox () {
  const [volume, setVolume] = React.useState(VOLUME_HIGH);
  const [disabled, setDisabled] = React.useState(false);
  const [audioSettings, setAudioSettings] = React.useState(() => ({
    common: { volume, disabled }
  }));

  const onDisableChange = () => {
    setDisabled(!disabled);
  };
  const getIsVolumeHigh = () => {
    return audioSettings.common.volume === VOLUME_HIGH;
  };
  const onVolumeChange = () => {
    setVolume(getIsVolumeHigh() ? VOLUME_LOW : VOLUME_HIGH);
  };

  React.useEffect(() => {
    setAudioSettings({ common: { volume, disabled } });
  }, [volume, disabled]);

  return (
    <BleepsProvider
      audioSettings={audioSettings}
      playersSettings={playersSettings}
      bleepsSettings={bleepsSettings}
    >
      <div>
        <button onClick={onVolumeChange}>
          Volume {getIsVolumeHigh() ? 'Down' : 'Up'}
        </button>
        {' '}
        <button onClick={onDisableChange}>
          {disabled ? 'Enable' : 'Disable'}
        </button>
      </div>
      <br />
      <div>
        <Button>Bleep 1!</Button>
        {' '}
        <Button>Bleep 2!</Button>
        {' '}
        <Button>Bleep 3!</Button>
      </div>
    </BleepsProvider>
  );
}

render(<Sandbox />);
```
