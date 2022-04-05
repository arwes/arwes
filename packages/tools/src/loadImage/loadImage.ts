const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onerror = img.onabort = (): void => reject();
    img.onload = (): void => resolve(img);
    img.src = url;
  });
};

export { loadImage };
