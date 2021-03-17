```jsx
const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';
const FONT_FAMILY_CODE = '"Source Code Pro", monospace';
const IMAGE_URL = '/assets/images/wallpaper-large.jpg';

// Theme with default settings.
let themeSettings = {};

// The theme can receive configurations for the palette,
// the scales, spacing, outlines, shadows, and more.
// <<UNCOMMENT THE FOLLOWING CODE TO TEST THEME SETTINGS.>>
/*
const palette = {
  primary: { main: '#40ffce' },
  secondary: { main: '#c466dc' },
  neutral: { main: '#001711' },
  text: {
    root: '#35efaa',
    headings: '#40ffce',
    link: '#c466dc',
    linkHover: '#d491fa'
  }
};
const fontScale = 1.5;
const space = 8;
const outline = 2;
const shadow = { blur: 2 };
themeSettings = { palette, fontScale, space, outline, shadow };
*/

render(
  <ArwesThemeProvider themeSettings={themeSettings}>
    <StylesBaseline styles={{
      'html, body': { fontFamily: FONT_FAMILY_ROOT },
      'code, pre': { fontFamily: FONT_FAMILY_CODE }
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
  </ArwesThemeProvider>
);
```
