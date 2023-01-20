import React, { ReactElement, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { animate } from 'motion';
import { AnimatorInterface, AnimatorNode } from '@arwes/animator';
import { Animator, useAnimator } from '@arwes/react-animator';

interface AnimatorUIListenerProps {
  children: number
}

const AnimatorUIListener = (props: AnimatorUIListenerProps): ReactElement => {
  const elementRef = useRef<HTMLDivElement>(null);
  const animator = useAnimator() as AnimatorInterface;

  useEffect(() => {
    const element = elementRef.current as HTMLDivElement;

    // Set a reference from the node to the element and viceversa.
    element.dataset.id = animator.node.id;
    animator.node.control.setForeignRef(element);

    animator.node.subscribers.add(node => {
      const { duration } = node;

      switch (node.state) {
        case 'entering': {
          animate(
            element,
            { opacity: [0.2, 1] },
            { duration: duration.enter }
          );
          break;
        }
        case 'exiting': {
          animate(
            element,
            { opacity: [1, 0.2] },
            { duration: duration.exit }
          );
          break;
        }
      }
    });
  }, []);

  return (
    <div
      ref={elementRef}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'auto',
        height: '20vh',
        backgroundColor: '#055',
        color: '#fff',
        fontSize: '2rem',
        opacity: 0.2
      }}
    >
      {props.children}
    </div>
  );
};

const Sandbox = (): ReactElement => {
  const rootNodeRef = useRef<AnimatorNode>(null);

  useEffect(() => {
    const rootNode = rootNodeRef.current as unknown as AnimatorNode;
    const childrenNodes = Array.from(rootNode.children);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const element = entry.target as HTMLDivElement;
        const id = element.dataset.id as string;
        const childNode = childrenNodes.find(node => id === node.id) as AnimatorNode;

        // If the node element is visible, enter only that child node
        // in the parent node manager.
        if (entry.isIntersecting) {
          rootNode.manager.enterChildren([childNode]);
        }
        // Otherwise, directly exit the child node.
        else {
          childNode.send('exit');
        }
      });
    }, {
      threshold: 0.99
    });

    childrenNodes.forEach(node => {
      const element = node.control.getForeignRef() as HTMLDivElement;
      observer.observe(element);
    });
  }, []);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
        padding: '1rem'
      }}
    >
      <Animator
        // Parent node is not activated so the managing happens externally.
        active={false}
        manager='stagger'
        nodeRef={rootNodeRef}
      >
        {Array(100).fill(0).map((_, index) =>
          <Animator key={index}>
            <AnimatorUIListener>
              {index}
            </AnimatorUIListener>
          </Animator>
        )}
      </Animator>
    </div>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
