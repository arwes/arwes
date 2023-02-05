export const IS_BROWSER: boolean = typeof window !== 'undefined';

export const IS_PRODUCTION: boolean = typeof process !== 'undefined' ? process?.env?.NODE_ENV === 'production' : true;
