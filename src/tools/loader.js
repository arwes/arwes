/**
 * Load a provided image by URL.
 * @param  {String} url
 * @return {Promise}
 */
export const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = img.onabort = () => reject();
    img.src = url;
  });
};

/**
 * Load a provided sound by URL.
 * @param  {String} url
 * @return {Promise}
 */
export const loadSound = (url) => {
  return new Promise((resolve, reject) => {
    const sound = new Audio();
    sound.addEventListener('canplaythrough', () => resolve());
    sound.onerror = sound.onabort = () => reject();
    sound.src = url;
  });
};

export default { loadImage, loadSound };
