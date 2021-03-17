/** @jsx jsx */
import { FC, ReactNode, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { jsx } from '@emotion/react';
import { cx } from '@emotion/css';
import { WithAnimatorInputProps } from '@arwes/animation';

import { TextAnimationRefs } from '../../utils/textAnimations';
import { ArwesTheme } from '../../ArwesThemeProvider';
import { generateStyles } from './TableRow.styles';
import { TableRowTransitionRefs } from './TableRow.animator';

interface TableRowPropsColumn {
  id: string | number
  data: ReactNode
}

type TableRowPropsColumnWidth = string | number;

interface TableRowProps {
  theme: ArwesTheme
  columns: TableRowPropsColumn[]
  columnWidths?: TableRowPropsColumnWidth[]
  isHeader?: boolean
  condensed?: boolean
}

const TableRow: FC<TableRowProps & WithAnimatorInputProps> = props => {
  const { animator, theme, isHeader, columns, columnWidths, condensed } = props;

  const styles = useMemo(
    () => generateStyles(theme, { animate: animator.animate, isHeader, condensed }),
    [theme, animator.animate, isHeader, condensed]
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const textAnimateRefsCollection = useRef<TextAnimationRefs[]>([]);
  const transitionRefs: TableRowTransitionRefs = useRef({ rootRef, textAnimateRefsCollection });

  animator.setupAnimateRefs(transitionRefs, theme, isHeader);

  const cellMarginLateral = condensed ? theme.space(0.5) : theme.space(1);

  return (
    <div
      css={styles.row}
      className={cx(
        'arwes-table__row',
        isHeader ? 'arwes-table__row--header' : 'arwes-table__row--body'
      )}
      ref={rootRef}
    >
      {columns.map((column, index) => {
        const isLast = columns.length - 1 === index;
        const lessMargin = isLast ? '' : ` - ${cellMarginLateral}px`;
        const cellWidth = columnWidths
          ? `calc(${columnWidths[index] || 'auto'}${lessMargin})`
          : `calc(${100 / columns.length}%${lessMargin})`;

        return (
          <div
            key={column.id}
            css={styles.cell}
            className={cx(
              'arwes-table__cell',
              condensed && 'arwes-table__cell--condensed'
            )}
            style={{ flex: `0 0 ${cellWidth}` }}
          >
            <div
              css={styles.cellContainer}
              className='arwes-table__cell-container'
            >
              <div
                css={styles.cellContent}
                className='arwes-table__cell-content'
              >
                {column.data}
              </div>
            </div>
            <div
              css={styles.cellLine}
              className='arwes-table__cell-line'
            />
          </div>
        );
      })}
    </div>
  );
};

TableRow.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      data: PropTypes.node.isRequired
    }).isRequired
  ).isRequired,
  columnWidths: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired
  ),
  isHeader: PropTypes.bool,
  condensed: PropTypes.bool
};

export {
  TableRowPropsColumn,
  TableRowPropsColumnWidth,
  TableRowProps,
  TableRow
};
