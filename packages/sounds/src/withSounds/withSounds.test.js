/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { SoundsProvider } from '../SoundsProvider';
import { withSounds } from './withSounds';

afterEach(cleanup);

test('Should receive "players" and "audio" as empty objects if no provider is found', () => {
  const Player = withSounds()(props => {
    expect(props).toEqual({ players: {}, audio: {} });
    return <div />;
  });
  render(<Player />);
});

test('Should receive "players" and "audio" from provider', () => {
  const Player = withSounds()(props => {
    expect(props).toEqual({
      players: { a: 1 },
      audio: { b: 2 }
    });
    return <div />;
  });
  render(
    <SoundsProvider players={{ a: 1 }} audio={{ b: 2 }}>
      <Player />
    </SoundsProvider>
  );
});

test('Should allow props overwrite from HOC', () => {
  const Player = withSounds({
    players: { a: 7, x: 8 },
    audio: { y: 9 }
  })(props => {
    expect(props).toEqual({
      players: { a: 7, x: 8 },
      audio: { b: 2, y: 9 }
    });
    return <div />;
  });
  render(
    <SoundsProvider players={{ a: 1 }} audio={{ b: 2 }}>
      <Player />
    </SoundsProvider>
  );
});

test('Should allow props overwrite from component', () => {
  const Player = withSounds({
    players: { b: 4 },
    audio: { z: 6 }
  })(props => {
    expect(props).toEqual({
      players: { a: 1, b: 9, c: 10 },
      audio: { x: 1, y: 3, z: 4 }
    });
    return <div />;
  });
  render(
    <SoundsProvider
      players={{ a: 1, b: 2 }}
      audio={{ x: 1, y: 2 }}
    >
      <Player
        players={{ b: 9, c: 10 }}
        audio={{ y: 3, z: 4 }}
      />
    </SoundsProvider>
  );
});

test('Should forward reference', () => {
  class PlayerSource extends React.Component {
    render () {
      return <div />;
    }

    greet () {
      return 'hello!';
    }
  }
  const Player = withSounds()(PlayerSource);
  let componentRef;
  render(<Player ref={ref => (componentRef = ref)} />);
  expect(componentRef.greet()).toBe('hello!');
});
