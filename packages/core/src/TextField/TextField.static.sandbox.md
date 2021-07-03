```jsx
const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';

const Sandbox = () => {
  return (
    <ArwesThemeProvider>
      <StylesBaseline styles={{
        body: { fontFamily: FONT_FAMILY_ROOT },
        '.arwes-text-field': { marginBottom: 20 }
      }} />
      <Animator animator={{ animate: false }}>
        <form>
          <TextField
            placeholder='Text field placeholder'
            defaultValue=''
          />

          <TextField
            multiline
            placeholder='Text field placeholder'
            defaultValue=''
          />

          <TextField
            placeholder={[
              'A nebula is an interstellar cloud of dust, hydrogen, helium and',
              'other ionized gases. Originally, the term was used to describe',
              'any diffused astronomical object, including galaxies beyond the',
              'Milky Way.',
            ].join(' ')}
            defaultValue={[
              'A nebula is an interstellar cloud of dust, hydrogen, helium and',
              'other ionized gases. Originally, the term was used to describe',
              'any diffused astronomical object, including galaxies beyond the',
              'Milky Way.',
            ].join(' ')}
          />

          <TextField
            multiline
            placeholder={[
              'A nebula is an interstellar cloud of dust, hydrogen, helium and',
              'other ionized gases. Originally, the term was used to describe',
              'any diffused astronomical object, including galaxies beyond the',
              'Milky Way.',
            ].join(' ')}
            defaultValue={[
              'A nebula is an interstellar cloud of dust, hydrogen, helium and',
              'other ionized gases. Originally, the term was used to describe',
              'any diffused astronomical object, including galaxies beyond the',
              'Milky Way.',
            ].join(' ')}
          />

          <TextField
            placeholder='ReadOnly text field placeholder'
            defaultValue='ReadOnly text field value'
            readOnly
          />

          <TextField
            placeholder='Disabled text field placeholder'
            defaultValue='Disabled text field value'
            disabled
          />

          <TextField
            placeholder='AutoFocus text field placeholder'
            defaultValue='AutoFocus text field value'
            autoFocus
          />

          <TextField
            placeholder='Palette text field placeholder'
            defaultValue='Palette text field value'
            palette='secondary'
          />
        </form>
      </Animator>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
