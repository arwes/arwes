// The animation process is intercepted and reversed, since
// the animator is activated/deactivated before the animation
// is completed.

import React, { type ReactElement, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Animator } from '@arwes/react-animator';
import { Text } from '@arwes/react-text';

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setActive(!active), 750);
    return () => clearTimeout(timeout);
  }, [active]);

  return (
    <Animator active={active} duration={{ enter: 1, exit: 1 }}>
      <Text style={{ color: '#ddd' }} fixed>
        Nemo enim ipsam <b>voluptatem quia voluptas</b> sit aspernatur
        aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
        dolor sit amet, consectetur, <b>adipisci velit, <i>sed quia non</i></b>
        numquam eius modi tempora incidunt ut labore et dolore magnam
        <span><a href='#'>aliquam quaerat</a></span> voluptatem. Ut enim ad minima
        veniam, qui nostrum exercitationem ullam corporis suscipit.
      </Text>
    </Animator>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
