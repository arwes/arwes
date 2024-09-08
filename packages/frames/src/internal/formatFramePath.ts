import type { FrameSettingsPathDefinition, FrameSettingsPathCommand } from '../types.js'
import { formatFrameDimension } from './formatFrameDimension.js'

const formatCommand = (
  width: number,
  height: number,
  command: FrameSettingsPathCommand
): string => {
  if (Array.isArray(command)) {
    const [name, ...dimensions] = command

    // One dimension horizontal commands.
    if (name === 'H' || name === 'h') {
      return `${name} ${formatFrameDimension(width, dimensions[0])}`
    }

    // One dimension vertical commands.
    if (name === 'V' || name === 'v') {
      return `${name} ${formatFrameDimension(height, dimensions[0])}`
    }

    // Elliptical Arc Curve commands.
    if (name === 'A' || name === 'a') {
      const [rx, ry, angle, largeArcFlag, sweepFlag, x, y] = dimensions
      const values = [
        formatFrameDimension(width, rx),
        formatFrameDimension(height, ry),
        angle,
        largeArcFlag,
        sweepFlag,
        formatFrameDimension(width, x),
        formatFrameDimension(height, y)
      ].join(',')

      return name + ' ' + values
    }

    // Multiple (x,y)+ dimensions.
    const values = dimensions
      .map((dimension, index) => {
        const isEven = index % 2 === 0
        const size = isEven ? width : height
        return formatFrameDimension(size, dimension)
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
