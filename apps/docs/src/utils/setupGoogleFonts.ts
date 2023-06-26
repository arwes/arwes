const setupGoogleFonts = (): void => {
  const gFontsElement = document.createElement('link');
  gFontsElement.rel = 'stylesheet';
  gFontsElement.href = 'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;600&display=swap';
  document.body.appendChild(gFontsElement);
};

export { setupGoogleFonts };
