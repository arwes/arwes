```jsx
const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';
const SOUND_READOUT_URL = '/assets/sounds/readout.mp3';

const audioSettings = { common: { volume: 0.25 } };
const playersSettings = { readout: { src: [SOUND_READOUT_URL], loop: true } };
const bleepsSettings = { readout: { player: 'readout' } };
const animatorGeneral = {
  duration: { enter: 200, exit: 200, stagger: 30 }
};
const headers = [
  { id: 'a', data: 'Header 1' },
  { id: 'b', data: 'Header 2' },
  { id: 'c', data: 'Header 3' },
  { id: 'd', data: 'Header 4' }
];
const dataset = Array(10).fill(0).map((_, index) => ({
  id: index,
  columns: [
    { id: 'p', data: _generateRandomText(2) },
    { id: 'q', data: _generateRandomText(3) },
    { id: 'r', data: _generateRandomText(2) },
    { id: 's', data: _generateRandomText(8) }
  ]
}));
const columnWidths = ['20%', '20%', '20%', '40%'];

const Sandbox = () => {
  const [activate, setActivate] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => setActivate(!activate), 2000);
    return () => clearTimeout(timeout);
  }, [activate]);

  return (
    <ArwesThemeProvider>
      <BleepsProvider
        audioSettings={audioSettings}
        playersSettings={playersSettings}
        bleepsSettings={bleepsSettings}
      >
        <StylesBaseline styles={{
          body: { fontFamily: FONT_FAMILY_ROOT }
        }} />
        <AnimatorGeneralProvider animator={animatorGeneral}>
          <Table
            animator={{ activate }}
            headers={headers}
            dataset={dataset}
            columnWidths={columnWidths}
          />
        </AnimatorGeneralProvider>
      </BleepsProvider>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
