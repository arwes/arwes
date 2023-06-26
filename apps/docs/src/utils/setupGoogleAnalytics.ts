import { GA_TRACKING_ID } from '../settings';

const setupGoogleAnalytics = (): void => {
  if (process.env.NODE_ENV === 'production' && window.location.host.includes('arwes.dev')) {
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_TRACKING_ID;
    document.head.appendChild(gtagScript);
    /* eslint-disable */
    const win = window as any;
    win.dataLayer = win.dataLayer || [];
    function gtag () {
      win.dataLayer.push(arguments);
    }
    win.gtag = gtag;
    // @ts-expect-error
    gtag('js', new Date());
    // @ts-expect-error
    gtag('config', GA_TRACKING_ID);
    /* eslint-enable */
  }
};

export { setupGoogleAnalytics };
