/* eslint-env jest */

import type { ReactElement } from 'react';
import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { BleepsProvider } from '../BleepsProvider/index';
import { useBleeps } from '../index';

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
  const Button = (): ReactElement => {
    const bleeps = useBleeps();
    expect(bleeps).toMatchObject({
      click: expect.any(Object)
    });
    return <button>Click</button>;
  };

  const { container } = render(
    <BleepsProvider
      master={{
        volume: 0.5
      }}
      bleeps={{
        click: {
          sources: [{ src: 'audio.mp3', type: 'audio/mpeg' }],
          preload: false
        }
      }}
    >
      <Button />
    </BleepsProvider>
  );
  expect(container.innerHTML).toBe('<button>Click</button>');
});
