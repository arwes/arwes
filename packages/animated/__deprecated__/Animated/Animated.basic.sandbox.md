```jsx
const duration = { enter: 200, exit: 200 };

const Sandbox = () => {
  const [activate, setActivate] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => setActivate(!activate), 2000);
    return () => clearTimeout(timeout);
  }, [activate]);

  return (
    <Animator animator={{ activate, duration }}>
      <Animated
        as='div'
        style={{
          width: 300,
          height: 50,
          backgroundColor: 'cyan'
        }}
        animated={{
          initialStyles: { opacity: 0, width: 0 },
          entering: { opacity: 1, width: 300 },
          exiting: { opacity: 0, width: 0 }
        }}
      />
    </Animator>
  );
};

render(<Sandbox />);
```
