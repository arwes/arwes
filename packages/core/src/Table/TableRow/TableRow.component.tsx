/** @jsx jsx */
import { FC, ReactNode, useRef } from 'react';
import PropTypes from 'prop-types';
import { jsx, useTheme } from '@emotion/react';
import { cx } from '@emotion/css';
import { WithAnimatorInputProps } from '@arwes/animation';

import { styles } from './TableRow.styles';
import { TableRowAnimateRefs } from './TableRow.animator';

interface TableRowProps {
  rowValues: ReactNode[]
  isHeader?: boolean
}

const TableRow: FC<TableRowProps & WithAnimatorInputProps> = props => {
  const { animator, isHeader, rowValues } = props;
  const theme = useTheme();

  const rootRef = useRef<HTMLDivElement>(null);
  const animateRefs: TableRowAnimateRefs = useRef({ rootRef });

  animator.setupAnimateRefs(animateRefs, theme);

  return (
    <div
      css={[
        styles.row,
        isHeader ? styles.rowIsHeader : styles.rowIsBody
      ]}
      className={cx(
        'arwes-table__row',
        isHeader ? 'arwes-table__row--header' : 'arwes-table__row--body'
      )}
      ref={rootRef}
    >
      {rowValues.map((value, index) =>
        <div
          key={index}
          css={styles.cell}
          className='arwes-table__cell'
          style={{ width: `${100 / rowValues.length}%` }}
        >
          <div
            css={styles.cellContainer}
            className='arwes-table__cell-container'
          >
            <div
              css={styles.cellContent}
              className='arwes-table__cell-content'
            >
              {value}
            </div>
          </div>
          <div
            css={[styles.cellLine, isHeader && styles.cellLineHeader]}
            className='arwes-table__cell-line'
          />
        </div>
      )}
    </div>
  );
};

TableRow.propTypes = {
  // @ts-expect-error
  rowValues: PropTypes.arrayOf(PropTypes.node),
  isHeader: PropTypes.bool
};

export { TableRowProps, TableRow };
