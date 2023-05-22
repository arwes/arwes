import { type ReactElement, type ReactNode, useRef } from 'react';
import { Cancel } from 'iconoir-react';
import {
  Animator,
  Animated,
  FrameSVGNefrex,
  FrameSVGKranox,
  Text,
  cx,
  aa,
  aaVisibility,
  useFrameSVGAssemblingAnimation
} from '@arwes/react';

import { linkSecondary } from '@app/styles';
import * as classes from './ModalLayout.css';

interface ModalLayoutProps {
  className?: string
  title?: string
  children?: ReactNode
  onClose?: () => void
}

const ModalLayout = (props: ModalLayoutProps): ReactElement => {
  const { className, title, children, onClose } = props;

  const frame1Ref = useRef<SVGSVGElement>(null);
  const frame2Ref = useRef<SVGSVGElement>(null);

  const frame1Animation = useFrameSVGAssemblingAnimation(frame1Ref);
  const frame2Animation = useFrameSVGAssemblingAnimation(frame2Ref);

  return (
    <Animator merge combine manager='sequence'>
      <div
        role='dialog'
        className={cx(classes.root, className)}
      >
        <div role='presentation' className={classes.bg} />
        <Animated
          className={classes.container}
          animated={aa('y', 16, 0)}
        >
          <Animator>
            <Animated className={classes.frames} animated={aa('scaleY', 0.5, 1, 1)}>
              <FrameSVGKranox
                elementRef={frame1Ref}
                className={classes.frame1}
                style={{
                  top: 5,
                  bottom: 5,
                  height: 'calc(100% - 10px)'
                }}
                strokeWidth={1}
                squareSize={12}
                smallLineLength={12}
                largeLineLength={48}
                onRender={frame1Animation.onRender}
              />
              <FrameSVGNefrex
                elementRef={frame2Ref}
                className={classes.frame2}
                style={{
                  left: 7,
                  right: 7,
                  width: 'calc(100% - 14px)'
                }}
                strokeWidth={3}
                squareSize={12}
                smallLineLength={12}
                largeLineLength={48}
                onRender={frame2Animation.onRender}
              />
            </Animated>
          </Animator>
          <div className={classes.content}>
            <Animator combine manager='stagger'>
              <header className={classes.header}>
                <Animator>
                  <Text as='h1' className={classes.title} fixed>
                    {title}
                  </Text>
                </Animator>
                <Animator>
                  <Animated
                    role='button'
                    className={cx(linkSecondary, classes.close)}
                    animated={aaVisibility()}
                    onClick={onClose}
                  >
                    <Cancel />
                  </Animated>
                </Animator>
              </header>
              <Animator>
                <Animated as='hr' animated={aa('scaleX', 0, 1)} />
              </Animator>
              <main className={classes.body}>
                {children}
              </main>
            </Animator>
          </div>
        </Animated>
      </div>
    </Animator>
  );
};

export type { ModalLayoutProps };
export { ModalLayout };
