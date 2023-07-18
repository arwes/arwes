/* eslint-env jest */

import type { ReactElement } from 'react';
import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { BleepsProvider } from '../BleepsProvider/index';
import { useBleeps } from '../index';

const mockAudioContextDestination = Symbol('destination');

beforeEach(() => {
  class AudioContext {
    state = 'suspended';
    destination = mockAudioContextDestination;
    resume = jest.fn();

    createGain (): object {
      return {
        connect: jest.fn(),
        gain: {
          value: 0,
          setValueAtTime: jest.fn()
        }
      };
    }
  };

  class Audio {
    canPlayType = jest.fn(type => type === 'audio/mpeg' ? 'probably' : '');
  }

  window.AudioContext = AudioContext as any;
  window.Audio = Audio as any;
  window.fetch = jest.fn();
});

afterEach(() => {
  window.AudioContext = null as any;
  window.Audio = null as any;
  window.fetch = null as any;

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
