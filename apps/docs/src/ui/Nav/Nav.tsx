import { Children, type ReactNode } from 'react'
import { memo, Animator, Animated, flicker, cx, styleFrameClipOctagon } from '@arwes/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Dashboard as IconRoot,
  Page as IconDocs,
  Code as IconDocsDevelop,
  DesignNib as IconDocsDesign,
  Community as IconDocsCommunity,
  CollageFrame as IconDemos,
  Codepen as IconPlay,
  DashboardSpeed as IconPerf,
  Axes as IconFundamentals,
  Cube as IconVanilla,
  Component as IconApps,
  Copy as IconSimilars
} from 'iconoir-react'

import { settings, theme } from '@/config'
import { IconTailwind, IconReact, IconSolid, IconSvelte } from '@/icons'

type ListProps = {
  className?: string
  children: ReactNode
}

const List = (props: ListProps): JSX.Element => {
  const { className, children } = props
  return (
    <Animated as="ul" className={cx('flex flex-col w-full', className)}>
      {children}
    </Animated>
  )
}

type ItemProps = {
  href: string
  icon?: ReactNode
  text: ReactNode
  children?: ReactNode
  onLink?: () => void
}

const Item = (props: ItemProps): JSX.Element => {
  const { href, icon, text, children, onLink } = props

  const pathname = usePathname()
  const matches = pathname.startsWith(href)
  const active = pathname === href

  return (
    <li className="flex flex-col">
      <Animator>
        <Animated
          animated={flicker()}
          onTransition={(element, node) => {
            if (active && node.state === 'entered') {
              requestAnimationFrame(() => {
                element.scrollIntoView({
                  block: 'center',
                  behavior: 'smooth'
                })
              })
            }
          }}
        >
          <Link
            className={cx(
              'flex font-cta text-size-9',
              'transition-all ease-out duration-200',
              !matches && 'text-primary-main-4 hover:text-primary-high-2',
              matches && 'text-secondary-main-4 hover:text-secondary-high-2'
            )}
            href={href}
            onClick={onLink}
          >
            <div
              className={cx(
                'flex-1 flex flex-row items-center gap-2 px-4 py-2',
                active && 'bg-secondary-main-3/[0.05]'
              )}
              style={{
                clipPath: styleFrameClipOctagon({
                  leftTop: false,
                  leftBottom: false,
                  squareSize: theme.space(2)
                })
              }}
            >
              {icon}
              {text}
            </div>
          </Link>
        </Animated>
      </Animator>

      {!!Children.count(children) && (
        <div className="flex pl-4">
          <List className="flex border-l border-dashed border-primary-main-9/50">{children}</List>
        </div>
      )}
    </li>
  )
}

type NavSectionProps = {
  onLink?: () => void
}

const NavDocs = (props: NavSectionProps): JSX.Element => {
  const { onLink } = props
  return (
    <>
      <Item href="/docs/design" icon={<IconDocsDesign />} text="Design" onLink={onLink} />
      <Item href="/docs/develop" icon={<IconDocsDevelop />} text="Develop" onLink={onLink}>
        <Item
          href="/docs/develop/fundamentals"
          icon={<IconFundamentals />}
          text="Fundamentals"
          onLink={onLink}
        >
          <Item href="/docs/develop/fundamentals/visual" text="Visual" onLink={onLink} />
          <Item href="/docs/develop/fundamentals/motion" text="Motion" onLink={onLink} />
          <Item href="/docs/develop/fundamentals/audio" text="Audio" onLink={onLink} />
          <Item href="/docs/develop/fundamentals/text" text="Text" onLink={onLink} />
          <Item href="/docs/develop/fundamentals/frames" text="Frames" onLink={onLink} />
          <Item href="/docs/develop/fundamentals/bgs" text="Backgrounds" onLink={onLink} />
        </Item>
        <Item href="/docs/develop/vanilla" icon={<IconVanilla />} text="Vanilla" onLink={onLink} />
        <Item
          href="/docs/develop/tailwind"
          icon={<IconTailwind />}
          text="Tailwind"
          onLink={onLink}
        />
        <Item href="/docs/develop/react" icon={<IconReact />} text="React" onLink={onLink}>
          <Item href="/docs/develop/react/animators" text="Animators" onLink={onLink} />
          <Item href="/docs/develop/react/bleeps" text="Bleeps" onLink={onLink} />
          <Item href="/docs/develop/react/text" text="Text" onLink={onLink} />
          <Item href="/docs/develop/react/frames" text="Frames" onLink={onLink} />
          <Item href="/docs/develop/react/bgs" text="Backgrounds" onLink={onLink} />
        </Item>
        <Item href="/docs/develop/solid" icon={<IconSolid />} text="Solid" onLink={onLink} />
        <Item href="/docs/develop/svelte" icon={<IconSvelte />} text="Svelte" onLink={onLink} />
      </Item>
      <Item href="/docs/community" icon={<IconDocsCommunity />} text="Community" onLink={onLink}>
        <Item href="/docs/community/apps" icon={<IconApps />} text="Apps" onLink={onLink} />
        <Item
          href="/docs/community/similars"
          icon={<IconSimilars />}
          text="Similars"
          onLink={onLink}
        />
      </Item>
    </>
  )
}

const NavRoot = (props: NavSectionProps): JSX.Element => {
  const { onLink } = props
  return (
    <Item href="/" icon={<IconRoot />} text="Root" onLink={onLink}>
      <Item href="/docs" icon={<IconDocs />} text="Docs" onLink={onLink}>
        <NavDocs onLink={onLink} />
      </Item>
      <Item href="/demos" icon={<IconDemos />} text="Demos" onLink={onLink} />
      <Item href={settings.apps.play.url} icon={<IconPlay />} text="Play" onLink={onLink} />
      <Item href={settings.apps.perf.url} icon={<IconPerf />} text="Perf" onLink={onLink} />
    </Item>
  )
}

type NavProps = {
  className?: string
  path?: 'docs'
  onLink?: () => void
}

const Nav = memo((props: NavProps): JSX.Element => {
  const { className, path, onLink } = props

  return (
    <Animator combine manager="stagger" duration={{ stagger: 0.015 }}>
      <List className={className}>
        {path === 'docs' ? <NavDocs onLink={onLink} /> : <NavRoot onLink={onLink} />}
      </List>
    </Animator>
  )
})

export { Nav }
