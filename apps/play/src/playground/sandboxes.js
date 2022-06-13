/* eslint-disable import/no-webpack-loader-syntax */

const getMdCode = md => md.replace(/```.*\r?\n/g, '');

export const sandboxes = [
  {
    name: '@arwes/theme',
    children: [
      {
        name: 'createThemeColor',
        children: [
          {
            name: 'basic',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/theme/src/createThemeColor/createThemeColor.basic.sandbox.md'))
          },
          {
            name: 'variations',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/theme/src/createThemeColor/createThemeColor.variations.sandbox.md'))
          }
        ]
      },
      {
        name: 'createThemeStyle',
        children: [
          {
            name: 'basic',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/theme/src/createThemeStyle/createThemeStyle.basic.sandbox.md'))
          }
        ]
      },
      {
        name: 'createThemeBreakpoints',
        children: [
          {
            name: 'basic',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/theme/src/createThemeBreakpoints/createThemeBreakpoints.basic.sandbox.md'))
          },
          {
            name: 'series',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/theme/src/createThemeBreakpoints/createThemeBreakpoints.series.sandbox.md'))
          },
          {
            name: 'labels',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/theme/src/createThemeBreakpoints/createThemeBreakpoints.labels.sandbox.md'))
          }
        ]
      },
      {
        name: 'createCreateTheme',
        children: [
          {
            name: 'basic',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/theme/src/createCreateTheme/createCreateTheme.basic.sandbox.md'))
          }
        ]
      },
      {
        name: 'createUseCreateThemeExtended',
        children: [
          {
            name: 'basic',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/theme/src/createUseCreateThemeExtended/createUseCreateThemeExtended.basic.sandbox.md'))
          }
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
          {
            name: 'basic',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/styles/src/useStyles/useStyles.basic.sandbox.md'))
          },
          {
            name: 'props',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/styles/src/useStyles/useStyles.props.sandbox.md'))
          }
        ]
      },
      {
        name: 'useThemeStyles',
        children: [
          {
            name: 'basic',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/styles/src/useThemeStyles/useThemeStyles.basic.sandbox.md'))
          },
          {
            name: 'props',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/styles/src/useThemeStyles/useThemeStyles.props.sandbox.md'))
          }
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
          {
            name: 'basic',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/animator/src/Animator/Animator.basic.sandbox.md'))
          },
          {
            name: 'nested',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/animator/src/Animator/Animator.nested.sandbox.md'))
          },
          {
            name: 'combine',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/animator/src/Animator/Animator.combine.sandbox.md'))
          },
          {
            name: 'root',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/animator/src/Animator/Animator.root.sandbox.md'))
          },
          {
            name: 'stagger',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/animator/src/Animator/Animator.stagger.sandbox.md'))
          },
          {
            name: 'disabled',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/animator/src/Animator/Animator.disabled.sandbox.md'))
          },
          {
            name: 'dismissed',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/animator/src/Animator/Animator.dismissed.sandbox.md'))
          },
          {
            name: 'dynamicRendering',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/animator/src/Animator/Animator.dynamicRendering.sandbox.md'))
          }
        ]
      },
      {
        name: 'AnimatorGeneralProvider',
        children: [
          {
            name: 'basic',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/animator/src/AnimatorGeneralProvider/AnimatorGeneralProvider.basic.sandbox.md'))
          }
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
          {
            name: 'basic',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/animated/src/Animated/Animated.basic.sandbox.md'))
          },
          {
            name: 'functions',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/animated/src/Animated/Animated.functions.sandbox.md'))
          },
          {
            name: 'composition',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/animated/src/Animated/Animated.composition.sandbox.md'))
          },
          {
            name: 'disabled',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/animated/src/Animated/Animated.disabled.sandbox.md'))
          }
        ]
      },
      {
        name: 'animations',
        children: [
          {
            name: 'basic',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/animated/src/animations/animations.basic.sandbox.md'))
          }
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
          {
            name: 'basic',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/bleeps/src/BleepsProvider/BleepsProvider.basic.sandbox.md'))
          },
          {
            name: 'loops',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/bleeps/src/BleepsProvider/BleepsProvider.loops.sandbox.md'))
          },
          {
            name: 'categories',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/bleeps/src/BleepsProvider/BleepsProvider.categories.sandbox.md'))
          },
          {
            name: 'dynamic',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/bleeps/src/BleepsProvider/BleepsProvider.dynamic.sandbox.md'))
          }
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
          {
            name: 'basic',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/bgs/src/Dots/Dots.basic.sandbox.md'))
          },
          {
            name: 'variation',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/bgs/src/Dots/Dots.variation.sandbox.md'))
          },
          {
            name: 'tiles',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/bgs/src/Dots/Dots.tiles.sandbox.md'))
          }
        ]
      },
      {
        name: 'Puffs',
        children: [
          {
            name: 'basic',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/bgs/src/Puffs/Puffs.basic.sandbox.md'))
          },
          {
            name: 'customDirection',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/bgs/src/Puffs/Puffs.customDirection.sandbox.md'))
          },
          {
            name: 'randomDirections',
            code: getMdCode(require('!raw-loader?esModule=false!@repository/packages/bgs/src/Puffs/Puffs.randomDirections.sandbox.md'))
          }
        ]
      }
    ]
  }
];
