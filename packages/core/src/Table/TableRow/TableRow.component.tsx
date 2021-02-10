/** @jsx jsx */
import { FC, ReactNode, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { jsx, useTheme } from '@emotion/react';
import { cx } from '@emotion/css';
import { WithAnimatorInputProps } from '@arwes/animation';

import { TextAnimationRefs } from '../../utils/textAnimations';
import { generateStyles } from './TableRow.styles';
import { TableRowAnimateRefs } from './TableRow.animator';

type TableRowColumnWidth = string | number;

interface TableRowProps {
  isHeader?: boolean
  rowValues: ReactNode[]
  columnWidths?: TableRowColumnWidth[]
  condensed?: boolean
}

const TableRow: FC<TableRowProps & WithAnimatorInputProps> = props => {
  const { animator, isHeader, rowValues, columnWidths, condensed } = props;
  const theme = useTheme();
  const styles = useMemo(
    () => generateStyles(theme, { animate: animator.animate, isHeader, condensed }),
    [theme, animator.animate, isHeader, condensed]
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const textAnimateRefsCollection = useRef<TextAnimationRefs[]>([]);
  const animateRefs: TableRowAnimateRefs = useRef({ rootRef, textAnimateRefsCollection });

  animator.setupAnimateRefs(animateRefs, theme, isHeader);

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
      {rowValues.map((value: ReactNode, index: number) => {
        const isLast = rowValues.length - 1 === index;
        const lessMargin = isLast ? '' : ` - ${cellMarginLateral}px`;
        const cellWidth = columnWidths
          ? `calc(${columnWidths[index] || 'auto'}${lessMargin})`
          : `calc(${100 / rowValues.length}%${lessMargin})`;

        return (
          <div
            key={index}
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
                {value}
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
  // @ts-expect-error
  rowValues: PropTypes.arrayOf(PropTypes.node),
  isHeader: PropTypes.bool,
  // @ts-expect-error
  columnWidths: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  condensed: PropTypes.bool
};

export { TableRowProps, TableRow };
