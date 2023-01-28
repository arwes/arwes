import React, { ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { Text } from '@arwes/react-text';

const Sandbox = (): ReactElement => {
  return (
    <Text style={{ color: '#ddd' }}>
      Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
      sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
      Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
      adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et
      dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, qui
      nostrum exercitationem ullam corporis suscipit.
    </Text>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
