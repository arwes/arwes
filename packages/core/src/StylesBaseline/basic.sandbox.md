```js
// THIS SANDBOX MODIFIES THE HTML ELEMENTS GLOBAL STYLES.
// IT MAY CONFLICT WITH THE PLAYGROUND APPLICATION STYLES.

const IMAGE_URL = '/assets/images/wallpaper.jpg';

const rootFontFamily = '"Titillium Web", sans-serif';
const codeFontFamily = '"Source Code Pro", monospace';

const fontScale = 1; // Default
const space = 5; // Default
const outline = 1; // Default
const shadow = { blur: 1, spread: 1 }; // Default

render(
  <ArwesThemeProvider themeSettings={{ fontScale, space, outline, shadow }}>
    <StylesBaseline styles={{
      'html, body': { fontFamily: rootFontFamily },
      'code, pre': { fontFamily: codeFontFamily }
    }} />

    <h1>h1. Lorem ipsum lov sit amet</h1>
    <h2>h2. Lorem ipsum lov sit amet</h2>
    <h3>h3. Lorem ipsum lov sit amet</h3>
    <h4>h4. Lorem ipsum lov sit amet</h4>
    <h5>h5. Lorem ipsum lov sit amet</h5>
    <h6>h6. Lorem ipsum lov sit amet</h6>
    <hr />
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
      Lorem ipsum <small>lov sit amet, consectetur</small> adipiscing elit.
    </p>
    <p>
      Lorem ipsum <sup>lov sit</sup> amet, <sub>consectetur</sub> adipiscing elit.
    </p>
    <p>
      Lorem ipsum <a href='#'>lov sit amet, consectetur</a> adipiscing elit.
    </p>

    <blockquote>
      Lorem ipsum lov sit amet, consectetur adipiscing elit, sed
      do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
      nisi ut aliquip ex ea commodo consequat.
    </blockquote>

    <p>
      Lorem ipsum <code>lov sit amet, consectetur</code> adipiscing elit.
    </p>
    <pre>
      Lorem ipsum lov sit amet.{'\n'}
      Lorem ipsum lov sit amet.{'\n'}
      Lorem ipsum lov sit amet.
    </pre>

    <ul>
      <li>Lorem ipsum lov sit amet.</li>
      <li>
        Lorem ipsum lov sit amet.
        <ul>
          <li>Lorem ipsum lov sit amet.</li>
          <li>Lorem ipsum lov sit amet.</li>
          <li>Lorem ipsum lov sit amet.</li>
        </ul>
      </li>
      <li>Lorem ipsum lov sit amet.</li>
    </ul>
    <ol>
      <li>Lorem ipsum lov sit amet.</li>
      <li>
        Lorem ipsum lov sit amet.
        <ol>
          <li>Lorem ipsum lov sit amet.</li>
          <li>Lorem ipsum lov sit amet.</li>
          <li>Lorem ipsum lov sit amet.</li>
        </ol>
      </li>
      <li>Lorem ipsum lov sit amet.</li>
    </ol>

    <table>
      <thead>
        <tr>
          <th>Lorem ipsum</th>
          <th>Lov sit</th>
          <th>Amet, consectetur</th>
          <th>Adipiscing elit</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Lorem ipsum</td>
          <td>Lov sit</td>
          <td>Amet, consectetur</td>
          <td>Adipiscing elit</td>
        </tr>
        <tr>
          <td>Lorem ipsum</td>
          <td>Lov sit</td>
          <td>Amet, consectetur</td>
          <td>Adipiscing elit</td>
        </tr>
        <tr>
          <td>Lorem ipsum</td>
          <td>Lov sit</td>
          <td>Amet, consectetur</td>
          <td>Adipiscing elit</td>
        </tr>
      </tbody>
    </table>

    <img src={IMAGE_URL} alt='Image' />
    <figure>
      <img src={IMAGE_URL} alt='Image' />
      <figcaption>Lorem ipsum lov sit amet.</figcaption>
    </figure>

    <form action="#">
      <fieldset>
        <legend>Information</legend>
        <div>
          <label>Form label</label>
        </div>
        <div>
          <input placeholder='Form Input' />
          <br />
          <input placeholder='Disabled Form Input' disabled />
        </div>
        <br />
        <div>
          <textarea placeholder='Form Textarea' />
          <br />
          <textarea placeholder='Disabled Form Textarea' disabled />
        </div>
        <br />
        <div>
          <select>
            <option>Form Select</option>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
          <br />
          <select disabled>
            <option>Disabled Form Select</option>
            <option>Disabled Option 1</option>
            <option>Disabled Option 2</option>
            <option>Disabled Option 3</option>
          </select>
        </div>
        <br />
        <div>
          <button>Button</button>
          {' '}
          <button disabled>Disabled Button</button>
        </div>
      </fieldset>
    </form>
  </ArwesThemeProvider>
);
```
