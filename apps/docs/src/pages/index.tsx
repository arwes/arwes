import { type ReactElement } from 'react';
import Link from 'next/link';
import { Page, Codepen, CollageFrame, DashboardSpeed } from 'iconoir-react';
import { Button } from '@app/ui';

const PageIndex = (): ReactElement => {
  return (
    <main
      className='index-page'
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        textAlign: 'center'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <h1>
          <img src='/logotype.png' />
        </h1>

        <h2>Futuristic Sci-Fi UI Web Framework</h2>

        <nav
          style={{
            display: 'grid',
            gridAutoFlow: 'column',
            columnGap: '0.5rem',
            justifyContent: 'center'
          }}
        >
          <Link href='/docs'>
            <Button size='small' tabIndex={-1} title='Go to Documentation'>
              <Page />
              <span>Docs</span>
            </Button>
          </Link>
          <Link href='/samples'>
            <Button size='small' tabIndex={-1} title='Go to Samples'>
              <CollageFrame />
              <span>Samples</span>
            </Button>
          </Link>
          <a href='/play'>
            <Button size='small' tabIndex={-1} title='Go to Playground'>
              <Codepen />
              <span>Play</span>
            </Button>
          </a>
          <a href='/perf'>
            <Button size='small' tabIndex={-1} title='Go to Performance'>
              <DashboardSpeed />
              <span>Perf</span>
            </Button>
          </a>
        </nav>
      </div>
    </main>
  );
};

export default PageIndex;
