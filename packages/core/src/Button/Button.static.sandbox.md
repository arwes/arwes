```jsx
const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';

const Sandbox = () => {
  return (
    <ArwesThemeProvider>
      <BleepsProvider audio={{ common: { disabled: true } }}>
        <StylesBaseline styles={{
          body: { fontFamily: FONT_FAMILY_ROOT }
        }} />
        <Button
          animator={{ animate: false }}
          onClick={event => console.log(event)}
        >
          <Text>Download Content</Text>
        </Button>
      </BleepsProvider>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
