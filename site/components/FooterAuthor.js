import React from 'react';

import Words from '../../src/Words';
import Appear from '../../src/Appear';

import Link from './Link';

export default function FooterAuthor (props) {
  const { show, onLink, ...etc } = props;
  return (
    <Link href='https://romelperez.com' onLink={onLink} {...etc}>
      <Appear className='mdi mdi-copyright' animate show={show} />
      {' '}
      <Words animate show={show}>
        2018 Romel Pérez
      </Words>
    </Link>
  );
}
