const isBrowser = typeof window !== 'undefined' && !!window.matchMedia;
const isLocal = isBrowser && !window.location.host.includes('arwes.dev');
const isProduction = isBrowser && window.location.host === 'arwes.dev';

export const APP_PLAY_HOST_URL = isLocal ? 'http://127.0.0.1:9000' : isProduction ? 'https://arwes.dev' : 'https://next.arwes.dev';

export const GA_TRACKING_ID = 'UA-50433259-2';
