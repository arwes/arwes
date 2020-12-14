/* eslint-env jest */

import React, { useContext } from 'react';
import { render, cleanup } from '@testing-library/react';
import { SoundsContext } from '../SoundsContext';
import { SoundsProvider } from './SoundsProvider';

afterEach(cleanup);

test('Should provide "players" and "audio" as empty objects', () => {
  function Player () {
    const { players, audio } = useContext(SoundsContext);
    expect(players).toEqual({});
    expect(audio).toEqual({});
    return <div />;
  }
  render(
    <SoundsProvider>
      <Player />
    </SoundsProvider>
  );
});

test('Should provide "players" and "audio" with provided values', () => {
  function Player () {
    const { players, audio } = useContext(SoundsContext);
    expect(players).toEqual({ a: 1 });
    expect(audio).toEqual({ x: 2 });
    return <div />;
  }
  render(
    <SoundsProvider players={{ a: 1 }} audio={{ x: 2 }}>
      <Player />
    </SoundsProvider>
  );
});

test('Should support nested providers and extend provided values', () => {
  function Player () {
    const { players, audio } = useContext(SoundsContext);
    expect(players).toEqual({ a: 3, b: 4 });
    expect(audio).toEqual({ x: 2, y: 5 });
    return <div />;
  }
  render(
    <SoundsProvider players={{ a: 1 }} audio={{ x: 2 }}>
      <SoundsProvider players={{ a: 3, b: 4 }} audio={{ y: 5 }}>
        <Player />
      </SoundsProvider>
    </SoundsProvider>
  );
});
