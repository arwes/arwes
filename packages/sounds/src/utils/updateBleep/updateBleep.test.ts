/* eslint-env jest */

import { createBleep } from '../createBleep';
import { updateBleep } from './updateBleep';

describe('volume', () => {
  test('Should not update bleep volume if undefined', () => {
    const bleep = createBleep({}, { src: ['x.mp3'] });
    const spyVolume = jest.spyOn(bleep._howl, 'volume').mockImplementation((() => 0.7) as any);
    updateBleep(bleep, {}, { src: ['x.mp3'] });
    expect(spyVolume).not.toHaveBeenCalledWith(expect.any(Number));
  });

  test('Should not update bleep volume if it is the same value', () => {
    const bleep = createBleep({ volume: 0.7 }, { src: ['x.mp3'] });
    const spyVolume = jest.spyOn(bleep._howl, 'volume').mockImplementation((() => 0.7) as any);
    updateBleep(bleep, { volume: 0.7 }, { src: ['x.mp3'] });
    expect(spyVolume).not.toHaveBeenCalledWith(expect.any(Number));
  });

  test('Should only update bleep volume if it is defined and different from current value', () => {
    const bleep = createBleep({ volume: 0.7 }, { src: ['x.mp3'] });
    const spyVolume = jest.spyOn(bleep._howl, 'volume').mockImplementation((() => 0.7) as any);
    updateBleep(bleep, { volume: 0.4 }, { src: ['x.mp3'] });
    expect(spyVolume).toHaveBeenCalledWith(0.4);
  });
});

describe('rate', () => {
  test('Should not update bleep rate if undefined', () => {
    const bleep = createBleep({}, { src: ['x.mp3'] });
    const spyRate = jest.spyOn(bleep._howl, 'rate').mockImplementation((() => 2) as any);
    updateBleep(bleep, {}, { src: ['x.mp3'] });
    expect(spyRate).not.toHaveBeenCalledWith(expect.any(Number));
  });

  test('Should not update bleep rate if it is the same value', () => {
    const bleep = createBleep({ rate: 2 }, { src: ['x.mp3'] });
    const spyRate = jest.spyOn(bleep._howl, 'rate').mockImplementation((() => 2) as any);
    updateBleep(bleep, { rate: 2 }, { src: ['x.mp3'] });
    expect(spyRate).not.toHaveBeenCalledWith(expect.any(Number));
  });

  test('Should only update bleep rate if it is defined and different from current value', () => {
    const bleep = createBleep({ rate: 2 }, { src: ['x.mp3'] });
    const spyRate = jest.spyOn(bleep._howl, 'rate').mockImplementation((() => 2) as any);
    updateBleep(bleep, { rate: 1 }, { src: ['x.mp3'] });
    expect(spyRate).toHaveBeenCalledWith(1);
  });
});

describe('loop', () => {
  test('Should not update bleep loop if undefined', () => {
    const bleep = createBleep({}, { src: ['x.mp3'] });
    const spyLoop = jest.spyOn(bleep._howl, 'loop').mockImplementation((() => false) as any);
    updateBleep(bleep, {}, { src: ['x.mp3'] });
    expect(spyLoop).not.toHaveBeenCalledWith(expect.any(Boolean));
  });

  test('Should not update bleep loop if it is the same value', () => {
    const bleep = createBleep({}, { src: ['x.mp3'], loop: false });
    const spyLoop = jest.spyOn(bleep._howl, 'loop').mockImplementation((() => false) as any);
    updateBleep(bleep, {}, { src: ['x.mp3'], loop: false });
    expect(spyLoop).not.toHaveBeenCalledWith(expect.any(Boolean));
  });

  test('Should only update bleep loop if it is defined and different from current value', () => {
    const bleep = createBleep({}, { src: ['x.mp3'], loop: false });
    const spyLoop = jest.spyOn(bleep._howl, 'loop').mockImplementation((() => false) as any);
    updateBleep(bleep, {}, { src: ['x.mp3'], loop: true });
    expect(spyLoop).toHaveBeenCalledWith(true);
  });
});
