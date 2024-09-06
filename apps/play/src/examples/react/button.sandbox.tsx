import React, { type ReactNode, type MouseEvent, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createThemeUnit,
  createThemeMultiplier,
  createThemeColor,
  Animator,
  Animated,
  AnimatedProp,
  useFrameAssembler,
  FrameOctagon,
  Illuminator,
  BleepsProviderSettings,
  BleepsProvider,
  useBleeps,
  memo,
  cx,
  styleFrameClipOctagon
} from '@arwes/react'

const addStyles = (css: string) => {
  const style = document.createElement('style')
  style.innerHTML = css
  document.body.appendChild(style)
}

const theme = {
  space: createThemeUnit((index) => `${index * 0.25}rem`),
  spacen: createThemeMultiplier((index) => index * 4),
  colors: {
    background: 'hsla(180, 100%, 3%)',
    primary: createThemeColor((i) => [180, 100, 100 - i * 10]),
    secondary: createThemeColor((i) => [60, 100, 100 - i * 10])
  },
  fontFamily: 'Tomorrow, sans-serif'
}

addStyles(`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body {
    font-family: ${theme.fontFamily};
    background: ${theme.colors.background};
  }
`)

type BleepsNames = 'hover' | 'click'
const bleepsSettings: BleepsProviderSettings<BleepsNames> = {
  master: { volume: 0.5 },
  categories: {
    background: { volume: 0.25 },
    transition: { volume: 0.5 },
    interaction: { volume: 0.75 },
    notification: { volume: 1 }
  },
  bleeps: {
    hover: {
      category: 'background',
      sources: [
        { src: '/assets/sounds/hover.webm', type: 'audio/webm' },
        { src: '/assets/sounds/hover.mp3', type: 'audio/mpeg' }
      ]
    },
    click: {
      category: 'interaction',
      sources: [
        { src: '/assets/sounds/click.webm', type: 'audio/webm' },
        { src: '/assets/sounds/click.mp3', type: 'audio/mpeg' }
      ]
    }
  }
}

type ButtonProps = {
  className?: string
  color?: 'primary' | 'secondary'
  variant?: 'fill' | 'outline'
  animated?: AnimatedProp
  children: ReactNode
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}
const Button = memo((props: ButtonProps): JSX.Element => {
  const { className, color = 'primary', variant = 'fill', animated, children, onClick } = props

  const bleeps = useBleeps<BleepsNames>()
  const frameRef = useRef<SVGSVGElement>(null)

  useFrameAssembler(frameRef)

  return (
    <Animated<HTMLButtonElement>
      as="button"
      className={cx('button', `button-${color}`, `button-${variant}`, className)}
      animated={['fade', ...(Array.isArray(animated) ? animated : [animated])]}
      onMouseEnter={() => {
        bleeps.hover?.play()
      }}
      onClick={(event) => {
        bleeps.click?.play()
        onClick?.(event)
      }}
    >
      <div className="button-back">
        <Illuminator size={theme.spacen(50)} color={theme.colors[color](3, { alpha: 0.2 })} />
      </div>
      <FrameOctagon elementRef={frameRef} style={{ zIndex: 0 }} squareSize={theme.spacen(2)} />
      <div className="button-content">{children}</div>
    </Animated>
  )
})
addStyles(`
  .button {
    position: relative;
    display: inline-flex;
    outline: none;
    margin: 0;
    border: none;
    padding: 0 ${theme.space(8)};
    line-height: ${theme.space(8)};
    font-size: 0.75rem;
    font-family: ${theme.fontFamily};
    letter-spacing: 1px;
    text-transform: uppercase;
    color: ${theme.colors.primary(5)};
    background: transparent;
    cursor: pointer;
    user-select: none;
    transition-property: opacity, color;
    transition-duration: 0.2s;
    transition-timing-function: ease-out;
  }

  .button-back {
    position: absolute;
    inset: 0;
    overflow: hidden;
    clip-path: ${styleFrameClipOctagon({ squareSize: theme.spacen(2) })};
  }

  .button-content {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: ${theme.space(2)};
  }

  .button .arwes-frames-framesvg {
    transition-property: opacity, transform;
    transition-duration: 0.2s;
    transition-timing-function: ease-out;
  }
  .button:hover .arwes-frames-framesvg,
  .button:focus .arwes-frames-framesvg {
    transform: scale(1.05);
  }
  .button [data-frame] {
    transition-property: opacity, color;
    transition-duration: 0.2s;
    transition-timing-function: ease-out;
  }
  .button [data-name=line] {
    color: ${theme.colors.primary(5)};
  }
  .button:hover [data-name=line],
  .button:focus [data-name=line] {
    color: ${theme.colors.primary(4)};
  }
  .button [data-name=bg] {
    color: ${theme.colors.primary(9)};
  }
  .button:hover [data-name=bg],
  .button:focus [data-name=bg] {
    color: ${theme.colors.primary(8)};
  }

  .button-secondary {
    color: ${theme.colors.secondary(5)};
  }
  .button-secondary [data-name=line] {
    color: ${theme.colors.secondary(5)};
  }
  .button-secondary:hover [data-name=line],
  .button-secondary:focus [data-name=line] {
    color: ${theme.colors.secondary(4)};
  }
  .button-secondary [data-name=bg] {
    color: ${theme.colors.secondary(9)};
  }
  .button-secondary:hover [data-name=bg],
  .button-secondary:focus [data-name=bg] {
    color: ${theme.colors.secondary(8)};
  }

  .button-fill {}

  .button-outline {}
  .button-outline [data-name=bg] {
    display: none;
  }
`)

const IconExample = memo(
  (): JSX.Element => (
    <svg
      width="1.25em"
      height="1.25em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13 6L19 12L13 18" stroke="currentcolor" strokeWidth="1.5" />
      <path d="M5 6L11 12L5 18" stroke="currentcolor" strokeWidth="1.5" />
    </svg>
  )
)

const Sandbox = (): JSX.Element => {
  const [active, setActive] = useState(true)

  useEffect(() => {
    const tid = setInterval(() => setActive(!active), active ? 3_000 : 1_000)
    return () => clearTimeout(tid)
  }, [active])

  return (
    <BleepsProvider {...bleepsSettings}>
      <Animator active={active}>
        <div style={{ margin: '1rem' }}>
          <Button color="secondary" variant="fill">
            My Button <IconExample />
          </Button>
        </div>
      </Animator>
    </BleepsProvider>
  )
}

createRoot(document.querySelector('#root')!).render(<Sandbox />)
