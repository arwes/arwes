import React, { FC, useMemo } from 'react';
import PropTypes from 'prop-types';
import { CSSObject } from '@emotion/css';
import { Global, useTheme } from '@emotion/react';

import { createGlobalGeneralStyles } from './StylesBaseline.styles';

interface StylesBaselineProps {
  styles?: Record<string, CSSObject>
}

const StylesBaseline: FC<StylesBaselineProps> = props => {
  const { styles, children } = props;
  const theme = useTheme();

  const globalGeneralStyles = useMemo(() => {
    return createGlobalGeneralStyles(theme);
  }, [theme]);

  return (
    <>
      <Global styles={globalGeneralStyles} />
      {styles && <Global styles={styles} />}
      {children}
    </>
  );
};

StylesBaseline.propTypes = {
  // @ts-expect-error
  styles: PropTypes.object
};

export { StylesBaselineProps, StylesBaseline };
