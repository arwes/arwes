import { type ReactElement } from 'react';
import { Animator, Animated, Text, aa, aaVisibility } from '@arwes/react';
import { PageContentLayout } from '../ui';

const Page = (): ReactElement => {
  return (
    <Animator combine>
      <PageContentLayout className='page-document' animated={aa('y', 12, 0)}>
        <Animator>
          <Text as='h1' fixed>Futuristic Sci-Fi UI Web Framework</Text>
        </Animator>
        <Animator>
          <Animated as='hr' style={{ transformOrigin: 'left' }} animated={aa('scaleX', 0, 1)} />
        </Animator>
        <Animator>
          <Text as='p'>Arwes is a web framework to build user interfaces based on futuristic science fiction designs, animations, and sound effects. The concepts behind are opinionated with influences from Cyberprep and Synthwave, and productions like Star Citizen, Halo, and TRON: Legacy. It tries to inspire advanced science and technology.</Text>
        </Animator>
        <Animator>
          <Animated
            as='img'
            src='/assets/images/background-large.webp'
            animated={aaVisibility()}
          />
        </Animator>
        <Animator>
          <Text as='p'>The project is under development and not ready for production yet. It is still in alpha release, so the components are being tested and their API may change as it gets completed.</Text>
        </Animator>
      </PageContentLayout>
    </Animator>
  );
};

export default Page;
