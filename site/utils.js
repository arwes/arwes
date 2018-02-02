import { titles } from './settings';

export const getTitle = currentPath => {
  const pagePath = Object.
    keys(titles).
    find(path => currentPath.indexOf(path) === 0);

  return titles[pagePath || '/'];
};
