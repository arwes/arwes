import sinon from 'sinon';
import createResponsive from './index';

describe('createResponsive', function () {

  it('Should get small width when available', function () {
    const responsive = createResponsive({
      getTheme: () => ({ responsive: { small: 100, medium: 200, large: 300 } }),
      getDimensions: () => ({ width: 75, height: 0 })
    });
    const actual = responsive.get();
    const expected = { small: true, status: 'small' };
    expect(actual).to.eql(expected);
  });

  it('Should get medium width when available', function () {
    const responsive = createResponsive({
      getTheme: () => ({ responsive: { small: 100, medium: 200, large: 300 } }),
      getDimensions: () => ({ width: 150, height: 0 })
    });
    const actual = responsive.get();
    const expected = { medium: true, status: 'medium' };
    expect(actual).to.eql(expected);
  });

  it('Should get large width when available', function () {
    const responsive = createResponsive({
      getTheme: () => ({ responsive: { small: 100, medium: 200, large: 300 } }),
      getDimensions: () => ({ width: 250, height: 0 })
    });
    const actual = responsive.get();
    const expected = { large: true, status: 'large' };
    expect(actual).to.eql(expected);
  });

  it('Should get xlarge width when available', function () {
    const responsive = createResponsive({
      getTheme: () => ({ responsive: { small: 100, medium: 200, large: 300 } }),
      getDimensions: () => ({ width: 350, height: 0 })
    });
    const actual = responsive.get();
    const expected = { xlarge: true, status: 'xlarge' };
    expect(actual).to.eql(expected);
  });

  it('Should be able to listen for changes only when breakpoint has changed', function () {
    let width = 150;
    const responsive = createResponsive({
      getTheme: () => ({ responsive: { small: 100, medium: 200, large: 300 } }),
      getDimensions: () => ({ width })
    });

    const spy = sinon.spy();
    responsive.on(spy);

    window.dispatchEvent(new Event('resize'));
    window.dispatchEvent(new Event('resize'));

    // The breakpoint has not changed.
    expect(spy.callCount).to.equal(0);

    width = 250;
    window.dispatchEvent(new Event('resize'));
    window.dispatchEvent(new Event('resize'));

    // The breakpoint has changed once.
    expect(spy.callCount).to.equal(1);
  });

  it('Should be able to subscribe and unsubscribe to resize events', function () {
    let width = 150;
    const responsive = createResponsive({
      getTheme: () => ({ responsive: { small: 100, medium: 200, large: 300 } }),
      getDimensions: () => ({ width })
    });

    const spy = sinon.spy();
    const listener = responsive.on(spy);

    width = 250;
    window.dispatchEvent(new Event('resize'));

    expect(spy.callCount).to.equal(1);

    responsive.off(listener);

    width = 350;
    window.dispatchEvent(new Event('resize'));

    // It was not called again.
    expect(spy.callCount).to.equal(1);
  });

});
