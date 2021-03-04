```jsx
const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';

const headers = [
  { id: 'z', data: 'Header 1' },
  { id: 'y', data: 'Header 2' },
  { id: 'x', data: 'Header 3' },
  { id: 'w', data: 'Header 4' },
  { id: 'v', data: 'Header 5' }
];
const dataset = Array(10).fill(0).map((_, index) => ({
  id: index,
  columns: [
    { id: 'a', data: _generateRandomText(2) },
    { id: 'b', data: _generateRandomText(2) },
    { id: 'c', data: _generateRandomText(2) },
    { id: 'd', data: _generateRandomText(2) },
    { id: 'e', data: _generateRandomText(2) }
  ]
}));

const Sandbox = () => {
  return (
    <ArwesThemeProvider>
      <BleepsProvider audio={{ common: { disabled: true } }}>
        <StylesBaseline
          styles={{ body: { fontFamily: FONT_FAMILY_ROOT } }}
        />
        <Table
          animator={{ animate: false }}
          headers={headers}
          dataset={dataset}
        />
      </BleepsProvider>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
