/* eslint-env jest */

import howler from 'howler';

import { createBleep } from './createBleep';

jest.mock('howler', () => {
  const Howler = {
    _audioUnlocked: true
  };
  class Howl {
    constructor (settings: any) {
      const self = this as any;
      self.__testBleepHowlSettings = settings;
    }

    play (): void {}
    stop (): void {}
    playing (): void {}
    state (): void {}
    duration (): void {}
    load (): void {}
    unload (): void {}
  }
  return { Howler, Howl };
});

const howlerGlobalAPI: any = howler.Howler;
const unlockGlobalAudio = (): any => (howlerGlobalAPI._audioUnlocked = true);
const lockGlobalAudio = (): any => (howlerGlobalAPI._audioUnlocked = false);

beforeEach(() => {
  unlockGlobalAudio();
});

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
  bleep.play('A');
  bleep.play('A');
  bleep.play('A');
  bleep.play('A');
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
  bleep.play('A');
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
  const playId = bleep.play('A');
  expect(playId).toBeUndefined();
  expect(howlLoad).toHaveBeenCalled();
  expect(howlPlay).toHaveBeenCalled();
});

test('Should not play sound when global audio is locked', () => {
  lockGlobalAudio();

  const audioSettings = { volume: 0.8 };
  const playerSettings = { src: ['sound.webm'] };
  const bleep = createBleep(audioSettings, playerSettings);
  const howlPlay = jest.spyOn(bleep._howl, 'play');
  bleep.play('A');
  expect(howlPlay).not.toHaveBeenCalled();
});

test('Should unlock bleep audio when it was locked and then unlocked to be playable', () => {
  lockGlobalAudio();

  const audioSettings = { volume: 0.8 };
  const playerSettings = { src: ['sound.webm'] };
  const bleep = createBleep(audioSettings, playerSettings);
  const howlPlay = jest.spyOn(bleep._howl, 'play');
  bleep.play('A');
  expect(howlPlay).not.toHaveBeenCalled();

  unlockGlobalAudio();

  const bleepHowl: any = bleep._howl;
  bleepHowl.__testBleepHowlSettings.onunlock();

  bleep.play('A');
  expect(howlPlay).toHaveBeenCalled();
});

test('Should allow stop play in shared sound only when it is already playing', () => {
  const audioSettings = { volume: 0.8 };
  const playerSettings = { src: ['sound.webm'] };
  const bleep = createBleep(audioSettings, playerSettings);
  jest.spyOn(bleep._howl, 'playing').mockImplementation(() => true);
  const howlPlay = jest.spyOn(bleep._howl, 'play').mockImplementation(() => 777);
  const howlStop = jest.spyOn(bleep._howl, 'stop');
  bleep.play('A');
  bleep.stop('A');
  expect(howlPlay).toHaveBeenCalled();
  expect(howlStop).toHaveBeenCalledTimes(1);
});

test('Should not stop sound if it is not playing', () => {
  const audioSettings = { volume: 0.8 };
  const playerSettings = { src: ['sound.webm'] };
  const bleep = createBleep(audioSettings, playerSettings);
  jest.spyOn(bleep._howl, 'playing').mockImplementation(() => false);
  jest.spyOn(bleep._howl, 'play').mockImplementation(() => 777);
  const howlStop = jest.spyOn(bleep._howl, 'stop');
  bleep.stop('A');
  expect(howlStop).not.toHaveBeenCalled();
});

test('Should manage loop sound play/stop multiple calls to prevent race-condition problems', () => {
  const audioSettings = { volume: 0.8 };
  const playerSettings = { src: ['sound.webm'], loop: true };
  const bleep = createBleep(audioSettings, playerSettings);

  jest.spyOn(bleep._howl, 'state').mockImplementation(() => 'loaded');
  jest.spyOn(bleep._howl, 'play').mockImplementation(() => 777);
  const howlStop = jest.spyOn(bleep._howl, 'stop');

  bleep.play('A');
  jest.spyOn(bleep._howl, 'playing').mockImplementation(() => true);
  bleep.play('B');
  bleep.play('C');

  // There may be multiple calls from the same source.
  bleep.play('B');
  bleep.play('C');

  bleep.stop('A');
  expect(howlStop).not.toHaveBeenCalled();

  // There may be multiple calls from the same source.
  bleep.stop('B');
  bleep.stop('A');
  bleep.stop('B');
  bleep.stop('A');
  expect(howlStop).not.toHaveBeenCalled();

  // All sources calling play() must also call stop() to actually stop the sound.
  bleep.stop('C');
  expect(howlStop).toHaveBeenCalled();
});

// TODO: There is the possibility the race-condition issues happen with non-loop
// sounds too. But a different API approach may be required. For the current
// component functionalities, for now it is ok.
test('Should not manage non-loop sound play/stop multiple calls to prevent race-condition problems', () => {
  const audioSettings = { volume: 0.8 };
  const playerSettings = { src: ['sound.webm'] };
  const bleep = createBleep(audioSettings, playerSettings);

  jest.spyOn(bleep._howl, 'state').mockImplementation(() => 'loaded');
  jest.spyOn(bleep._howl, 'playing').mockImplementation(() => true);
  jest.spyOn(bleep._howl, 'play').mockImplementation(() => 777);
  const howlStop = jest.spyOn(bleep._howl, 'stop');

  bleep.play('A');
  bleep.play('B');
  bleep.play('C');

  bleep.stop('D');
  expect(howlStop).toHaveBeenCalled();
});

test('Should allow to get the playing status', () => {
  const audioSettings = { volume: 0.8 };
  const playerSettings = { src: ['sound.webm'] };
  const bleep = createBleep(audioSettings, playerSettings);
  const howlPlay = jest.spyOn(bleep._howl, 'play').mockImplementation(() => 777);
  const howlPlaying = jest.spyOn(bleep._howl, 'playing').mockImplementation(() => true);
  bleep.play('A');
  expect(bleep.getIsPlaying()).toBe(true);
  expect(howlPlay).toHaveBeenCalled();
  expect(howlPlaying).toHaveBeenCalledTimes(1);
});

test('Should allow to get duration of sound', () => {
  const audioSettings = { volume: 0.8 };
  const playerSettings = { src: ['sound.webm'] };
  const bleep = createBleep(audioSettings, playerSettings);
  const howlDuration = jest.spyOn(bleep._howl, 'duration').mockImplementation(() => 999);
  expect(bleep.getDuration()).toBe(999);
  expect(howlDuration).toHaveBeenCalledTimes(1);
});

test('Should allow to unload sound', () => {
  const audioSettings = { volume: 0.8 };
  const playerSettings = { src: ['sound.webm'] };
  const bleep = createBleep(audioSettings, playerSettings);
  const howlUnload = jest.spyOn(bleep._howl, 'unload');
  bleep.unload();
  expect(howlUnload).toHaveBeenCalledTimes(1);
});
