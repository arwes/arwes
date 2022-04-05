const loadImage = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onerror = img.onabort = (): void => reject();
    img.onload = (): void => resolve();
    img.src = url;
  });
};

export { loadImage };
