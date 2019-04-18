/* eslint-env jest */

import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SoundsProvider from './SoundsProvider';

Enzyme.configure({ adapter: new Adapter() });

describe('SoundsProvider', () => {
  test('Should render children as they come', () => {
    const sounds = { shared: {}, players: {} };
    const createPlayer = () => null;
    const el = mount(
      <SoundsProvider sounds={sounds} createPlayer={createPlayer}>
        <div>Component Children</div>
      </SoundsProvider>
    );

    const actual = el.html();
    const expected = '<div>Component Children</div>';
    expect(actual).toBe(expected);
  });

  test('Should be able to create a sounds provider', () => {
    const sounds = { shared: {}, players: { click: {} } };
    class Howl {}
    const createPlayer = () => new Howl();

    class MyComp extends React.Component {
      static contextTypes = {
        sounds: PropTypes.object
      };
      render () {
        expect(this.context.sounds.click).toBeTruthy();
        expect(this.context.sounds.click instanceof Howl).toBeTruthy();
        return <div />;
      }
    }

    mount(
      <SoundsProvider sounds={sounds} createPlayer={createPlayer}>
        <MyComp />
      </SoundsProvider>
    );
  });

  test('Should be able to define players with shared config', () => {
    const sounds = {
      shared: { volume: 0.75 },
      players: { click: { sound: { loop: true } } }
    };
    class Howl {
      constructor (config) {
        this.config = config;
      }
    }
    const createPlayer = config => new Howl(config.sound);

    class MyComp extends React.Component {
      static contextTypes = {
        sounds: PropTypes.object
      };
      render () {
        expect(this.context.sounds.click.config).toEqual({
          volume: 0.75,
          loop: true
        });
        return <div />;
      }
    }

    mount(
      <SoundsProvider sounds={sounds} createPlayer={createPlayer}>
        <MyComp />
      </SoundsProvider>
    );
  });
});
