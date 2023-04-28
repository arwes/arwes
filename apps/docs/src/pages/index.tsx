import { type ReactElement } from 'react';
import Link from 'next/link';
import { Page, Codepen, CollageFrame, DashboardSpeed } from 'iconoir-react';
import { Button } from '../ui';
import { hiddenSMDown } from '../styles/utils.css';

const PageIndex = (): ReactElement => {
  return (
    <main className='main'>
      <div className='main__content'>
        <h1>
          <img src='/logotype.png' />
        </h1>

        <h2>
          Futuristic Sci-Fi UI Web Framework
        </h2>

        <nav
          style={{
            display: 'grid',
            gridAutoFlow: 'column',
            columnGap: 16,
            justifyContent: 'center'
          }}
        >
          <Link href='/docs'>
            <Button size='small' tabIndex={-1}>
              <Page className={hiddenSMDown} /> Docs
            </Button>
          </Link>
          <Link href='/samples'>
            <Button size='small' tabIndex={-1}>
              <CollageFrame className={hiddenSMDown} /> Samples
            </Button>
          </Link>
          <a href='/play'>
            <Button size='small' tabIndex={-1}>
              <Codepen className={hiddenSMDown} /> Play
            </Button>
          </a>
          <a href='/perf'>
            <Button size='small' tabIndex={-1}>
              <DashboardSpeed className={hiddenSMDown} /> Perf
            </Button>
          </a>
        </nav>
      </div>
    </main>
  );
};

export default PageIndex;
