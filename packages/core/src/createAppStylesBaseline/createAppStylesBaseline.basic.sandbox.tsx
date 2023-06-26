import React, { type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { type CSSObject, Global } from '@emotion/react';
import { createAppTheme } from '@arwes/theme';
import { createAppStylesBaseline } from '@arwes/core';

const theme = createAppTheme();
const stylesBaseline = createAppStylesBaseline(theme);

const Sandbox = (): ReactElement => (
  <main style={{ padding: '2rem' }}>
    <Global styles={stylesBaseline as Record<string, CSSObject>} />

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

    <p>
      Lorem ipsum <code>lov sit amet, consectetur</code> adipiscing elit.
    </p>
    <pre>
      Lorem ipsum lov sit amet.{'\n'}
      Lorem ipsum lov sit amet.{'\n'}
      Lorem ipsum lov sit amet.
    </pre>

    <blockquote>
      Lorem ipsum lov sit amet, consectetur adipiscing elit.
    </blockquote>
    <blockquote data-arwes-global-palette='secondary'>
      Lorem ipsum lov sit amet, consectetur adipiscing elit.
    </blockquote>
    <blockquote data-arwes-global-palette='info'>
      Lorem ipsum lov sit amet, consectetur adipiscing elit.
    </blockquote>
    <blockquote data-arwes-global-palette='success'>
      Lorem ipsum lov sit amet, consectetur adipiscing elit.
    </blockquote>
    <blockquote data-arwes-global-palette='warning'>
      Lorem ipsum lov sit amet, consectetur adipiscing elit.
    </blockquote>
    <blockquote data-arwes-global-palette='error'>
      Lorem ipsum lov sit amet, consectetur adipiscing elit.
    </blockquote>

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

    <figure>
      <img src='/assets/images/background-large.jpg' />
      <figcaption>Lorem ipsum lov sit amet.</figcaption>
    </figure>
  </main>
);

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
