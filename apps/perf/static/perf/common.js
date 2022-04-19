(function () {
  const GA_TRACKING_ID = 'UA-50433259-2';

  if (window.location.host.includes('arwes.dev')) {
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_TRACKING_ID;
    document.head.appendChild(gtagScript);
    window.dataLayer = window.dataLayer || [];
    function gtag () {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    // @ts-expect-error
    gtag('js', new Date());
    // @ts-expect-error
    gtag('config', GA_TRACKING_ID);
  }
})();
