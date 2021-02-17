```jsx
const SOUND_TYPING_URL = '/assets/sounds/typing.mp3';
const SOUND_READOUT_URL = '/assets/sounds/readout.mp3';

const rootFontFamily = '"Titillium Web", sans-serif';
const codeFontFamily = '"Source Code Pro", monospace';
const players = {
  typing: { src: [SOUND_TYPING_URL], loop: true },
  readout: { src: [SOUND_READOUT_URL], loop: true }
};

const Sandbox = () => {
  const [activate, setActivate] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => setActivate(!activate), 2000);
    return () => clearTimeout(timeout);
  }, [activate]);

  return (
    <ArwesThemeProvider>
      <BleepsProvider players={players}>
        <StylesBaseline styles={{
          'html, body': { fontFamily: rootFontFamily },
          'code, pre': { fontFamily: codeFontFamily }
        }} />
        <AnimatorGeneralProvider
          animator={{ duration: { enter: 300, exit: 300 } }}
        >
          <CodeBlock animator={{ activate }} lang='tsx'>
            {`const startCodeBlockAnimation = (
  animator: AnimatorRef,
  ref: RootRef,
  theme: ArwesTheme
): void => {
  stopCodeBlockAnimation(animator, ref);

  const { duration, flow } = animator;
  const isEntering = flow.entering || flow.entered;
  const { palette } = theme;

  const root = ref.current;
  const lines = root.querySelectorAll('.arwes-code-block__line');

  anime({
    targets: root,
    duration: isEntering ? duration.enter : duration.exit,
    easing: isEntering ? 'easeOutSine' : 'easeInSine',
    backgroundColor: isEntering
      ? rgba(palette.primary.light2, 0.05)
      : 'rgba(0,0,0,0)'
  });

  anime({
    targets: lines,
    duration: isEntering ? duration.enter : duration.exit,
    easing: isEntering ? 'easeOutSine' : 'easeInSine',
    width: isEntering ? [0, '100%'] : ['100%', 0]
  });
};`}
          </CodeBlock>
        </AnimatorGeneralProvider>
      </BleepsProvider>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
