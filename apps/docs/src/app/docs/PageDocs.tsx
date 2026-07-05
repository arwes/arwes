'use client'

import { Animated, Animator, Text, cx } from '@arwes/react'
import Link from 'next/link'
import {
  Code as IconDocsDevelop,
  DesignNib as IconDocsDesign,
  Community as IconDocsCommunity
} from 'iconoir-react'

import { Hr, Card, ArwesLogoIcon } from '@/ui'

const PageDocs = (): JSX.Element => {
  return (
    <Animator combine manager="sequence">
      <div
        className={cx('relative', 'flex-1 overflow-y-auto', 'flex p-4 min-w-0 min-h-0', 'md:p-8')}
      >
        <Animator duration={{ enter: 1 }}>
          <div className="absolute inset-0 flex">
            <ArwesLogoIcon
              className="m-auto size-24 md:size-32 opacity-0"
              animated={[
                {
                  initialStyle: { opacity: 1 },
                  transitions: {
                    entering: { scale: [1.25, 1], rotate: [-90, 0], duration: 0.75 }
                  }
                },
                { transitions: { entering: { opacity: 0, delay: 0.75, duration: 0.25 } } },
                {
                  transitions: {
                    entering: ({ $, animate, stagger }) =>
                      animate(
                        [...$('[data-name="out"]'), ...$('[data-name="center"]')],
                        { opacity: [0, 1, 0.5, 1] },
                        { delay: stagger(0.1), duration: 0.5 }
                      )
                  }
                },
                {
                  transitions: {
                    entering: ({ $, animate }) =>
                      animate(
                        $('[data-name="out-bg"], [data-name="middle"]'),
                        { opacity: [0, 1] },
                        { delay: 0.2, duration: 0.5 }
                      )
                  }
                }
              ]}
              hasRotation={false}
            />
          </div>
        </Animator>

        <Animator combine>
          <div
            className={cx(
              'relative flex flex-col gap-8 m-auto min-w-0 min-h-0 max-w-screen-xl',
              'md:grid md:grid-cols-2 md:items-center md:gap-12',
              'lg:gap-16'
            )}
          >
            <Animator combine manager="stagger">
              <article className="flex flex-col gap-6 prose prose-sm lg:prose-base lg:gap-8">
                <Animator>
                  <Text as="h1" className="!m-0" fixed>
                    Futuristic Sci-Fi UI Web Framework
                  </Text>
                </Animator>

                <Animator>
                  <Hr
                    className="!m-0 origin-left"
                    size={2}
                    animated={[['scaleX', 0, 1]]}
                    direction="both"
                  />
                </Animator>

                <Animator>
                  <Text className="!m-0">
                    ARWES is a web framework to build user interfaces based on futuristic science
                    fiction designs, animations, and sound effects. The concepts behind are
                    opinionated with influences from{' '}
                    <a href="https://aesthetics.fandom.com/wiki/Cyberprep" target="_blank">
                      Cyberprep
                    </a>{' '}
                    and productions like{' '}
                    <a href="http://robertsspaceindustries.com" target="_blank">
                      Star Citizen
                    </a>
                    ,{' '}
                    <a href="https://www.halowaypoint.com/en-us/games" target="_blank">
                      Halo
                    </a>
                    ,{' '}
                    <a href="https://nikke-en.com" target="_blank">
                      NIKKE
                    </a>
                    , and{' '}
                    <a href="https://www.mechabreak.com/index" target="_blank">
                      Mecha Break
                    </a>
                    . It tries to inspire advanced science and technology.
                  </Text>
                </Animator>

                <Animator>
                  <Animated
                    as="nav"
                    className="flex flex-row flex-wrap !m-0 gap-1 lg:flex-nowrap"
                    animated={{
                      transitions: {
                        entering: ({ $, duration, animate, stagger }) =>
                          animate(
                            $('a'),
                            { opacity: [0, 1, 0.5, 1] },
                            { duration, delay: stagger(0.05) }
                          ),
                        exiting: { opacity: [1, 0, 0.5, 0] }
                      }
                    }}
                  >
                    <a
                      className="brightness-[0.8] transition-all ease-out duration-200 hover:brightness-100"
                      href="https://github.com/arwes/arwes"
                      target="_blank"
                    >
                      <img
                        className="!m-0"
                        src="https://img.shields.io/github/stars/arwes/arwes.svg?style=flat-square&label=stars"
                        alt="Github Stars"
                      />
                    </a>
                    <a
                      className="brightness-[0.8] transition-all ease-out duration-200 hover:brightness-100"
                      href="https://npmjs.org/package/arwes"
                      target="_blank"
                    >
                      <img
                        className="!m-0"
                        alt="npm"
                        src="https://img.shields.io/npm/dm/arwes?label=installs&style=flat-square"
                      />
                    </a>
                    <a
                      className="brightness-[0.8] transition-all ease-out duration-200 hover:brightness-100"
                      href="https://github.com/arwes/arwes/blob/main/LICENSE"
                      target="_blank"
                    >
                      <img
                        className="!m-0"
                        src="https://img.shields.io/github/license/arwes/arwes.svg?maxAge=2592000&style=flat-square"
                        alt="License"
                      />
                    </a>
                  </Animated>
                </Animator>
              </article>
            </Animator>

            <Animator combine manager="stagger" duration={{ stagger: 0.1 }}>
              <div className="flex flex-col gap-6 lg:gap-8">
                <Animator>
                  <Link href="/docs/design">
                    <Card
                      title="Design"
                      description="Some insights and recommendations on design."
                      icon={<IconDocsDesign />}
                    />
                  </Link>
                </Animator>
                <Animator>
                  <Link href="/docs/develop">
                    <Card
                      title="Develop"
                      description="Learn to create web apps with the framework."
                      icon={<IconDocsDevelop />}
                    />
                  </Link>
                </Animator>
                <Animator>
                  <Link href="/docs/community">
                    <Card
                      title="Community"
                      description="See what others are building and sharing."
                      icon={<IconDocsCommunity />}
                    />
                  </Link>
                </Animator>
              </div>
            </Animator>
          </div>
        </Animator>
      </div>
    </Animator>
  )
}

export { PageDocs }
