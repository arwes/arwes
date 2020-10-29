import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Energy } from '../Energy';
import { useEnergy } from '../useEnergy';

function withEnergy (options) {
  options = {
    cycles: true,
    ...options
  };
  const { cycles, ...energyOptions } = options;

  return function (Inner) {
    function EnergyManager ({ forwardRef, children, ...etc }) {
      const energy = useEnergy();
      const inner = useRef();
      const others = {};

      // Only if component requires a reference, add it.
      // This allows the component to be a function if not.
      if (cycles || forwardRef) {
        others.ref = ref => {
          inner.current = ref;
          if (forwardRef) {
            if (typeof forwardRef === 'function') {
              forwardRef(ref);
            }
            else {
              forwardRef.current = ref;
            }
          }
        };
      }

      useEffect(() => {
        if (inner && cycles) {
          if (energy.flow.entering) {
            if (!inner.current.enter) {
              throw new Error('"withEnergy" provided component requires "enter" method.');
            }
            inner.current.enter();
          }
          else if (energy.flow.exiting) {
            if (!inner.current.exit) {
              throw new Error('"withEnergy" provided component requires "exit" method.');
            }
            inner.current.exit();
          }
        }
      }, [energy.flow.value]);

      return (
        <Inner {...etc} {...others} energy={energy}>
          {children}
        </Inner>
      );
    }

    EnergyManager.propTypes = {
      forwardRef: PropTypes.any,
      children: PropTypes.any
    };

    const WithEnergy = React.forwardRef((props, ref) => {
      const { energy: energyProvided, ...etc } = props;
      const energyToConfigure = {
        ...energyOptions,
        ...energyProvided
      };

      return (
        <Energy {...energyToConfigure}>
          <EnergyManager {...etc} forwardRef={ref} />
        </Energy>
      );
    });

    WithEnergy.displayName = 'WithEnergy';
    WithEnergy.propTypes = {
      energy: PropTypes.any
    };

    return WithEnergy;
  };
}

export { withEnergy };
