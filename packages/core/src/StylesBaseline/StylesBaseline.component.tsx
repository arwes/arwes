import { Global } from '@emotion/react';
import React, { FC, useMemo } from 'react';
import { createTheme } from '@arwes/design';

import { createGlobalGeneralStyles } from './StylesBaseline.styles';

const StylesBaseline: FC = props => {
  const { children } = props;

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        primary: {
          light: '#7efcf6',
          main: '#00f8f8',
          dark: '#05c6c1'
        },
        secondary: {
          light: '#ffece1',
          main: '#ffa76c',
          dark: '#f66901'
        },
        neutral: {
          main: '#021114'
        },
        text: {
          root: '#7efcf6',
          headings: '#00f8f8',
          link: '#ffa76c',
          linkHover: '#f66901'
        }
      }
    });
  }, []);

  const globalGeneralStyles = useMemo(() => {
    return createGlobalGeneralStyles(theme);
  }, [theme]);

  return (
    <>
      <Global styles={globalGeneralStyles} />
      {children}
    </>
  );
};

export { StylesBaseline };
