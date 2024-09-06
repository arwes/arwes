import type {
  FrameSettingsPathDefinition,
  FrameSettingsPathCommand,
  FrameSettingsPathDimension
} from '../types.js'

const formatDimension = (size: number, dimension: FrameSettingsPathDimension): string => {
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

const formatCommand = (
  width: number,
  height: number,
  command: FrameSettingsPathCommand
): string => {
  if (Array.isArray(command)) {
    const [name, ...dimensions] = command

    // One dimension horizontal commands.
    if (name === 'H' || name === 'h') {
      return `${name} ${formatDimension(width, dimensions[0])}`
    }

    // One dimension vertical commands.
    if (name === 'V' || name === 'v') {
      return `${name} ${formatDimension(height, dimensions[0])}`
    }

    // Elliptical Arc Curve commands.
    if (name === 'A' || name === 'a') {
      const [rx, ry, angle, largeArcFlag, sweepFlag, x, y] = dimensions
      const values = [
        formatDimension(width, rx),
        formatDimension(height, ry),
        angle,
        largeArcFlag,
        sweepFlag,
        formatDimension(width, x),
        formatDimension(height, y)
      ].join(',')

      return name + ' ' + values
    }

    // Multiple (x,y)+ dimensions.
    const values = dimensions
      .map((dimension, index) => {
        const isEven = index % 2 === 0
        const size = isEven ? width : height
        return formatDimension(size, dimension)
      })
      .join(',')

    return name + ' ' + values
  }

  // No dimensions commands.
  return command
}

const formatFramePath = (
  width: number,
  height: number,
  path: FrameSettingsPathDefinition
): string => {
  return path.map((command) => formatCommand(width, height, command)).join(' ')
}

export { formatFramePath }
