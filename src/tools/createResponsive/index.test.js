import sinon from 'sinon';
import createResponsive from './index';

describe('createResponsive', function () {

  it('Should get small width when available', function () {
    const responsive = createResponsive({
      getTheme: () => ({ responsive: { small: 100, medium: 200, large: 300 } }),
      getDimensions: () => ({ width: 75, height: 0 })
    });
    const actual = responsive.get();
    const expected = { small: true };
    expect(actual).to.eql(expected);
  });

  it('Should get medium width when available', function () {
    const responsive = createResponsive({
      getTheme: () => ({ responsive: { small: 100, medium: 200, large: 300 } }),
      getDimensions: () => ({ width: 150, height: 0 })
    });
    const actual = responsive.get();
    const expected = { medium: true };
    expect(actual).to.eql(expected);
  });

  it('Should get large width when available', function () {
    const responsive = createResponsive({
      getTheme: () => ({ responsive: { small: 100, medium: 200, large: 300 } }),
      getDimensions: () => ({ width: 250, height: 0 })
    });
    const actual = responsive.get();
    const expected = { large: true };
    expect(actual).to.eql(expected);
  });

  it('Should get xlarge width when available', function () {
    const responsive = createResponsive({
      getTheme: () => ({ responsive: { small: 100, medium: 200, large: 300 } }),
      getDimensions: () => ({ width: 350, height: 0 })
    });
    const actual = responsive.get();
    const expected = { xlarge: true };
    expect(actual).to.eql(expected);
  });

  it('Should be able to subscribe and unsubscribe to resize events', function () {
    const responsive = createResponsive({
      getTheme: () => ({ responsive: { small: 100, medium: 200, large: 300 } }),
      getDimensions: () => ({ width: 100, height: 0 })
    });

    const spy = sinon.spy();
    const listener = responsive.on(spy);

    window.dispatchEvent(new Event('resize'));
    window.dispatchEvent(new Event('resize'));

    expect(spy.callCount).to.equal(2);

    responsive.off(listener);

    window.dispatchEvent(new Event('resize'));
    window.dispatchEvent(new Event('resize'));

    expect(spy.callCount).to.equal(2);
  });

});
