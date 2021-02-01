```js
// THIS SANDBOX MODIFIES THE HTML ELEMENTS GLOBAL STYLES.
// IT MAY CONFLICT WITH THE PLAYGROUND APPLICATION STYLES.

const Sandbox = () => {
  return (
    <>
      <StylesBaseline />
      <h1>h1. Lorem ipsum lov sit amet</h1>
      <h2>h2. Lorem ipsum lov sit amet</h2>
      <h3>h3. Lorem ipsum lov sit amet</h3>
      <h4>h4. Lorem ipsum lov sit amet</h4>
      <h5>h5. Lorem ipsum lov sit amet</h5>
      <h6>h6. Lorem ipsum lov sit amet</h6>
      <p>
        Lorem ipsum lov sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat.
      </p>
      <p>
        Lorem ipsum <b>lov sit amet, consectetur</b> adipiscing elit.
      </p>
      <p>
        Lorem ipsum <i>lov sit amet, consectetur</i> adipiscing elit.
      </p>
      <p>
        Lorem ipsum <u>lov sit amet, consectetur</u> adipiscing elit.
      </p>
      <p>
        Lorem ipsum <a href='#'>lov sit amet, consectetur</a> adipiscing elit.
      </p>
    </>
  );
};

render(<Sandbox />);
```
