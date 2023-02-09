import React, { type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { Text } from '@arwes/react-text';

const Sandbox = (): ReactElement => {
  return (
    <Text style={{ color: '#ddd' }}>
      Nemo enim ipsam <b>voluptatem quia voluptas</b> sit aspernatur
      aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
      voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
      dolor sit amet, consectetur, <b>adipisci velit, <i>sed quia non</i></b>
      numquam eius modi tempora incidunt ut labore et dolore magnam
      <span><a href='#'>aliquam quaerat</a></span> voluptatem. Ut enim ad minima
      veniam, qui nostrum exercitationem ullam corporis suscipit.
    </Text>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
