import React from 'react';
import Button from './index';

export default () => (
  <div style={{ padding: '20px' }}>
    <Button animate disabled>
      Non-punk
    </Button>{' '}
    <Button animate disabled layer='success'>
      Steampunk
    </Button>{' '}
    <Button animate>Cyberpunk</Button>{' '}
    <Button animate layer='success'>
      <i className='mdi mdi-chemical-weapon' /> Sci Fi
    </Button>{' '}
    <Button animate layer='alert'>
      High Tech <i className='mdi mdi-robot' />
    </Button>
  </div>
);
