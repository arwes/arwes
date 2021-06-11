```jsx
const SOUND_ASSEMBLE_URL = '/assets/sounds/assemble.mp3';

const animatorGeneral = { duration: { enter: 200, exit: 200 } };
const audioSettings = { common: { volume: 0.25 } };
const playersSettings = { assemble: { src: [SOUND_ASSEMBLE_URL], loop: true } };
const bleepsSettings = { assemble: { player: 'assemble' } };

const Sandbox = () => {
  const [activate, setActivate] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => setActivate(!activate), 2000);
    return () => clearTimeout(timeout);
  }, [activate]);

  return (
    <ArwesThemeProvider>
      <BleepsProvider
        audioSettings={audioSettings}
        playersSettings={playersSettings}
        bleepsSettings={bleepsSettings}
      >
        <StylesBaseline />
        <AnimatorGeneralProvider animator={animatorGeneral}>
          <Animator animator={{ activate }}>
            <FrameSVG
              hover
              shapes={[
                [
                  [10, 10],
                  [10, '100% - 10'],
                  ['100% - 10', '100% - 10'],
                  ['100% - 10', 10]
                ]
              ]}
              polylines={[
                [
                  [0, 0],
                  ['100%', 0]
                ],
                [
                  ['100%', '100%'],
                  [0, '100%']
                ]
              ]}
            >
              <div style={{ width: 200, height: 200 }} />
            </FrameSVG>
          </Animator>
        </AnimatorGeneralProvider>
      </BleepsProvider>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
