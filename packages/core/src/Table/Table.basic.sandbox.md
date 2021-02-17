```jsx
const SOUND_READOUT_URL = '/assets/sounds/readout.mp3';

const fontFamily = '"Titillium Web", sans-serif';
const players = {
  readout: { src: [SOUND_READOUT_URL], loop: true }
};
const headers = ['Header 1', 'Header 2', 'Header 3', 'Header 4'];
const dataset = Array(10).fill(0).map(() => [
  _generateRandomText(2),
  _generateRandomText(3),
  _generateRandomText(2),
  _generateRandomText(8)
]);
const columnWidths = ['20%', '20%', '20%', '40%'];

const Sandbox = () => {
  const [activate, setActivate] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => setActivate(!activate), 2000);
    return () => clearTimeout(timeout);
  }, [activate]);

  return (
    <ArwesThemeProvider>
      <BleepsProvider players={players}>
        <StylesBaseline styles={{ body: { fontFamily } }} />
        <Table
          animator={{ activate }}
          headers={headers}
          dataset={dataset}
          columnWidths={columnWidths}
        />
      </BleepsProvider>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
