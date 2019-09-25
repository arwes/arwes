import { useContext } from 'react';
import { EnergyContext } from '../EnergyContext';

function useEnergy () {
  return useContext(EnergyContext);
}

export { useEnergy };
