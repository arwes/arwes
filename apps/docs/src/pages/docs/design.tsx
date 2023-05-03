import { type ReactElement } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'iconoir-react';
import { Animator, Animated, Text, aa } from '@arwes/react';
import { PageContentLayout } from '@app/ui';

const Page = (): ReactElement => {
  return (
    <Animator combine manager='stagger'>
      <PageContentLayout animated={aa('y', 12, 0)}>
        <Animator>
          <Text as='h1' fixed>Design</Text>
        </Animator>
        <Animator>
          <Animated as='hr' animated={aa('scaleX', 0, 1)} />
        </Animator>
        <Animator>
          <Text>
            <Link href='/docs/develop'>
              <ArrowRight style={{ verticalAlign: 'middle' }} />
              <span> Develop</span>
            </Link>
          </Text>
        </Animator>
        <Animator>
          <Text>
            <Link href='/docs/community'>
              <ArrowRight style={{ verticalAlign: 'middle' }} />
              <span> Community</span>
            </Link>
          </Text>
        </Animator>
      </PageContentLayout>
    </Animator>
  );
};

export default Page;
