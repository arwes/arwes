```jsx
const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';

const textFieldTypes = ['text', 'email', 'search', 'password', 'tel', 'url', 'number'];

const Sandbox = () => {
  return (
    <ArwesThemeProvider>
      <StylesBaseline styles={{
        body: { fontFamily: FONT_FAMILY_ROOT }
      }} />
      <Animator animator={{ animate: false }}>
        <form>
          {textFieldTypes.map((type, index) =>
            <TextField
              key={index}
              type={type}
              placeholder={`Text field ${type}`}
              defaultValue=''
              palette='primary'
              style={{ marginBottom: 20 }}
            />
          )}
        </form>
      </Animator>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
