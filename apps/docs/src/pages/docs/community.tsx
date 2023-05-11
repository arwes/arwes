import { type ReactElement } from 'react';
import { Animator, Animated, Text, BleepsOnAnimator, aa, aaVisibility } from '@arwes/react';
import { FastArrowRight } from 'iconoir-react';
import communityApps from '@repository/static/assets/community/apps/apps.json';
import type { BleepNames } from '@app/types';
import { PageContentLayout, Card } from '@app/ui';

const Page = (): ReactElement => {
  return (
    <>
      <style jsx global>{`
        .sections {
          display: grid;
          row-gap: 2rem;
        }

        .heading-icon {
          vertical-align: middle;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 1rem;
        }

        @media (min-width: 480px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 600px) {
          .grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 900px) {
          .grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>

      <Animator combine manager='stagger'>
        <Animator duration={{ enter: 0.4 }}>
          <BleepsOnAnimator<BleepNames> transitions={{ entering: 'assemble' }} />
        </Animator>
        <PageContentLayout
          animated={aa('y', 12, 0)}
          frame={false}
          floating
        >
          <div className='sections'>
            <header>
              <Animator>
                <Text as='h1' fixed>Community</Text>
              </Animator>
              <Animator>
                <Animated as='hr' animated={aa('scaleX', 0, 1)} />
              </Animator>
            </header>

            <section>
              <Animator>
                <Text as='h2' fixed>
                  <FastArrowRight className='heading-icon' />
                  <span> Applications</span>
                </Text>
              </Animator>

              <Animator combine manager='stagger'>
                <div className='grid'>
                  {communityApps.map((app, index) => (
                    <Animator key={index}>
                      <Card
                        animated={[aaVisibility(), aa('y', 8, 0, 0)]}
                        src={`/assets/community/apps/images/${app.image}`}
                        srcAlt={app.name}
                        title={
                          <a href={app.url} target='_blank'>
                            {app.name}
                          </a>
                        }
                      >
                        {!!app.repository && (
                          <p style={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            <small>
                              <a href={app.repository} target='_blank' title='Go to repository'>
                                {String(app.repository).replace('https://github.com', '')}
                              </a>
                            </small>
                          </p>
                        )}
                        <p>{app.description}</p>
                      </Card>
                    </Animator>
                  ))}
                </div>
              </Animator>
            </section>

            <section>
              <Animator>
                <Text as='h2' fixed>
                  <FastArrowRight className='heading-icon' />
                  <span> Contributors</span>
                </Text>
              </Animator>
              <Animator>
                <Text>To be done.</Text>
              </Animator>
            </section>

            <section>
              <Animator>
                <Text as='h2' fixed>
                  <FastArrowRight className='heading-icon' />
                  <span> Similars</span>
                </Text>
              </Animator>
              <Animator>
                <Text>To be done.</Text>
              </Animator>
            </section>
          </div>
        </PageContentLayout>
      </Animator>
    </>
  );
};

export default Page;
