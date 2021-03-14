```jsx
const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';

const headers = [
  { id: 'a', data: 'Header 1' },
  { id: 'b', data: 'Header 2' },
  { id: 'c', data: 'Header 3' },
  { id: 'd', data: 'Header 4' },
  { id: 'e', data: 'Header 5' }
];
const dataset = Array(10).fill(0).map((_, index) => ({
  id: index,
  columns: [
    { id: 'p', data: _generateRandomText(2) },
    { id: 'q', data: _generateRandomText(2) },
    { id: 'r', data: _generateRandomText(2) },
    { id: 's', data: _generateRandomText(2) },
    { id: 't', data: _generateRandomText(2) }
  ]
}));

const Sandbox = () => {
  return (
    <ArwesThemeProvider>
      <StylesBaseline
        styles={{ body: { fontFamily: FONT_FAMILY_ROOT } }}
      />
      <Table
        animator={{ animate: false }}
        headers={headers}
        dataset={dataset}
      />
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
