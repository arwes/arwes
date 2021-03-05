/* @jsx jsx */
import { FC, MutableRefObject, useRef, useMemo, ReactNode, CSSProperties } from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';
import { WithAnimatorInputProps } from '@arwes/animation';
import { WithBleepsInputProps } from '@arwes/sounds';

import { generateStyles } from './Card.styles';

interface CardProps {
  image: string
  header?: ReactNode
  footer?: ReactNode
  hover?: boolean
  className?: string
  style?: CSSProperties
  rootRef?: MutableRefObject<HTMLDivElement> | ((node: HTMLDivElement) => void)
}

const Card: FC<CardProps & WithAnimatorInputProps & WithBleepsInputProps> = props => {
  const {
    animator,
    bleeps,
    image,
    header,
    footer,
    hover,
    rootRef,
    className,
    style,
    children
  } = props;
  const { animate } = animator;

  const theme = useTheme();
  const styles = useMemo(
    () => generateStyles(theme, { animate, hover }),
    [theme, animate, hover]
  );

  const containerRef = useRef<HTMLDivElement>(null);

  animator.setupAnimateRefs(containerRef, theme, bleeps);

  return (
    <article
      className={cx('arwes-card', className)}
      css={styles.root}
      style={style}
      ref={rootRef}
    >
      <div
        className='arwes-card__container'
        css={styles.container}
        ref={containerRef}
      >
        <div
          className='arwes-card__picture'
          css={styles.picture}
        >
          <img
            className='arwes-card__image'
            css={styles.image}
            src={image}
            style={{ backgroundImage: `url(${image})` }}
          />
          <div
            className='arwes-card__line arwes-card__line-picture'
            css={[styles.line, styles.linePicture]}
          />
        </div>

        <div
          className='arwes-card__content'
          css={styles.content}
        >
          <h1
            className='arwes-card__header'
            css={styles.header}
          >
            {header}
          </h1>

          <div
            className='arwes-card__children'
            css={styles.children}
          >
            {children}
          </div>

          {!!footer && (
            <div
              className='arwes-card__footer'
              css={styles.footer}
            >
              {footer}
            </div>
          )}

          <div
            className='arwes-card__line arwes-card__line-content'
            css={[styles.line, styles.lineContent]}
          />
        </div>
      </div>
    </article>
  );
};

Card.propTypes = {
  image: PropTypes.string.isRequired,
  header: PropTypes.node,
  footer: PropTypes.node,
  hover: PropTypes.bool,
  rootRef: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object
};

export { CardProps, Card };
