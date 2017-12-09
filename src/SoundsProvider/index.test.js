import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SoundsProvider from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('SoundsProvider', function () {

  it('Should be able to create a sounds provider', function () {
    const sounds = { shared: {}, players: { click: {} } };
    class Howl {}
    const createPlayer = () => new Howl();

    class MyComp extends React.Component {
      static contextTypes = {
        sounds: PropTypes.object
      }
      render () {
        expect(this.context.sounds).
          to.have.property('click').
          to.be.an.instanceof(Howl);
        return <div />;
      }
    }

    mount(
      <SoundsProvider
        sounds={sounds}
        createPlayer={createPlayer}
      >
        <MyComp />
      </SoundsProvider>
    );
  });

  it('Should be able to define players with shared config', function () {
    const sounds = {
      shared: { volume: 0.75 },
      players: { click: { sound: { loop: true } } }
    };
    class Howl {
      constructor (config) {
        this.config = config;
      }
    }
    const createPlayer = (deps, config) => new Howl(config.sound);

    class MyComp extends React.Component {
      static contextTypes = {
        sounds: PropTypes.object
      }
      render () {
        expect(this.context.sounds.click.config).to.eql({
          volume: 0.75,
          loop: true
        });
        return <div />;
      }
    }

    mount(
      <SoundsProvider
        sounds={sounds}
        createPlayer={createPlayer}
      >
        <MyComp />
      </SoundsProvider>
    );
  });

});
