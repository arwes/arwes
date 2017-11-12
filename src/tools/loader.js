export const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = img.onabort = () => reject();
    img.src = url;
  });
};

export const loadSound = (url) => {
  return new Promise((resolve, reject) => {
    const sound = new Audio();
    sound.addEventListener('canplaythrough', () => resolve());
    sound.onerror = sound.onabort = () => reject();
    sound.src = url;
  });
};
