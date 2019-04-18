/* eslint-env jest */

import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as redux from 'redux';
import * as reactRedux from 'react-redux';

import withSounds from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('withSounds()', () => {
  test('Should return a function', () => {
    const actual = withSounds();
    expect(typeof actual).toBe('function');
  });

  test('Should set final component displayName', () => {
    class MyComp {
      displayName = 'MyComp';
      render () {
        return <div />;
      }
    }
    const actual = withSounds()(MyComp);
    expect(actual.displayName).toBe('Sounds(MyComp)');
  });

  test('Should create a component with sounds by provider', () => {
    const render = jest.fn();
    const sounds = { a: 1, b: 2 };
    class Provider extends React.Component {
      static childContextTypes = {
        sounds: PropTypes.object
      };
      getChildContext () {
        return { sounds };
      }
      render () {
        return this.props.children; // eslint-disable-line react/prop-types
      }
    }
    const MyComp = props => {
      expect(props.sounds).toBe(sounds); // eslint-disable-line react/prop-types
      render();
      return <div />;
    };
    const MyCompWithSounds = withSounds()(MyComp);

    mount(
      <Provider>
        <MyCompWithSounds />
      </Provider>
    );
    expect(render).toHaveBeenCalled();
  });

  test('Should create a component without default sounds', () => {
    const sounds = { a: 1, b: 2 };
    class Provider extends React.Component {
      static childContextTypes = {
        sounds: PropTypes.object
      };
      getChildContext () {
        return { sounds };
      }
      render () {
        return this.props.children; // eslint-disable-line react/prop-types
      }
    }
    const MyComp = props => {
      expect(props.sounds).toBe(sounds); // eslint-disable-line react/prop-types
      return <div />;
    };
    MyComp.defaultProps = {
      sounds: { c: 3, d: 4 }
    };
    const MyCompWithSounds = withSounds()(MyComp);

    mount(
      <Provider>
        <MyCompWithSounds />
      </Provider>
    );
  });

  test('Should work properly with another HOC (react-redux)', () => {
    const state = 100;
    const reducer = () => state;
    const store = redux.createStore(reducer);

    const sounds = { a: 1, b: 2 };
    class SoundsProvider extends React.Component {
      static childContextTypes = {
        sounds: PropTypes.object
      };
      getChildContext () {
        return { sounds };
      }
      render () {
        return this.props.children; // eslint-disable-line react/prop-types
      }
    }
    const MyComp = props => {
      expect(props.data).toBe(state); // eslint-disable-line react/prop-types
      expect(props.sounds).toBe(sounds); // eslint-disable-line react/prop-types
      return <div />;
    };

    const mapStateToProps = data => ({ data });
    const MyCompWithSounds = withSounds()(
      reactRedux.connect(mapStateToProps)(MyComp)
    );

    mount(
      <reactRedux.Provider store={store}>
        <SoundsProvider>
          <MyCompWithSounds />
        </SoundsProvider>
      </reactRedux.Provider>
    );
  });
});
