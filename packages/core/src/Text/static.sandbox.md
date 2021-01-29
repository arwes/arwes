```js
function Sandbox () {
  return (
    <div style={{ color: 'cyan' }}>
      <BleepsProvider audio={{ common: { disabled: true } }}>
        <Text animator={{ animate: false }}>
          Lorem ipsum dolor sit amet, <b>consectetur adipiscing</b> elit,
          sed do eiusmod tempor <i>incididunt <b>ut labore et dolore
          magna</b> aliqua</i>. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco <a href='#'>laboris nisi ut aliquip</a>
          ex ea commodo consequat.
        </Text>
      </BleepsProvider>
    </div>
  );
}

render(<Sandbox />);
```
