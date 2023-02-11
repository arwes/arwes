/* eslint-disable import/no-webpack-loader-syntax */

const isProduction = process.env.NODE_ENV === 'production';

export const sandboxes = [
  {
    name: 'Visual Design',
    children: [
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
          }
        ]
      },
      !isProduction && {
        name: '@arwes/react-theme',
        children: [
          {
            name: 'createUseCreateThemeExtended',
            children: [
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/react-theme/src/createUseCreateThemeExtended/createUseCreateThemeExtended.basic.sandbox.tsx') }
            ]
          }
        ]
      },
      !isProduction && {
        name: '@arwes/react-styles',
        children: [
          {
            name: 'useStyles',
            children: [
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/react-styles/src/useStyles/useStyles.basic.sandbox.tsx') },
              { name: 'props', code: require('!raw-loader?esModule=false!@repository/packages/react-styles/src/useStyles/useStyles.props.sandbox.tsx') }
            ]
          },
          {
            name: 'useThemeStyles',
            children: [
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/react-styles/src/useThemeStyles/useThemeStyles.basic.sandbox.tsx') },
              { name: 'props', code: require('!raw-loader?esModule=false!@repository/packages/react-styles/src/useThemeStyles/useThemeStyles.props.sandbox.tsx') }
            ]
          }
        ]
      }
    ].filter(Boolean)
  },
  {
    name: 'Motion Design',
    children: [
      {
        name: '@arwes/animator',
        children: [
          {
            name: 'createAnimatorSystem',
            children: [
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/animator/src/createAnimatorSystem/createAnimatorSystem.basic.sandbox.tsx') }
            ]
          }
        ]
      },
      {
        name: '@arwes/animated',
        children: [
          {
            name: 'createAnimation',
            children: [
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/animated/src/createAnimation/createAnimation.basic.sandbox.tsx') },
              { name: 'easing', code: require('!raw-loader?esModule=false!@repository/packages/animated/src/createAnimation/createAnimation.easing.sandbox.tsx') }
            ]
          }
        ]
      },
      {
        name: '@arwes/react-animator',
        children: [
          {
            name: 'Animator',
            children: [
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.basic.sandbox.tsx') },
              { name: 'nesting', code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.nesting.sandbox.tsx') },
              { name: 'combine', code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.combine.sandbox.tsx') },
              { name: 'combineNesting', code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.combineNesting.sandbox.tsx') },
              { name: 'root', code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.root.sandbox.tsx') },
              { name: 'managerStagger', code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.managerStagger.sandbox.tsx') },
              { name: 'managerSequence', code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.managerSequence.sandbox.tsx') },
              { name: 'managerSwitch', code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.managerSwitch.sandbox.tsx') },
              { name: 'unmountOnExited', code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.unmountOnExited.sandbox.tsx') },
              { name: 'condition', code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.condition.sandbox.tsx') },
              { name: 'initialState', code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.initialState.sandbox.tsx') },
              { name: 'disabled', code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.disabled.sandbox.tsx') },
              { name: 'dismissed', code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.dismissed.sandbox.tsx') },
              { name: 'dynamicRendering', code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.dynamicRendering.sandbox.tsx') },
              { name: 'externalManagement', code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.externalManagement.sandbox.tsx') },
              { name: 'subsystemsTransitions', code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.subsystemsTransitions.sandbox.tsx') }
            ]
          },
          {
            name: 'AnimatorGeneralProvider',
            children: [
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/AnimatorGeneralProvider/AnimatorGeneralProvider.basic.sandbox.tsx') }
            ]
          }
        ]
      },
      {
        name: '@arwes/react-animated',
        children: [
          {
            name: 'Animated',
            children: [
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/react-animated/src/Animated/Animated.basic.sandbox.tsx') },
              { name: 'functions', code: require('!raw-loader?esModule=false!@repository/packages/react-animated/src/Animated/Animated.functions.sandbox.tsx') },
              { name: 'composition', code: require('!raw-loader?esModule=false!@repository/packages/react-animated/src/Animated/Animated.composition.sandbox.tsx') },
              { name: 'hidden', code: require('!raw-loader?esModule=false!@repository/packages/react-animated/src/Animated/Animated.hidden.sandbox.tsx') },
              { name: 'disabled', code: require('!raw-loader?esModule=false!@repository/packages/react-animated/src/Animated/Animated.disabled.sandbox.tsx') }
            ]
          },
          {
            name: 'animations',
            children: [
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/react-animated/src/animations/animations.basic.sandbox.tsx') }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Audio Design',
    children: [
      {
        name: '@arwes/bleeps',
        children: [
          {
            name: 'createBleep',
            children: [
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/bleeps/src/createBleep/createBleep.basic.sandbox.tsx') },
              { name: 'looping', code: require('!raw-loader?esModule=false!@repository/packages/bleeps/src/createBleep/createBleep.looping.sandbox.tsx') },
              { name: 'sources', code: require('!raw-loader?esModule=false!@repository/packages/bleeps/src/createBleep/createBleep.sources.sandbox.tsx') },
              { name: 'dynamic', code: require('!raw-loader?esModule=false!@repository/packages/bleeps/src/createBleep/createBleep.dynamic.sandbox.tsx') }
            ]
          },
          {
            name: 'createBleepsManager',
            children: [
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/bleeps/src/createBleepsManager/createBleepsManager.basic.sandbox.tsx') },
              { name: 'categories', code: require('!raw-loader?esModule=false!@repository/packages/bleeps/src/createBleepsManager/createBleepsManager.categories.sandbox.tsx') },
              { name: 'dynamic', code: require('!raw-loader?esModule=false!@repository/packages/bleeps/src/createBleepsManager/createBleepsManager.dynamic.sandbox.tsx') }
            ]
          }
        ]
      },
      {
        name: '@arwes/react-bleeps',
        children: [
          {
            name: 'BleepsProvider',
            children: [
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/react-bleeps/src/BleepsProvider/BleepsProvider.basic.sandbox.tsx') }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Components',
    children: [
      {
        name: '@arwes/react-text',
        children: [
          {
            name: 'Text',
            children: [
              { name: 'base', code: require('!raw-loader?esModule=false!@repository/packages/react-text/src/Text/Text.base.sandbox.tsx') },
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/react-text/src/Text/Text.basic.sandbox.tsx') },
              { name: 'multiple', code: require('!raw-loader?esModule=false!@repository/packages/react-text/src/Text/Text.multiple.sandbox.tsx') },
              { name: 'managerDecipher', code: require('!raw-loader?esModule=false!@repository/packages/react-text/src/Text/Text.managerDecipher.sandbox.tsx') },
              { name: 'updates', code: require('!raw-loader?esModule=false!@repository/packages/react-text/src/Text/Text.updates.sandbox.tsx') },
              { name: 'intercepting', code: require('!raw-loader?esModule=false!@repository/packages/react-text/src/Text/Text.intercepting.sandbox.tsx') }
            ]
          }
        ]
      },
      {
        name: '@arwes/react-frames',
        children: [
          {
            name: 'FrameSVG',
            children: [
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/react-frames/src/FrameSVG/FrameSVG.basic.sandbox.tsx') }
            ]
          }
        ]
      },
      {
        name: '@arwes/react-bgs',
        children: [
          {
            name: 'Dots',
            children: [
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/react-bgs/src/Dots/Dots.basic.sandbox.tsx') },
              { name: 'variation', code: require('!raw-loader?esModule=false!@repository/packages/react-bgs/src/Dots/Dots.variation.sandbox.tsx') },
              { name: 'tiles', code: require('!raw-loader?esModule=false!@repository/packages/react-bgs/src/Dots/Dots.tiles.sandbox.tsx') }
            ]
          },
          {
            name: 'Puffs',
            children: [
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/react-bgs/src/Puffs/Puffs.basic.sandbox.tsx') },
              { name: 'customDirection', code: require('!raw-loader?esModule=false!@repository/packages/react-bgs/src/Puffs/Puffs.customDirection.sandbox.tsx') },
              { name: 'randomDirections', code: require('!raw-loader?esModule=false!@repository/packages/react-bgs/src/Puffs/Puffs.randomDirections.sandbox.tsx') }
            ]
          },
          {
            name: 'GridLines',
            children: [
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/react-bgs/src/GridLines/GridLines.basic.sandbox.tsx') },
              { name: 'dashes', code: require('!raw-loader?esModule=false!@repository/packages/react-bgs/src/GridLines/GridLines.dashes.sandbox.tsx') }
            ]
          },
          {
            name: 'MovingLines',
            children: [
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/react-bgs/src/MovingLines/MovingLines.basic.sandbox.tsx') },
              { name: 'composition', code: require('!raw-loader?esModule=false!@repository/packages/react-bgs/src/MovingLines/MovingLines.composition.sandbox.tsx') }
            ]
          }
        ]
      }
    ]
  }
];
