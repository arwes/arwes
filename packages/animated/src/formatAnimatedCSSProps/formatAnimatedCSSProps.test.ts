import { test, expect } from 'vitest'

import { formatAnimatedCSSProps } from './formatAnimatedCSSProps'

test('Should merge transform distances shorthands', () => {
  const received = formatAnimatedCSSProps({
    opacity: 0.5,
    x: 100,
    y: 200
  })
  const expected = {
    opacity: 0.5,
    transform: 'translateX(var(--motion-translateX)) translateY(var(--motion-translateY))',
    '--motion-translateX': '100px',
    '--motion-translateY': '200px'
  }
  expect(received).toStrictEqual(expected)
})

test('Should merge transform angles shorthands', () => {
  const received = formatAnimatedCSSProps({
    opacity: 0.5,
    rotateX: 20,
    skew: '150deg'
  })
  const expected = {
    opacity: 0.5,
    transform: 'rotateX(var(--motion-rotateX)) skew(var(--motion-skew))',
    '--motion-rotateX': '20deg',
    '--motion-skew': '150deg'
  }
  expect(received).toStrictEqual(expected)
})

test('Should merge transform unitless shorthands', () => {
  const received = formatAnimatedCSSProps({
    opacity: 0.5,
    scaleY: 0.7,
    scaleZ: 0.1
  })
  const expected = {
    opacity: 0.5,
    transform: 'scaleY(var(--motion-scaleY)) scaleZ(var(--motion-scaleZ))',
    '--motion-scaleY': 0.7,
    '--motion-scaleZ': 0.1
  }
  expect(received).toStrictEqual(expected)
})

test('Should merge multiple transform shorthands', () => {
  const received = formatAnimatedCSSProps({
    opacity: 0.5,
    x: 100,
    skew: 45,
    scaleY: 1.2
  })
  const expected = {
    opacity: 0.5,
    transform:
      'translateX(var(--motion-translateX)) skew(var(--motion-skew)) scaleY(var(--motion-scaleY))',
    '--motion-translateX': '100px',
    '--motion-skew': '45deg',
    '--motion-scaleY': 1.2
  }
  expect(received).toStrictEqual(expected)
})

test('Should pass no-shorthands props', () => {
  const received = formatAnimatedCSSProps({
    opacity: 0.5,
    width: '100px'
  })
  const expected = {
    opacity: 0.5,
    width: '100px'
  }
  expect(received).toEqual(expected)
})
