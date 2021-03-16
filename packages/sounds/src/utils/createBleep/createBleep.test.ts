/* eslint-env jest */

import { createBleep } from './createBleep';

test('Should create bleep with provided settings', () => {
  const audioSettings = {
    volume: 0.8,
    preload: true
  };
  const playerSettings = {
    src: ['sound.webm'],
    rate: 2,
    loop: true
  };
  const bleep = createBleep(audioSettings, playerSettings);
  expect(bleep).toMatchObject({
    _settings: {
      volume: 0.8,
      preload: true,
      src: ['sound.webm'],
      rate: 2,
      loop: true
    },
    play: expect.any(Function),
    stop: expect.any(Function),
    getIsPlaying: expect.any(Function),
    getDuration: expect.any(Function),
    unload: expect.any(Function)
  });
});

test('Should allow playing the sound as shared sound', () => {
  const audioSettings = { volume: 0.8 };
  const playerSettings = { src: ['sound.webm'] };
  const bleep = createBleep(audioSettings, playerSettings);
  const howlPlay = jest.spyOn(bleep._howl, 'play').mockImplementation(() => 777);
  bleep.play();
  bleep.play();
  bleep.play();
  bleep.play();
  expect(howlPlay).toHaveBeenCalledTimes(4);
  expect(howlPlay).toHaveBeenNthCalledWith(1, undefined);
  expect(howlPlay).toHaveBeenNthCalledWith(2, 777);
  expect(howlPlay).toHaveBeenNthCalledWith(3, 777);
  expect(howlPlay).toHaveBeenNthCalledWith(4, 777);
});

test('Should load the sound if it is unloaded when it is played', () => {
  const audioSettings = { volume: 0.8 };
  const playerSettings = { src: ['sound.webm'] };
  const bleep = createBleep(audioSettings, playerSettings);
  jest.spyOn(bleep._howl, 'state').mockImplementation(() => 'unloaded');
  const howlLoad = jest.spyOn(bleep._howl, 'load').mockImplementation();
  const howlPlay = jest.spyOn(bleep._howl, 'play').mockImplementation();
  bleep.play();
  expect(howlLoad).toHaveBeenCalled();
  expect(howlPlay).toHaveBeenCalled();
});

test('Should always set shared sound id as number or undefined when playing (even if the play returns null)', () => {
  const audioSettings = { volume: 0.8 };
  const playerSettings = { src: ['sound.webm'] };
  const bleep = createBleep(audioSettings, playerSettings);
  jest.spyOn(bleep._howl, 'state').mockImplementation(() => 'unloaded');
  const howlLoad = jest.spyOn(bleep._howl, 'load').mockImplementation();
  // Howler typings don't accept `null`, but if its state is 'unloaded' it actually returns null.
  const howlPlay = jest.spyOn(bleep._howl, 'play').mockImplementation(() => null as any);
  const playId = bleep.play();
  expect(playId).toBeUndefined();
  expect(howlLoad).toHaveBeenCalled();
  expect(howlPlay).toHaveBeenCalled();
});

test('Should allow stop play in shared sound', () => {
  const audioSettings = { volume: 0.8 };
  const playerSettings = { src: ['sound.webm'] };
  const bleep = createBleep(audioSettings, playerSettings);
  const howlPlay = jest.spyOn(bleep._howl, 'play').mockImplementation(() => 777);
  const howlStop = jest.spyOn(bleep._howl, 'stop');
  bleep.play();
  bleep.stop();
  expect(howlPlay).toHaveBeenCalled();
  expect(howlStop).toHaveBeenCalledTimes(1);
  expect(howlStop).toHaveBeenNthCalledWith(1, 777);
});

test('Should allow get the playing status in shared sound', () => {
  const audioSettings = { volume: 0.8 };
  const playerSettings = { src: ['sound.webm'] };
  const bleep = createBleep(audioSettings, playerSettings);
  const howlPlay = jest.spyOn(bleep._howl, 'play').mockImplementation(() => 777);
  const howlPlaying = jest.spyOn(bleep._howl, 'playing').mockImplementation(() => true);
  bleep.play();
  expect(bleep.getIsPlaying()).toBe(true);
  expect(howlPlay).toHaveBeenCalled();
  expect(howlPlaying).toHaveBeenCalledTimes(1);
  expect(howlPlaying).toHaveBeenNthCalledWith(1, 777);
});

test('Should allow get duration of sound', () => {
  const audioSettings = { volume: 0.8 };
  const playerSettings = { src: ['sound.webm'] };
  const bleep = createBleep(audioSettings, playerSettings);
  const howlDuration = jest.spyOn(bleep._howl, 'duration').mockImplementation(() => 999);
  expect(bleep.getDuration()).toBe(999);
  expect(howlDuration).toHaveBeenCalledTimes(1);
});

test('Should allow get duration of sound', () => {
  const audioSettings = { volume: 0.8 };
  const playerSettings = { src: ['sound.webm'] };
  const bleep = createBleep(audioSettings, playerSettings);
  const howlUnload = jest.spyOn(bleep._howl, 'unload');
  bleep.unload();
  expect(howlUnload).toHaveBeenCalledTimes(1);
});
