import React, { type ReactElement } from 'react';
import { Animator } from '@arwes/react-animator';
import { Animated, aaOpacity, aaProperty } from '@arwes/react-animated';
import { FrameSVG, Illuminator } from '@arwes/react-frames';

const PageIndex = (): ReactElement => {
  return (
    <Animator combine>
      <main className='page-document'>
        <div className='page-document__decoration'>
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
        </div>

        <div className='page-document__overflow'>
          <Animator>
            <Animated
              className='page-document__container'
              animated={[aaOpacity(), aaProperty('y', 16, 0)]}
            >
              <div className='page-document__content'>
                <h2>Futuristic Sci-Fi UI Web Framework</h2>
                <hr />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <img src='/assets/images/background-large.webp' />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
            </Animated>
          </Animator>
        </div>
      </main>
    </Animator>
  );
};

export default PageIndex;
