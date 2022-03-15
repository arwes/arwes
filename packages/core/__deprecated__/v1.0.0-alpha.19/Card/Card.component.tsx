/* @jsx jsx */
import { ReactNode, ReactElement, MutableRefObject, useMemo, CSSProperties } from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';
import { Animated, transitionVisibility, transitionVisibilityDelayed } from '@arwes/animated';

import { BleepsOnAnimator } from '../utils/BleepsOnAnimator';
import { Text } from '../Text';
import { generateStyles } from './Card.styles';

interface CardProps {
  image?: {
    src: string
    alt?: string | null
  }
  title?: ReactNode
  options?: ReactNode
  landscape?: boolean
  hover?: boolean
  className?: string
  style?: CSSProperties
  rootRef?: MutableRefObject<HTMLDivElement | null> | ((node: HTMLDivElement) => void)
  children?: ReactNode
}

const Card = (props: CardProps): ReactElement => {
  const {
    image,
    title,
    options,
    landscape,
    hover,
    rootRef,
    className,
    style,
    children
  } = props;

  const theme = useTheme();
  const styles = useMemo(
    () => generateStyles(theme, { landscape, hover }),
    [theme, landscape, hover]
  );

  return (
    <article
      className={cx('arwes-card', className)}
      css={styles.root}
      style={style}
      ref={rootRef}
    >
      <BleepsOnAnimator
        entering={{ name: 'object' }}
      />

      <div
        className='arwes-card__container'
        css={styles.container}
      >
        {!!image && (
          <div
            className='arwes-card__picture'
            css={styles.picture}
          >
            <Animated
              as='img'
              className='arwes-card__image'
              css={styles.image}
              style={{ backgroundImage: `url(${image.src})` }}
              src={image.src}
              alt={image.alt || ''}
              animated={transitionVisibilityDelayed}
            />
            <Animated
              className='arwes-card__line arwes-card__line-picture'
              css={[styles.line, styles.linePicture]}
              animated={[
                transitionVisibility,
                { entering: { translateX: [theme.space(4), 0] } }
              ]}
            />
          </div>
        )}

        <div
          className='arwes-card__content'
          css={styles.content}
        >
          <Animated
            className='arwes-card__content-bg'
            css={styles.contentBg}
            animated={transitionVisibilityDelayed}
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

          <Animated
            className='arwes-card__line arwes-card__line-content'
            css={[styles.line, styles.lineContent]}
            animated={[
              transitionVisibility,
              { entering: { translateY: [-theme.space(4), 0] } }
            ]}
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
  }),
  title: PropTypes.node,
  options: PropTypes.node,
  landscape: PropTypes.bool,
  hover: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  rootRef: PropTypes.any,
  children: PropTypes.any
};

export { CardProps, Card };
