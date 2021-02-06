```jsx
const SOUND_READOUT_URL = '/assets/sounds/readout.mp3';

const fontFamily = '"Titillium Web", sans-serif';
const players = {
  readout: { src: [SOUND_READOUT_URL], loop: true }
};

const Sandbox = () => {
  return (
    <ArwesThemeProvider>
      <BleepsProvider players={players}>
        <StylesBaseline styles={{ body: { fontFamily } }} />
        <Table
          headers={
            Array(5).fill(0).map(() => 'Header Value')
          }
          dataset={
            Array(10).fill(0).map(() =>
              Array(5).fill(0).map(() => 'Cell Value')
            )
          }
        />
      </BleepsProvider>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
