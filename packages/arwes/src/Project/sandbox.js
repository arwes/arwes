import React from 'react';
import Arwes from '../Arwes';
import Words from '../Words';
import Project from './index';

export default () => (
  <Arwes background="/img/background.jpg" pattern="/img/glow.png">
    <div style={{ padding: 20 }}>
      <Project animate header="PROJECT, OFFICIA DESERUNT ANIM ID EST LABORUM">
        {anim => (
          <p>
            <Words animate show={anim.entered}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis laboris nisi ut aliquip ex. Duis aute
              irure. Consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud.
            </Words>
          </p>
        )}
      </Project>
    </div>
  </Arwes>
);
