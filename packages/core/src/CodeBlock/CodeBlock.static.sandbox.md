```jsx
const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';
const FONT_FAMILY_CODE = '"Source Code Pro", monospace';

const Sandbox = () => {
  return (
    <ArwesThemeProvider>
      <StylesBaseline styles={{
        'html, body': { fontFamily: FONT_FAMILY_ROOT },
        'code, pre': { fontFamily: FONT_FAMILY_CODE }
      }} />
      <CodeBlock animator={{ animate: false }} lang='jsx'>
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
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
