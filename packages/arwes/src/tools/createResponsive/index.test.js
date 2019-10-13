/* eslint-env jest,browser */

import createResponsive from './index';

describe('createResponsive', () => {
  test('Should get small width when available', () => {
    const responsive = createResponsive({
      getTheme: () => ({ responsive: { small: 100, medium: 200, large: 300 } }),
      getDimensions: () => ({ width: 75, height: 0 })
    });
    const actual = responsive.get();
    const expected = { small: true, status: 'small' };
    expect(actual).toEqual(expected);
  });

  test('Should get medium width when available', () => {
    const responsive = createResponsive({
      getTheme: () => ({ responsive: { small: 100, medium: 200, large: 300 } }),
      getDimensions: () => ({ width: 150, height: 0 })
    });
    const actual = responsive.get();
    const expected = { medium: true, status: 'medium' };
    expect(actual).toEqual(expected);
  });

  test('Should get large width when available', () => {
    const responsive = createResponsive({
      getTheme: () => ({ responsive: { small: 100, medium: 200, large: 300 } }),
      getDimensions: () => ({ width: 250, height: 0 })
    });
    const actual = responsive.get();
    const expected = { large: true, status: 'large' };
    expect(actual).toEqual(expected);
  });

  test('Should get xlarge width when available', () => {
    const responsive = createResponsive({
      getTheme: () => ({ responsive: { small: 100, medium: 200, large: 300 } }),
      getDimensions: () => ({ width: 350, height: 0 })
    });
    const actual = responsive.get();
    const expected = { xlarge: true, status: 'xlarge' };
    expect(actual).toEqual(expected);
  });

  // TODO: Enable test case.
  xtest('Should be able to listen for changes only when breakpoint has changed', () => {
    let width = 150;
    const responsive = createResponsive({
      getTheme: () => ({ responsive: { small: 100, medium: 200, large: 300 } }),
      getDimensions: () => ({ width })
    });

    const spy = jest.fn();
    responsive.on(spy);

    window.dispatchEvent(new Event('resize'));
    window.dispatchEvent(new Event('resize'));

    // The breakpoint has not changed.
    expect(spy).toHaveBeenCalledTimes(0);

    width = 250;
    window.dispatchEvent(new Event('resize'));
    window.dispatchEvent(new Event('resize'));

    // The breakpoint has changed once.
    expect(spy).toHaveBeenCalledTimes(1);
  });

  // TODO: Enable test case.
  xtest('Should be able to subscribe and unsubscribe to resize events', () => {
    let width = 150;
    const responsive = createResponsive({
      getTheme: () => ({ responsive: { small: 100, medium: 200, large: 300 } }),
      getDimensions: () => ({ width })
    });

    const spy = jest.fn();
    const listener = responsive.on(spy);

    width = 250;
    window.dispatchEvent(new Event('resize'));

    expect(spy).toHaveBeenCalledTimes(1);

    responsive.off(listener);

    width = 350;
    window.dispatchEvent(new Event('resize'));

    // It shouldn't have been called again.
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
