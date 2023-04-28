import { type ReactElement } from 'react';
import { Animator, Animated, Text, aa, aaVisibility } from '@arwes/react';
import { FastArrowRight } from 'iconoir-react';
import communityApps from '@repository/static/assets/community/apps/apps.json';
import { PageContentLayout, Card } from '@app/ui';

const Page = (): ReactElement => {
  return (
    <Animator combine manager='stagger'>
      <PageContentLayout
        animated={aa('y', 12, 0)}
        frame={false}
        floating
      >
        <div style={{
          display: 'grid',
          rowGap: '2rem'
        }}>
          <header
            className='page-document'
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          >
            <Animator>
              <Text as='h1' fixed>Community</Text>
            </Animator>
            <Animator>
              <Animated as='hr' style={{ transformOrigin: 'left', marginLeft: '1rem' }} animated={aa('scaleX', 0, 1)} />
            </Animator>
          </header>

          <div>
            <div className='page-document'>
              <Animator>
                <Text as='h2' fixed>
                  <FastArrowRight style={{ verticalAlign: 'middle' }} />
                  <span> Applications</span>
                </Text>
              </Animator>
            </div>

            <Animator combine manager='stagger'>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
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
          </div>

          <div className='page-document'>
            <Animator>
              <Text as='h2' fixed>
                <FastArrowRight style={{ verticalAlign: 'middle' }} />
                <span> Contributors</span>
              </Text>
            </Animator>
            <Animator>
              <Text as='p'>To be done.</Text>
            </Animator>
          </div>

          <div className='page-document'>
            <Animator>
              <Text as='h2' fixed>
                <FastArrowRight style={{ verticalAlign: 'middle' }} />
                <span> Similars</span>
              </Text>
            </Animator>
            <Animator>
              <Text as='p'>To be done.</Text>
            </Animator>
          </div>
        </div>
      </PageContentLayout>
    </Animator>
  );
};

export default Page;
