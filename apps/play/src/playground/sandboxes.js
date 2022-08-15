/* eslint-disable import/no-webpack-loader-syntax */

export const sandboxes = [
  {
    name: '@arwes/theme',
    children: [
      {
        name: 'createThemeColor',
        children: [
          { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/theme/src/createThemeColor/createThemeColor.basic.sandbox.tsx') },
          { name: 'variations', code: require('!raw-loader?esModule=false!@repository/packages/theme/src/createThemeColor/createThemeColor.variations.sandbox.tsx') }
        ]
      },
      {
        name: 'createThemeStyle',
        children: [
          { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/theme/src/createThemeStyle/createThemeStyle.basic.sandbox.tsx') }
        ]
      },
      {
        name: 'createThemeBreakpoints',
        children: [
          { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/theme/src/createThemeBreakpoints/createThemeBreakpoints.basic.sandbox.tsx') },
          { name: 'series', code: require('!raw-loader?esModule=false!@repository/packages/theme/src/createThemeBreakpoints/createThemeBreakpoints.series.sandbox.tsx') },
          { name: 'labels', code: require('!raw-loader?esModule=false!@repository/packages/theme/src/createThemeBreakpoints/createThemeBreakpoints.labels.sandbox.tsx') }
        ]
      },
      {
        name: 'createCreateTheme',
        children: [
          { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/theme/src/createCreateTheme/createCreateTheme.basic.sandbox.tsx') }
        ]
      },
      {
        name: 'createUseCreateThemeExtended',
        children: [
          { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/theme/src/createUseCreateThemeExtended/createUseCreateThemeExtended.basic.sandbox.tsx') }
        ]
      }
    ]
  },
  {
    name: '@arwes/styles',
    children: [
      {
        name: 'useStyles',
        children: [
          { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/styles/src/useStyles/useStyles.basic.sandbox.tsx') },
          { name: 'props', code: require('!raw-loader?esModule=false!@repository/packages/styles/src/useStyles/useStyles.props.sandbox.tsx') }
        ]
      },
      {
        name: 'useThemeStyles',
        children: [
          { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/styles/src/useThemeStyles/useThemeStyles.basic.sandbox.tsx') },
          { name: 'props', code: require('!raw-loader?esModule=false!@repository/packages/styles/src/useThemeStyles/useThemeStyles.props.sandbox.tsx') }
        ]
      }
    ]
  },
  {
    name: '@arwes/animator',
    children: [
      {
        name: 'Animator',
        children: [
          { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/animator/src/Animator/Animator.basic.sandbox.tsx') },
          { name: 'nested', code: require('!raw-loader?esModule=false!@repository/packages/animator/src/Animator/Animator.nested.sandbox.tsx') },
          { name: 'combine', code: require('!raw-loader?esModule=false!@repository/packages/animator/src/Animator/Animator.combine.sandbox.tsx') },
          { name: 'root', code: require('!raw-loader?esModule=false!@repository/packages/animator/src/Animator/Animator.root.sandbox.tsx') },
          { name: 'stagger', code: require('!raw-loader?esModule=false!@repository/packages/animator/src/Animator/Animator.stagger.sandbox.tsx') },
          { name: 'disabled', code: require('!raw-loader?esModule=false!@repository/packages/animator/src/Animator/Animator.disabled.sandbox.tsx') },
          { name: 'dismissed', code: require('!raw-loader?esModule=false!@repository/packages/animator/src/Animator/Animator.dismissed.sandbox.tsx') },
          { name: 'dynamicRendering', code: require('!raw-loader?esModule=false!@repository/packages/animator/src/Animator/Animator.dynamicRendering.sandbox.tsx') }
        ]
      },
      {
        name: 'AnimatorGeneralProvider',
        children: [
          { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/animator/src/AnimatorGeneralProvider/AnimatorGeneralProvider.basic.sandbox.tsx') }
        ]
      }
    ]
  },
  {
    name: '@arwes/animated',
    children: [
      {
        name: 'Animated',
        children: [
          { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/animated/src/Animated/Animated.basic.sandbox.tsx') },
          { name: 'functions', code: require('!raw-loader?esModule=false!@repository/packages/animated/src/Animated/Animated.functions.sandbox.tsx') },
          { name: 'composition', code: require('!raw-loader?esModule=false!@repository/packages/animated/src/Animated/Animated.composition.sandbox.tsx') },
          { name: 'disabled', code: require('!raw-loader?esModule=false!@repository/packages/animated/src/Animated/Animated.disabled.sandbox.tsx') }
        ]
      },
      {
        name: 'animations',
        children: [
          { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/animated/src/animations/animations.basic.sandbox.tsx') }
        ]
      }
    ]
  },
  {
    name: '@arwes/bleeps',
    children: [
      {
        name: 'BleepsProvider',
        children: [
          { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/bleeps/src/BleepsProvider/BleepsProvider.basic.sandbox.tsx') },
          { name: 'loops', code: require('!raw-loader?esModule=false!@repository/packages/bleeps/src/BleepsProvider/BleepsProvider.loops.sandbox.tsx') },
          { name: 'categories', code: require('!raw-loader?esModule=false!@repository/packages/bleeps/src/BleepsProvider/BleepsProvider.categories.sandbox.tsx') },
          { name: 'dynamic', code: require('!raw-loader?esModule=false!@repository/packages/bleeps/src/BleepsProvider/BleepsProvider.dynamic.sandbox.tsx') }
        ]
      }
    ]
  },
  {
    name: '@arwes/bgs',
    children: [
      {
        name: 'Dots',
        children: [
          { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/bgs/src/Dots/Dots.basic.sandbox.tsx') },
          { name: 'variation', code: require('!raw-loader?esModule=false!@repository/packages/bgs/src/Dots/Dots.variation.sandbox.tsx') },
          { name: 'tiles', code: require('!raw-loader?esModule=false!@repository/packages/bgs/src/Dots/Dots.tiles.sandbox.tsx') }
        ]
      },
      {
        name: 'Puffs',
        children: [
          { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/bgs/src/Puffs/Puffs.basic.sandbox.tsx') },
          { name: 'customDirection', code: require('!raw-loader?esModule=false!@repository/packages/bgs/src/Puffs/Puffs.customDirection.sandbox.tsx') },
          { name: 'randomDirections', code: require('!raw-loader?esModule=false!@repository/packages/bgs/src/Puffs/Puffs.randomDirections.sandbox.tsx') }
        ]
      },
      {
        name: 'GridLines',
        children: [
          { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/bgs/src/GridLines/GridLines.basic.sandbox.tsx') },
          { name: 'dashes', code: require('!raw-loader?esModule=false!@repository/packages/bgs/src/GridLines/GridLines.dashes.sandbox.tsx') }
        ]
      },
      {
        name: 'MovingLines',
        children: [
          { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/bgs/src/MovingLines/MovingLines.basic.sandbox.tsx') },
          { name: 'composition', code: require('!raw-loader?esModule=false!@repository/packages/bgs/src/MovingLines/MovingLines.composition.sandbox.tsx') }
        ]
      }
    ]
  }
];