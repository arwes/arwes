import { globalStyle } from '@vanilla-extract/css';
import { createAppStylesBaseline } from '@arwes/react';
import { theme } from '@app/theme';

const stylesBaseline = createAppStylesBaseline(theme);

Object.keys(stylesBaseline).forEach(styleName => {
  globalStyle(styleName, stylesBaseline[styleName]);
});

globalStyle('h1, h2, h3, h4, h5, h6', {
  fontWeight: 300
});

globalStyle(`
  :where(
    h1:not(:first-child),
    h2:not(:first-child),
    h3:not(:first-child)
  )
`, {
  marginTop: theme.space(12)
});
