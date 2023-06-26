/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { BleepsProvider } from './index';

beforeEach(() => {
  class AudioContext {
    createGain (): object {
      return {
        connect: jest.fn(),
        gain: {
          setValueAtTime: jest.fn()
        }
      };
    }
  };
  window.AudioContext = AudioContext as any;
});

afterEach(() => {
  window.AudioContext = null as any;

  cleanup();
});

test('Should render bleeps provider content', () => {
  const { container } = render(
    <BleepsProvider
      common={{
        volume: 0.5
      }}
      bleeps={{
        click: {
          sources: [{ src: 'audio.mp3', type: 'audio/mpeg' }],
          preload: false
        }
      }}
    >
      Furutistic <b>Sci-Fi</b> UI Web Framework
    </BleepsProvider>
  );
  expect(container.innerHTML).toBe('Furutistic <b>Sci-Fi</b> UI Web Framework');
});
