import { type ReactElement, type ReactNode, useId, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children?: ReactNode
}

const Modal = (props: ModalProps): ReactElement => {
  const { children } = props;

  const [enabled, setEnabled] = useState(false);
  const id = useId();

  const isBrowser = typeof window !== 'undefined' && !!window.matchMedia;
  const element = isBrowser && window.document.querySelector('#app-modal-container');

  useEffect(() => {
    setEnabled(true);
  }, []);

  if (!enabled || !element) {
    return <></>;
  }

  return createPortal(
    children,
    element,
    id
  );
};

export type { ModalProps };
export { Modal };
