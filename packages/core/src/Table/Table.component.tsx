/** @jsx jsx */
import { FC, ReactNode, Ref, useMemo } from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';
import { WithAnimatorInputProps } from '@arwes/animation';
import { WithBleepsInputProps } from '@arwes/sounds';

import { TableRow } from './TableRow';
import { generateStyles } from './Table.styles';

type TableColumnWidth = string | number;

interface TableProps {
  headers: ReactNode[]
  dataset: ReactNode[][]
  columnWidths?: TableColumnWidth[]
  condensed?: boolean
  rootRef?: Ref<HTMLDivElement>
  className?: string
}

const Table: FC<TableProps & WithAnimatorInputProps & WithBleepsInputProps> = props => {
  const {
    animator,
    bleeps,
    rootRef,
    headers,
    dataset,
    columnWidths,
    condensed,
    className
  } = props;

  const theme = useTheme();
  const styles = useMemo(() => generateStyles(theme), [theme]);

  animator.setupAnimateRefs(bleeps);

  return (
    <div
      css={[
        styles.root,
        !animator.flow.entered && styles.rootIsTransitioning
      ]}
      className={cx('arwes-table', className)}
      ref={rootRef}
    >
      <div
        css={styles.container}
        className='arwes-table__container'
      >
        <TableRow
          isHeader
          rowValues={headers}
          columnWidths={columnWidths}
          condensed={condensed}
        />
        {dataset.map((rowValues: ReactNode[], rowIndex: number) =>
          <TableRow
            key={rowIndex}
            rowValues={rowValues}
            columnWidths={columnWidths}
            condensed={condensed}
          />
        )}
      </div>
    </div>
  );
};

Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.node).isRequired,
  // @ts-expect-error
  dataset: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.node)).isRequired,
  // @ts-expect-error
  columnWidths: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  condensed: PropTypes.bool,
  rootRef: PropTypes.any,
  className: PropTypes.string
};

export { TableProps, Table };
