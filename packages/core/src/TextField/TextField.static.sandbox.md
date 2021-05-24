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
            <div key={index} style={{ marginBottom: 20 }}>
              <Text as='label' style={{ marginBottom: 10 }}>
                Text field {type}
              </Text>
              <TextField
                type={type}
                placeholder={`Text field ${type}`}
                defaultValue=''
                palette='primary'
              />
            </div>
          )}
        </form>
      </Animator>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
