import { type ReactElement } from 'react';
import Link from 'next/link';
import { Page, Codepen, CollageFrame, DashboardSpeed } from 'iconoir-react';
import { Button } from '@app/ui';
import { hiddenSMDown } from '@app/styles';

const PageIndex = (): ReactElement => {
  return (
    <>
      <style jsx>{`
        .page {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .container {
          display: grid;
          row-gap: 0.5rem;
          padding: 1rem;
        }

        .title {
          display: flex;
          justify-content: center;
          margin: 0;
        }

        .logo {
          margin: 0;
          max-height: 2.5rem;
        }

        .subtitle {
          display: flex;
          justify-content: center;
          margin: 0;
          font-size: 1rem;
        }

        .nav {
          display: grid;
          grid-auto-flow: column;
          column-gap: 0.5rem;
        }

        @media (min-width: 768px) {
          .container {
            row-gap: 1rem;
          }

          .logo {
            max-height: 3.75rem;
          }

          .subtitle {
            font-size: 1.5rem;
          }

          .nav {
            column-gap: 1rem;
          }
        }
      `}</style>

      <main className='page'>
        <div className='container'>
          <h1 className='title'>
            <img
              role='heading'
              className='logo'
              src='/logotype.png'
              alt='Arwes Project'
              title='Arwes Project'
            />
          </h1>

          <h2 className='subtitle'>
            Futuristic Sci-Fi UI Web Framework
          </h2>

          <nav className='nav'>
            <Link href='/docs'>
              <Button size='small' tabIndex={-1} title='Go to Documentation'>
                <Page className={hiddenSMDown} />
                <span>Docs</span>
              </Button>
            </Link>
            <Link href='/samples'>
              <Button size='small' tabIndex={-1} title='Go to Samples'>
                <CollageFrame className={hiddenSMDown} />
                <span>Samples</span>
              </Button>
            </Link>
            <a href='/play'>
              <Button size='small' tabIndex={-1} title='Go to Playground'>
                <Codepen className={hiddenSMDown} />
                <span>Play</span>
              </Button>
            </a>
            <a href='/perf'>
              <Button size='small' tabIndex={-1} title='Go to Performance'>
                <DashboardSpeed className={hiddenSMDown} />
                <span>Perf</span>
              </Button>
            </a>
          </nav>
        </div>
      </main>
    </>
  );
};

export default PageIndex;
