import { type ReactElement, type ReactNode } from 'react';
import { type AnimatedProp, Animated, FrameSVGOctagon, cx } from '@arwes/react';
import * as classes from './Card.css';

interface CardProps {
  className?: string
  animated?: AnimatedProp
  src: string
  srcAlt: string
  title: ReactNode
  children: ReactNode
}

const Card = (props: CardProps): ReactElement => {
  const { className, animated, src, srcAlt, title, children } = props;

  return (
    <Animated
      as='article'
      className={cx(classes.root, className)}
      animated={animated}
    >
      <FrameSVGOctagon
        squareSize={16}
        leftBottom={false}
        rightTop={false}
      />
      <div className={classes.container}>
        <div className={classes.asset}>
          <img
            className={classes.image}
            src={src}
            alt={srcAlt}
          />
        </div>
        <div className={classes.content}>
          <h1 className={classes.title}>
            {title}
          </h1>
          <div className={classes.children}>
            {children}
          </div>
        </div>
      </div>
    </Animated>
  );
};

export type { CardProps };
export { Card };
