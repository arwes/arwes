import { useContext } from 'react';
import type { BleepsManager } from '@arwes/bleeps';

import { BleepsManagerContext } from '../internal/BleepsManagerContext';

interface UseBleepsProps {
  disabled?: boolean | undefined
}

const defaultProps: UseBleepsProps = {};

const useBleeps = <
  BleepsNames extends string,
  Manager extends BleepsManager = BleepsManager<BleepsNames>
>(props: UseBleepsProps = defaultProps): Manager['bleeps'] => {
  if (props.disabled) {
    return {};
  }

  const bleepsManager = useContext(BleepsManagerContext);
  return bleepsManager?.bleeps ?? {};
};

export type { UseBleepsProps };
export { useBleeps };
