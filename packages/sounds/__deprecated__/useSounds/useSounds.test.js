/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { useSounds } from './useSounds';
import { SoundsProvider } from '../SoundsProvider';

afterEach(cleanup);

test('Should receive "players" and "audio" as empty objects if provided is not found', () => {
  function Player () {
    const context = useSounds();
    expect(context).toEqual({
      players: {},
      audio: {}
    });
    return <div />;
  }
  render(<Player />);
});

test('Should receive "players" and "audio" by provider if found', () => {
  function Player () {
    const context = useSounds();
    expect(context).toEqual({
      players: { a: 1 },
      audio: { b: 2 }
    });
    return <div />;
  }
  render(
    <SoundsProvider players={{ a: 1 }} audio={{ b: 2 }}>
      <Player />
    </SoundsProvider>
  );
});
