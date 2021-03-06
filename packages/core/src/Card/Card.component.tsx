/* @jsx jsx */
import { FC, MutableRefObject, useRef, useMemo, ReactNode, CSSProperties } from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';
import { WithAnimatorInputProps } from '@arwes/animation';
import { WithBleepsInputProps } from '@arwes/sounds';

import { Text } from '../Text';
import { generateStyles } from './Card.styles';

interface CardProps {
  image: {
    src: string
    alt?: string | null
  }
  title?: ReactNode
  options?: ReactNode
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
    title,
    options,
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
            style={{ backgroundImage: `url(${image.src})` }}
            src={image.src}
            alt={image.alt || ''}
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
          <div
            className='arwes-card__content-bg'
            css={styles.contentBg}
          />

          {!!title && (
            <header
              className='arwes-card__header'
              css={styles.header}
            >
              <Text
                as='h1'
                className='arwes-card__title'
                css={styles.title}
              >
                {title}
              </Text>
            </header>
          )}

          <div
            className='arwes-card__children'
            css={styles.children}
          >
            {children}
          </div>

          {!!options && (
            <div
              className='arwes-card__options'
              css={styles.options}
            >
              {options}
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
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string
  }).isRequired,
  title: PropTypes.node,
  options: PropTypes.node,
  hover: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  rootRef: PropTypes.any
};

export { CardProps, Card };
