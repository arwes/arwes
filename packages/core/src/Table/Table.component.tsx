/** @jsx jsx */
import { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { jsx } from '@emotion/react';
import { WithAnimatorInputProps } from '@arwes/animation';
import { WithBleepsInputProps } from '@arwes/sounds';

import { TableRow } from './TableRow';
import { styles } from './Table.styles';

interface TableProps {
  headers?: ReactNode[]
  dataset?: ReactNode[][]
}

const Table: FC<TableProps & WithAnimatorInputProps & WithBleepsInputProps> = props => {
  const {
    animator,
    bleeps,
    headers = [],
    dataset = []
  } = props;

  animator.setupAnimateRefs(bleeps);

  return (
    <div
      css={styles.root}
      className='arwes-table'
    >
      <div
        css={styles.container}
        className='arwes-table__container'
      >
        <TableRow
          isHeader
          rowValues={headers}
        />
        {dataset.map((rowValues, rowIndex) =>
          <TableRow
            key={rowIndex}
            rowValues={rowValues}
          />
        )}
      </div>
    </div>
  );
};

Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.node),
  // @ts-expect-error
  dataset: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.node))
};

Table.defaultProps = {
  headers: [],
  dataset: []
};

export { TableProps, Table };
