import React, {
  type ReactElement,
  type CSSProperties,
  type ForwardedRef,
  useRef,
  useEffect
} from 'react';
import { cx } from '@arwes/tools';

interface IlluminatorProps {
  color?: string
  size?: number
  className?: string
  style?: CSSProperties
  elementRef?: ForwardedRef<SVGGElement>
}

const Illuminator = (props: IlluminatorProps): ReactElement => {
  const {
    color = 'hsl(0 0% 50% / 5%)',
    size = 300,
    className,
    style
  } = props;

  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current as HTMLDivElement;
    const parentElement = element.parentElement as Element;

    const onMove = (event: MouseEvent): void => {
      const bounds = parentElement.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      element.style.opacity = '1';
      element.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
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
  }, []);

  return (
    <div
      role='presentation'
      className={cx('arwes-react-frames-illuminator', className)}
      style={{
        position: 'absolute',
        width: size,
        height: size,
        transition: 'opacity 200ms ease-out',
        opacity: 0,
        pointerEvents: 'none',
        borderRadius: '50%',
        background: `radial-gradient(${color} 0%, transparent 70%)`,
        ...style
      }}
      ref={elementRef}
    />
  );
};

export type { IlluminatorProps };
export { Illuminator };
