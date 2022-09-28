```jsx
const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';
const SOUND_TYPE_URL = '/assets/sounds/type.mp3';

const childrenList = [
  '1) Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.',
  '2) Eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  '3) Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
];
const audioSettings = { common: { volume: 0.25 } };
const playersSettings = { type: { src: [SOUND_TYPE_URL], loop: true } };
const bleepsSettings = { type: { player: 'type' } };
const duration = { enter: 1000, exit: 1000 };

function Sandbox () {
  const [childrenIndex, setChildrenIndex] = React.useState(0);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const isLastIndex = childrenIndex === childrenList.length - 1;
      const nextIndex = isLastIndex ? 0 : childrenIndex + 1;
      setChildrenIndex(nextIndex);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [childrenIndex]);

  return (
    <ArwesThemeProvider>
      <StylesBaseline styles={{
        body: { fontFamily: FONT_FAMILY_ROOT }
      }} />
      <BleepsProvider
        audioSettings={audioSettings}
        playersSettings={playersSettings}
        bleepsSettings={bleepsSettings}
      >
        <Text as='h1' animator={{ duration }}>
          {childrenList[childrenIndex]}
        </Text>
      </BleepsProvider>
    </ArwesThemeProvider>
  );
}

render(<Sandbox />);
```
