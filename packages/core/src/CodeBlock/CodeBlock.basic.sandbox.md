```jsx
const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';
const FONT_FAMILY_CODE = '"Source Code Pro", monospace';
const SOUND_TYPING_URL = '/assets/sounds/typing.mp3';
const SOUND_READOUT_URL = '/assets/sounds/readout.mp3';

const audio = { common: { volume: 0.4 } };
const players = {
  typing: { src: [SOUND_TYPING_URL], loop: true },
  readout: { src: [SOUND_READOUT_URL], loop: true }
};
const animatorGeneral = { duration: { enter: 300, exit: 300 } };

const Sandbox = () => {
  const [activate, setActivate] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => setActivate(!activate), 2000);
    return () => clearTimeout(timeout);
  }, [activate]);

  return (
    <ArwesThemeProvider>
      <BleepsProvider audio={audio} players={players}>
        <StylesBaseline styles={{
          'html, body': { fontFamily: FONT_FAMILY_ROOT },
          'code, pre': { fontFamily: FONT_FAMILY_CODE }
        }} />
        <AnimatorGeneralProvider animator={animatorGeneral}>
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
