```jsx
const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';

const Sandbox = () => {
  return (
    <ArwesThemeProvider>
      <BleepsProvider audio={{ common: { disabled: true } }}>
        <StylesBaseline
          styles={{ body: { fontFamily: FONT_FAMILY_ROOT } }}
        />
        <Table
          animator={{ animate: false }}
          headers={[
            'Header 1',
            'Header 2',
            'Header 3',
            'Header 4'
          ]}
          dataset={
            Array(10).fill(0).map(() => [
              _generateRandomText(2),
              _generateRandomText(3),
              _generateRandomText(2),
              _generateRandomText(8)
            ])
          }
          columnWidths={['20%', '20%', '20%', '40%']}
        />
      </BleepsProvider>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
