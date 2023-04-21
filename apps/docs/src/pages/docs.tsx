import { type ReactElement } from 'react';
import {
  Animator,
  Animated,
  aa,
  aaVisibility,
  FrameSVG,
  Illuminator,
  Text
} from '@arwes/react';

const PageIndex = (): ReactElement => {
  return (
    <Animator combine>
      <Animated as='main' className='page-document' animated={aa('y', 12, 0)}>
        <Animator>
          <Animated className='page-document__decoration' animated={aaVisibility()}>
            <FrameSVG
              className='page-document__svg'
              paths={[
                [
                  ['M', 16, 0],
                  ['L', '100% - 16', 0],
                  ['L', '100%', 16],
                  ['L', '100%', '100% - 16'],
                  ['L', '100% - 16', '100%'],
                  ['L', 16, '100%'],
                  ['L', 0, '100% - 16'],
                  ['L', 0, 16],
                  'Z'
                ]
              ]}
            />
            <div className='page-document__illuminator'>
              <Illuminator hue='180' saturation='50%' lightness='90%' size={400} />
            </div>
          </Animated>
        </Animator>

        <div className='page-document__overflow'>
          <Animator combine manager='stagger'>
            <div className='page-document__container'>
              <div className='page-document__content'>
                <Animator>
                  <Text as='h1' dynamic={false}>Futuristic Sci-Fi UI Web Framework</Text>
                </Animator>
                <Animator>
                  <Animated as='hr' style={{ transformOrigin: 'left' }} animated={aa('scaleX', 0, 1)} />
                </Animator>
                <Animator>
                  <Text as='p' dynamic={true}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                </Animator>
                <Animator>
                  <Animated
                    as='img'
                    src='/assets/images/background-large.webp'
                    animated={aaVisibility()}
                  />
                </Animator>
                <Animator>
                  <Text as='p' dynamic={true}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                </Animator>
                <Animator>
                  <Text as='p' dynamic={true}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                </Animator>
              </div>
            </div>
          </Animator>
        </div>
      </Animated>
    </Animator>
  );
};

export default PageIndex;
