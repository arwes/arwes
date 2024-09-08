import type { FrameSettingsPathDimension } from '../types.js'

const formatFrameDimension = (size: number, dimension: FrameSettingsPathDimension): string => {
  if (typeof dimension === 'number') {
    return String(dimension)
  }

  if (/[^\d.\-+*/%\s()]/.test(dimension)) {
    throw new Error(
      'ARWES formatFramePath does not support formulas with text different from math expressions.'
    )
  }

  const formula = String(dimension).replace(/(\d{1,}\.)?\d{1,}%/g, (percentage) =>
    String(size * (Number(percentage.replace('%', '')) / 100))
  )

  // eslint-disable-next-line no-eval
  return String(eval(formula))
}

export { formatFrameDimension }
