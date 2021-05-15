import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { CSSObject } from '@emotion/css';
import { Global, useTheme } from '@emotion/react';

import { createGlobalGeneralStyles } from './StylesBaseline.styles';

interface StylesBaselineProps {
  styles?: Record<string, CSSObject>
}

const StylesBaseline = (props: StylesBaselineProps): ReactElement => {
  const { styles } = props;
  const theme = useTheme();
  const globalGeneralStyles = createGlobalGeneralStyles(theme);

  return (
    <>
      <Global styles={globalGeneralStyles} />
      {styles && <Global styles={styles} />}
    </>
  );
};

StylesBaseline.propTypes = {
  styles: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func
  ])
};

export { StylesBaselineProps, StylesBaseline };
