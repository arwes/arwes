/* @jsx jsx */
import { FC, MutableRefObject, useRef, useMemo, Fragment } from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';
import { WithAnimatorInputProps } from '@arwes/animation';
import { WithBleepsInputProps } from '@arwes/sounds';

import { TextProps, Text } from '../Text';
import { generateStyles } from './Figure.styles';

interface FigureProps {
  src: string
  alt?: string
  fluid?: boolean
  descriptionTextProps?: TextProps
  rootRef?: MutableRefObject<HTMLDivElement> | ((node: HTMLDivElement) => void)
  className?: string
}

const Figure: FC<FigureProps & WithAnimatorInputProps & WithBleepsInputProps> = props => {
  const {
    animator,
    bleeps,
    src,
    alt,
    fluid,
    descriptionTextProps,
    className,
    children,
    rootRef
  } = props;
  const { animate } = animator;

  const theme = useTheme();
  const styles = useMemo(
    () => generateStyles(theme, { animate, fluid }),
    [theme, animate, fluid]
  );

  const containerRef = useRef<HTMLDivElement | null>(null);

  animator.setupAnimateRefs(containerRef, theme, styles, bleeps);

  return (
    <figure
      className={cx('arwes-figure', className)}
      css={styles.root}
      ref={rootRef}
    >
      <div
        className='arwes-figure__container'
        css={styles.container}
        ref={containerRef}
      >
        <div
          className='arwes-figure__content'
          css={styles.content}
        >
          <div
            className='arwes-figure__asset'
            css={styles.asset}
          >
            <img
              className='arwes-figure__image'
              css={styles.image}
              src={src}
              alt={alt}
            />
          </div>
          {!!children && (
            <div
              className='arwes-figure__description'
              css={styles.description}
            >
              <div
                className='arwes-figure__description-bg arwes-figure__description-bg1'
                css={[styles.descriptionBg, styles.descriptionBg1]}
              />
              <div
                className='arwes-figure__description-bg arwes-figure__description-bg2'
                css={[styles.descriptionBg, styles.descriptionBg2]}
              />
              <div
                className='arwes-figure__description-bg arwes-figure__description-bg3'
                css={[styles.descriptionBg, styles.descriptionBg3]}
              />
              <figcaption
                className='arwes-figure__description-text'
                css={styles.descriptionText}
              >
                <Text {...descriptionTextProps}>
                  {children}
                </Text>
              </figcaption>
            </div>
          )}
        </div>

        <div
          className='arwes-figure__line arwes-figure__line-a arwes-figure__line-a1'
          css={[styles.line, styles.lineA1]}
        />
        <div
          className='arwes-figure__line arwes-figure__line-a arwes-figure__line-a2'
          css={[styles.line, styles.lineA2]}
        />

        <div
          className='arwes-figure__line arwes-figure__line-b arwes-figure__line-b1'
          css={[styles.line, styles.lineB1]}
        />
        <div
          className='arwes-figure__line arwes-figure__line-b arwes-figure__line-b1'
          css={[styles.line, styles.lineB2]}
        />

        {!!children && (
          <Fragment>
            <div
              className='arwes-figure__line arwes-figure__line-c'
              css={[styles.line, styles.lineC]}
            />
            <div
              className='arwes-figure__line arwes-figure__line-d'
              css={[styles.line, styles.lineD]}
            />
          </Fragment>
        )}
      </div>
    </figure>
  );
};

Figure.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  fluid: PropTypes.bool,
  descriptionTextProps: PropTypes.object,
  className: PropTypes.string,
  rootRef: PropTypes.any
};

Figure.defaultProps = {
  descriptionTextProps: {
    blink: false
  }
};

export { FigureProps, Figure };
