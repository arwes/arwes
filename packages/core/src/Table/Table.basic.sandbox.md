```jsx
const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';
const SOUND_READOUT_URL = '/assets/sounds/readout.mp3';

const audio = { common: { volume: 0.4 } };
const players = {
  readout: { src: [SOUND_READOUT_URL], loop: true }
};
const animatorGeneral = {
  duration: { enter: 200, exit: 200, stagger: 30 }
};
const headers = [
  { id: 'z', data: 'Header 1' },
  { id: 'y', data: 'Header 2' },
  { id: 'x', data: 'Header 3' },
  { id: 'w', data: 'Header 4' }
];
const dataset = Array(10).fill(0).map((_, index) => ({
  id: index,
  columns: [
    { id: 'a', data: _generateRandomText(2) },
    { id: 'b', data: _generateRandomText(3) },
    { id: 'c', data: _generateRandomText(2) },
    { id: 'd', data: _generateRandomText(8) }
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
      <BleepsProvider audio={audio} players={players}>
        <StylesBaseline
          styles={{ body: { fontFamily: FONT_FAMILY_ROOT } }}
        />
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
