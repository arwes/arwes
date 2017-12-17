import { titles } from './settings';

export const getTitle = currentPath => {
  const pagePath = Object.
    keys(titles).
    find(path => currentPath === path);

  return titles[pagePath] || 'Arwes';
};
