import React, { ReactElement, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Animator, AnimatorGeneralProvider } from '@arwes/react-animator';
import { Text } from '@arwes/react-text';

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const tid = setInterval(() => setActive(active => !active), 3000);
    return () => clearInterval(tid);
  }, []);

  return (
    <div style={{ color: '#ddd' }}>
      <AnimatorGeneralProvider duration={{ enter: 1 }}>
        <Animator active={active} combine manager='sequence'>
          <Animator>
            <Text as='p'>
              Numquam eius modi tempora incidunt ut labore et dolore magnam aliquam
              quaerat voluptatem. Ut enim ad minima veniam, qui nostrum.
            </Text>
          </Animator>
          <Animator>
            <Text as='p'>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
              sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
              adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et
              dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, qui
              nostrum exercitationem ullam corporis suscipit.
            </Text>
          </Animator>
          <Animator>
            <Text as='p'>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
              sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
              adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et
              dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, qui
              nostrum exercitationem ullam corporis suscipit.
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
              adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et
              dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, qui.
            </Text>
          </Animator>
        </Animator>
      </AnimatorGeneralProvider>
    </div>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
