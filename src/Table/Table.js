import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import AnimationComponent from '../Animation';

export default function Table (props) {

  const {
    theme,
    classes,
    Animation,
    animation,
    animate,
    show,
    headers,
    dataset,
    minWidth,
    className,
    children,
    ...etc
  } = props;
  const cls = cx(classes.root, className);

  return (
    <Animation
      animate={animate}
      show={show}
      timeout={theme.animTime}
      {...animation}
    >
      {anim => (
        <div className={cx(cls, classes[anim.status])} {...etc}>
          <div style={{ minWidth }}>
            {!children && (
            <table>
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <th key={index}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataset.filter(item => !!item).map((item, index) => (
                  <tr key={index}>
                    {item.map((value, index2) => (
                      <td key={index2}>
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>

            </table>
            )}
            {children}
          </div>
        </div>
      )}
    </Animation>
  );
}

Table.propTypes = {
  Animation: PropTypes.any.isRequired,

  theme: PropTypes.any.isRequired,
  classes: PropTypes.any.isRequired,

  animate: PropTypes.bool,
  show: PropTypes.bool,
  animation: PropTypes.object,

  /**
   * List of heading titles.
   */
  headers: PropTypes.array,

  /**
   * List of rows with their lists of columns.
   */
  dataset: PropTypes.arrayOf(
    PropTypes.array
  ),

  /**
   * The table component can be the 100% width container.
   * Configure the min width of the content, if case the container width is less
   * than this minWidth, a horizontal scroll will appear.
   */
  minWidth: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),

  /**
   * If the actual HTML `<table />` is provided, the `headers` and `dataset`
   * are ignored.
   */
  children: PropTypes.any,
};

Table.defaultProps = {
  Animation: AnimationComponent,
  show: true,
  headers: [],
  dataset: [],
};
