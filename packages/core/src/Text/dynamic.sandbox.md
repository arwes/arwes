```js
const SOUND_TYPING_URL = '/assets/sounds/typing.mp3';

const CHILDRENS = [
  '1) Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.',
  '2) Eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  '3) Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
];

function Sandbox () {
  const [audio] = React.useState({
    common: { volume: 0.1 }
  });
  const [players] = React.useState({
    typing: { src: [SOUND_TYPING_URL], loop: true }
  });
  const [duration] = React.useState({ enter: 500, exit: 500 });
  const [childrenIndex, setChildrenIndex] = React.useState(0);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const isLastIndex = childrenIndex === CHILDRENS.length - 1;
      const nextIndex = isLastIndex ? 0 : childrenIndex + 1;
      setChildrenIndex(nextIndex);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [childrenIndex]);

  return (
    <div style={{ color: 'cyan' }}>
      <BleepsProvider audio={audio} players={players}>
        <Text animator={{ duration }}>
          {CHILDRENS[childrenIndex]}
        </Text>
      </BleepsProvider>
    </div>
  );
}

render(<Sandbox />);
```
