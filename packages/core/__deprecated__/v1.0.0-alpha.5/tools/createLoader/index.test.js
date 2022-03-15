/* eslint-env jest */

import createLoader from './index';

describe('createLoader', () => {
  test('Should load and resolve when all assets provided are loaded', () => {
    const loader = createLoader({
      loadImage: () => Promise.resolve(),
      loadSound: () => Promise.resolve()
    });
    return loader.load({
      images: [1, 2, 3],
      sounds: [1, 2, 3]
    });
  });

  test('Should load and reject when at least one assets provided is not loaded', () => {
    const loader = createLoader({
      loadImage: () => Promise.resolve(),
      loadSound: asset => (asset === 2 ? Promise.reject() : Promise.resolve())
    });
    return loader
      .load({
        images: [1, 2, 3],
        sounds: [1, 2, 3] // The `2` will fail to load
      })
      .then(
        () => {
          return Promise.reject('Should have failed at load sound 2');
        },
        () => {
          // Everything is ok
        }
      );
  });

  test('Should reject when timeout', () => {
    const loader = createLoader({
      loadImage: () => new Promise(() => {}), // Load images will never resolve
      loadSound: () => Promise.resolve() // Load sounds will resolve
    });
    return loader
      .load(
        {
          images: [1, 2, 3],
          sounds: [1, 2, 3]
        },
        {
          timeout: 100
        }
      )
      .then(
        () => {
          return Promise.reject('Should have failed by timeout');
        },
        () => {
          // Everything is ok
        }
      );
  });
});
