/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Fragment } from 'react';
import PropTypes from 'prop-types';

const styles = {
  root: {
    '& img': {
      display: 'inline-block'
    }
  }
};

const packageStatuses = {
  concept: 'https://img.shields.io/badge/status-in%20concept-999999.svg',
  specification: 'https://img.shields.io/badge/status-in%20specification-blue.svg',
  development: 'https://img.shields.io/badge/status-in%20development-orange.svg',
  testing: 'https://img.shields.io/badge/status-in%20testing-purple.svg',
  polishing: 'https://img.shields.io/badge/status-in%20polishing-yellow.svg',
  production: 'https://img.shields.io/badge/status-in%20production-green.svg'
};

const PackageState = ({ name, status, projectBoard }) => (
  <div css={styles.root}>
    {!!projectBoard && (
      <Fragment>
        <a href={projectBoard} target='_blank'>
          <img src={packageStatuses[status]} alt="status" />
        </a>
        {' '}
        <a href={projectBoard} target='_blank'>
          <img src="https://img.shields.io/badge/see-planning_tasks-047755" alt="GitHub Project" />
        </a>
      </Fragment>
    )}
    {!projectBoard && (
      <img src={packageStatuses[status]} alt="status" />
    )}
    {' '}
    <a href={`https://www.npmjs.com/package/@arwes/${name}`} target='_blank'>
      <img src={`https://img.shields.io/npm/dm/@arwes/${name}.svg`} alt="downloads" />
    </a>
    {' '}
    <a href={`https://bundlephobia.com/result?p=@arwes/${name}`} target='_blank'>
      <img src={`https://img.shields.io/bundlephobia/minzip/@arwes/${name}`} alt="npm bundle size" />
    </a>
  </div>
);

PackageState.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.oneOf(Object.keys(packageStatuses)).isRequired,
  projectBoard: PropTypes.string
};

export { PackageState };
