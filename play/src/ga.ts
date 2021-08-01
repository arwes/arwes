import { GA_TRACKING_ID } from './settings';

if (process.env.NODE_ENV === 'production' && window.location.host.includes('arwes.dev')) {
  const gtagScript = document.createElement('script');
  gtagScript.async = true;
  gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_TRACKING_ID;
  document.head.appendChild(gtagScript);

  const win: any = window;
  win.dataLayer = win.dataLayer || [];
  const gtag = (...args: any[]): void => {
    win.dataLayer.push(args);
  };
  win.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_TRACKING_ID);
}
