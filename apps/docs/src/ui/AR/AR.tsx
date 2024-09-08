import { type HTMLAttributes } from 'react'
import { Animated, Animator, Text, type TextProps, cx } from '@arwes/react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, FastArrowRight, OpenNewWindow } from 'iconoir-react'
import { animate, stagger } from 'motion'

import { settings, theme } from '@/config'
import { type HrProps, Hr } from '../Hr'
import { Button } from '../Button'
import { ButtonContent } from '../ButtonContent'
import { type TableProps, type RowProps, type CellProps, Table, Row, Cell } from '../Table'
import { type CodeBlockProps, CodeBlock } from '../CodeBlock'
import { type BreadcrumbsProps, Breadcrumbs } from '../Breadcrumbs'
import { NavPath } from '../NavPath'

const AR = {
  Header: ({ children, ...props }: HTMLAttributes<HTMLDivElement>): JSX.Element => (
    <Animator combine manager="stagger">
      <Animated
        {...props}
        as="header"
        className={cx('flex flex-col gap-6 mb-6 lg:gap-8 lg:mb-8', props.className)}
      >
        <div className="flex-1 flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-4">
          <Animator>
            <Text as="h1" className="!m-0" fixed>
              {children}
            </Text>
          </Animator>

          <Animator>
            <NavPath
              animated={{
                transitions: {
                  entering: ({ $, duration }) =>
                    animate(
                      $(':scope > *'),
                      { opacity: [0, 1, 0.5, 1] },
                      { duration, delay: stagger(0.01) }
                    ),
                  exiting: { opacity: [1, 0, 0.5, 0] }
                }
              }}
            />
          </Animator>
        </div>

        <Hr className="!m-0 origin-left" direction="both" animated={[['scaleX', 0, 1]]} />
      </Animated>
    </Animator>
  ),

  H2: ({ children, ...props }: HTMLAttributes<HTMLHeadingElement> & TextProps): JSX.Element => (
    <Animator>
      <Text
        {...props}
        as="h2"
        contentClassName={cx('flex flex-row items-center gap-2', props.contentClassName)}
        fixed
      >
        {children}
      </Text>
    </Animator>
  ),

  H3: ({ children, ...props }: HTMLAttributes<HTMLHeadingElement> & TextProps): JSX.Element => (
    <Animator>
      <Text {...props} as="h3" fixed>
        {children}
      </Text>
    </Animator>
  ),

  HR: (props: HrProps): JSX.Element => (
    <Animator>
      <Hr
        {...props}
        className={cx('origin-left not-prose', props.className)}
        animated={[
          ['scaleX', 0, 1],
          ...(Array.isArray(props.animated) ? props.animated : [props.animated])
        ]}
      />
    </Animator>
  ),

  P: ({ children, ...props }: HTMLAttributes<HTMLParagraphElement>): JSX.Element => (
    <Animator>
      <Animated
        {...props}
        as="p"
        className={cx('text-pretty', props.className)}
        animated={['flicker']}
      >
        {children}
      </Animated>
    </Animator>
  ),

  Blockquote: ({ children, ...props }: HTMLAttributes<HTMLDivElement>): JSX.Element => (
    <Animator>
      <Animated {...props} as="blockquote" animated={['flicker']}>
        {children}
      </Animated>
    </Animator>
  ),

  UL: ({ children, ...props }: HTMLAttributes<HTMLUListElement>): JSX.Element => (
    <Animator>
      <Animated<HTMLUListElement>
        {...props}
        as="ul"
        animated={{
          transitions: {
            entering: ({ $, duration }) =>
              animate($('li'), { opacity: [0, 1, 0.5, 1] }, { duration, delay: stagger(0.02) }),
            exiting: { opacity: [1, 0, 0.5, 0] }
          }
        }}
      >
        {children}
      </Animated>
    </Animator>
  ),

  OL: ({ children, ...props }: HTMLAttributes<HTMLOListElement>): JSX.Element => (
    <Animator>
      <Animated<HTMLOListElement>
        {...props}
        as="ol"
        animated={{
          transitions: {
            entering: ({ $, duration }) =>
              animate($('li'), { opacity: [0, 1, 0.5, 1] }, { duration, delay: stagger(0.02) }),
            exiting: { opacity: [1, 0, 0.5, 0] }
          }
        }}
      >
        {children}
      </Animated>
    </Animator>
  ),

  Table: ({ children, ...props }: TableProps): JSX.Element => (
    <Animator>
      <Table
        {...props}
        animated={{
          transitions: {
            entering: ({ $ }) =>
              animate($('[role="row"]'), { opacity: [0, 1, 0.5, 1] }, { delay: stagger(0.01) }),
            exiting: ({ $ }) => animate($('[role="row"]'), { opacity: 0 })
          }
        }}
      >
        {children}
      </Table>
    </Animator>
  ),
  Row: (props: RowProps) => <Row {...props} />,
  Cell: (props: CellProps) => <Cell {...props} />,

  CodeBlock: (props: CodeBlockProps) => (
    <Animator combine manager="stagger">
      <CodeBlock {...props} />
    </Animator>
  ),

  Links: (props: {
    compact?: boolean
    links: Array<{ href: string; target?: string; text: string; icon?: React.ReactNode }>
  }): JSX.Element => {
    return (
      <Animator>
        <Animated
          as="nav"
          data-name="links"
          className={cx(
            'grid gap-4',
            props.compact ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'
          )}
          animated={{
            transitions: {
              entering: ({ $, duration }) =>
                animate(
                  $('button'),
                  { opacity: [0, 1, 0.5, 1] },
                  { duration, delay: stagger(0.05) }
                ),
              exiting: { opacity: [1, 0, 0.5, 0] }
            }
          }}
        >
          {props.links.map(({ href, target, text, icon }) => (
            <Link key={href} className="w-full" href={href} target={target}>
              <ButtonContent className="w-full" tabIndex={-1}>
                <span>{text}</span>
                {icon || (target === undefined ? <FastArrowRight /> : <OpenNewWindow />)}
              </ButtonContent>
            </Link>
          ))}
        </Animated>
      </Animator>
    )
  },

  Breadcrumbs: (props: BreadcrumbsProps): JSX.Element => (
    <Animator>
      <Breadcrumbs
        {...props}
        className={cx('mb-6 lg:mb-8', props.className)}
        animated={['flicker']}
      />
    </Animator>
  ),

  Navigation: (props: {
    prevHref?: string
    prev?: string
    next?: string
    nextHref?: string
  }): JSX.Element => (
    <Animator>
      <nav className={cx('flex flex-col gap-6 mt-6 lg:gap-8 lg:mt-8')}>
        <Hr className="!m-0 origin-left" direction="both" animated={[['scaleX', 0, 1]]} />

        <div
          className={cx(
            'flex-1 flex flex-row gap-4',
            props.prevHref && props.nextHref && 'justify-between',
            props.prevHref && !props.nextHref && 'justify-start',
            !props.prevHref && props.nextHref && 'justify-end'
          )}
        >
          {!!props.prevHref && (
            <Link href={props.prevHref}>
              <Button tabIndex={-1} animated={['flicker', ['x', theme.space(2), 0, 0]]}>
                <ArrowLeft />
                <span>{props.prev}</span>
              </Button>
            </Link>
          )}
          {!!props.nextHref && (
            <Link href={props.nextHref}>
              <Button tabIndex={-1} animated={['flicker', ['x', theme.space(-2), 0, 0]]}>
                <span>{props.next}</span>
                <ArrowRight />
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </Animator>
  ),

  Playground: (props: { className?: string; url: string }): JSX.Element => (
    <Animator>
      <Animated
        as="iframe"
        data-name="playground"
        className={cx('block w-full', props.className)}
        src={`${settings.apps.play.url}${props.url}`}
        animated={['flicker']}
      />
    </Animator>
  )
}

export { AR }
