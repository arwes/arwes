import { type ReactElement, type CSSProperties, type ReactNode } from 'react';
import {
  type AnimatedProp,
  Animator,
  Animated,
  cx,
  FrameSVGOctagon,
  Illuminator,
  aaVisibility
} from '@arwes/react';

import * as classes from './PageContentLayout.css';

interface PageContentLayoutProps {
  className?: string
  style?: CSSProperties
  animated?: AnimatedProp
  children?: ReactNode
  frame?: boolean
  floating?: boolean
}

const PageContentLayout = (props: PageContentLayoutProps): ReactElement => {
  const {
    className,
    style,
    animated,
    children,
    frame = true,
    floating
  } = props;

  return (
    <Animated
      as='main'
      className={cx(classes.root, floating && classes.floating, className)}
      style={style}
      animated={animated}
    >
      {frame && (
        <Animator>
          <Animated className={classes.frame} animated={aaVisibility()}>
            <FrameSVGOctagon className='page-document__svg' />
            <Illuminator color='hsl(180 50% 50% / 5%)' size={400} />
          </Animated>
        </Animator>
      )}
      <div className={classes.overflow}>
        <div className={classes.container}>
          <div className={classes.content}>
            {children}
          </div>
        </div>
      </div>
    </Animated>
  );
};

export type { PageContentLayoutProps };
export { PageContentLayout };
