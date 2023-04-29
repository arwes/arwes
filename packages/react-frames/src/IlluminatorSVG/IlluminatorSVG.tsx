import React, {
  type ReactElement,
  type CSSProperties,
  type ForwardedRef,
  useId,
  useRef,
  useEffect
} from 'react';
import { cx } from '@arwes/tools';

interface IlluminatorSVGProps {
  color?: string
  size?: number
  className?: string
  style?: CSSProperties
  elementRef?: ForwardedRef<SVGGElement>
}

const IlluminatorSVG = (props: IlluminatorSVGProps): ReactElement => {
  const {
    color = 'hsl(0 0% 50% / 5%)',
    size = 300,
    className,
    style
  } = props;

  const gradientId = useId();
  const circleElementRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const element = circleElementRef.current as SVGCircleElement;
    const svg = element.parentElement?.parentElement as unknown as SVGSVGElement; // TODO:

    element.style.transform = `translate(-${size / 2}px, -${size / 2}px)`;

    const onMove = (event: MouseEvent): void => {
      const bounds = svg.getBoundingClientRect();
      const x = event.clientX - bounds.left + (size / 2);
      const y = event.clientY - bounds.top + (size / 2);
      element.style.opacity = '1';
      element.setAttribute('cx', String(x));
      element.setAttribute('cy', String(y));
    };

    const onHide = (): void => {
      element.style.opacity = '0';
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onHide);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onHide);
    };
  }, [color, size]);

  return (
    <g
      className={cx('arwes-react-frames-illuminatorsvg', className)}
      style={{
        pointerEvents: 'none',
        ...style
      }}
    >
      <defs>
        <radialGradient id={gradientId}>
          <stop offset='0%' stopColor={color} />
          <stop offset='100%' stopColor='transparent' />
        </radialGradient>
      </defs>
      <circle
        ref={circleElementRef}
        r={size / 2}
        style={{
          position: 'absolute',
          transition: 'opacity 200ms ease-out',
          opacity: 0
        }}
        fill={`url(#${gradientId})`}
      />
    </g>
  );
};

export type { IlluminatorSVGProps };
export { IlluminatorSVG };
