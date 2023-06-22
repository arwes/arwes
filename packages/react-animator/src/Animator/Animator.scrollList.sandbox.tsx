// This sandbox does not support dynamic list items rendering,
// and does not provide component clean up for list items animations.

import React, { type ReactElement, useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { animate, stagger } from 'motion';
import { Animator, useAnimator } from '@arwes/react-animator';
import { Animated, aaOpacity } from '@arwes/react-animated';

const ScrollList = (): ReactElement => {
  const listElementRef = useRef<HTMLDivElement>(null);
  const itemsElementsRef = useRef<HTMLDivElement[]>([]);
  const animator = useAnimator();

  useEffect(() => {
    const listElement = listElementRef.current;

    if (!animator || !listElement) {
      return;
    }

    const observer = new window.IntersectionObserver(entries => {
      const items = [...entries]
        .filter(entry => entry.target && entry.isIntersecting)
        .map(entry => entry.target as HTMLDivElement)
        .filter(target => !target.dataset.visible)
        .sort((a, b) => Number(a.dataset.index) - Number(b.dataset.index));

      if (items.length) {
        const staggerDelay = 0.025;
        const staggerMaxItems = 30;
        const staggerTime = Math.min(
          staggerDelay,
          staggerDelay * (1 / (items.length / staggerMaxItems))
        );

        items.forEach(item => {
          item.dataset.visible = 'true';
        });

        animate(
          items,
          { opacity: 1 },
          {
            duration: animator.node.duration.enter,
            delay: stagger(staggerTime)
          }
        );
      }
    }, {
      root: listElement,
      rootMargin: '0px',
      threshold: 0.5
    });

    const unsubscribe = animator.node.subscribe(node => {
      switch (node.state) {
        case 'entering': {
          itemsElementsRef.current.forEach(element => observer.observe(element));
          break;
        }
        case 'exiting': {
          if (itemsElementsRef.current.length) {
            itemsElementsRef.current.forEach(element => {
              element.dataset.visible = '';
              observer.unobserve(element);
            });
            animate(
              itemsElementsRef.current,
              { opacity: 0 },
              { duration: node.duration.exit }
            );
          }
          break;
        }
      }
    });

    return () => {
      unsubscribe();
      observer.disconnect();
    };
  }, [animator]);

  return (
    <Animated
      ref={listElementRef}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '1rem',
        overflowY: 'auto',
        width: 300,
        height: 300
      }}
      animated={aaOpacity()}
    >
      {Array(100).fill(null).map((_, index) => (
        <div
          key={index}
          ref={ref => {
            if (ref) {
              itemsElementsRef.current.push(ref);
            }
          }}
          data-index={index}
          style={{
            padding: '0.5rem',
            color: '#fff',
            backgroundColor: '#555',
            opacity: animator ? 0 : undefined
          }}
        >
          {index}
        </div>
      ))}
    </Animated>
  );
};

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const tid = setInterval(() => setActive(active => !active), 3000);
    return () => clearInterval(tid);
  }, []);

  return (
    <Animator active={active}>
      <ScrollList />
    </Animator>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
