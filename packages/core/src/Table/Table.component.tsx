/** @jsx jsx */
import { FC, MutableRefObject, CSSProperties, useMemo } from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';
import { WithAnimatorInputProps } from '@arwes/animation';
import { useBleeps } from '@arwes/sounds';

import { TableRowPropsColumn, TableRowPropsColumnWidth, TableRow } from './TableRow';
import { generateStyles } from './Table.styles';

interface TableRowPropsDataRow {
  id: string | number
  columns: TableRowPropsColumn[]
}

interface TableProps {
  headers: TableRowPropsDataRow['columns']
  dataset: TableRowPropsDataRow[]
  columnWidths?: TableRowPropsColumnWidth[]
  condensed?: boolean
  className?: string
  style?: CSSProperties
  rootRef?: MutableRefObject<HTMLDivElement | null> | ((node: HTMLDivElement) => void)
}

const Table: FC<TableProps & WithAnimatorInputProps> = props => {
  const {
    animator,
    headers,
    dataset,
    columnWidths,
    condensed,
    style,
    className,
    rootRef
  } = props;

  const theme = useTheme();
  const bleeps = useBleeps();
  const styles = useMemo(() => generateStyles(theme), [theme]);

  animator.setupAnimateRefs(bleeps);

  return (
    <div
      className={cx('arwes-table', className)}
      css={[
        styles.root,
        !animator.flow.entered && styles.rootIsTransitioning
      ]}
      style={style}
      ref={rootRef}
    >
      <div
        className='arwes-table__container'
        css={styles.container}
      >
        <TableRow
          theme={theme}
          isHeader
          columns={headers}
          columnWidths={columnWidths}
          condensed={condensed}
        />
        {dataset.map(row =>
          <TableRow
            theme={theme}
            key={row.id}
            columns={row.columns}
            columnWidths={columnWidths}
            condensed={condensed}
          />
        )}
      </div>
    </div>
  );
};

const propTypeColumns = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    data: PropTypes.node.isRequired
  }).isRequired
).isRequired;

Table.propTypes = {
  headers: propTypeColumns,
  dataset: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      columns: propTypeColumns
    }).isRequired
  ).isRequired,
  columnWidths: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired
  ),
  condensed: PropTypes.bool,
  rootRef: PropTypes.any,
  className: PropTypes.string
};

export { TableProps, Table };
