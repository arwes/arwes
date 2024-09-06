import { test, expect } from 'vitest'

import { formatAnimatedCSSPropsShorthands } from './formatAnimatedCSSPropsShorthands'

test('Should merge transform distances shorthands', () => {
  const received = formatAnimatedCSSPropsShorthands({
    opacity: 0,
    x: 100,
    y: 200
  })
  const expected = {
    opacity: 0,
    transform: 'translateX(100px) translateY(200px)'
  }
  expect(received).toEqual(expected)
})

test('Should pass no-shorthands props', () => {
  const received = formatAnimatedCSSPropsShorthands({
    opacity: 0.5,
    width: '100px'
  })
  const expected = {
    opacity: 0.5,
    width: '100px'
  }
  expect(received).toEqual(expected)
})
