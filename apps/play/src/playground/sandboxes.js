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
            name: 'createThemeUnit',
            children: [
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/theme/src/createThemeUnit/createThemeUnit.basic.sandbox.tsx') }
            ]
          },
          {
            name: 'createThemeColor',
            children: [
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/theme/src/createThemeColor/createThemeColor.basic.sandbox.tsx') },
              { name: 'variations', code: require('!raw-loader?esModule=false!@repository/packages/theme/src/createThemeColor/createThemeColor.variations.sandbox.tsx') },
              { name: 'alpha', code: require('!raw-loader?esModule=false!@repository/packages/theme/src/createThemeColor/createThemeColor.alpha.sandbox.tsx') }
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
            name: 'createAppTheme',
            children: [
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/theme/src/createAppTheme/createAppTheme.basic.sandbox.tsx') },
              { name: 'extension', code: require('!raw-loader?esModule=false!@repository/packages/theme/src/createAppTheme/createAppTheme.extension.sandbox.tsx') },
              { name: 'colors', code: require('!raw-loader?esModule=false!@repository/packages/theme/src/createAppTheme/createAppTheme.colors.sandbox.tsx') },
              { name: 'colorsCustom', code: require('!raw-loader?esModule=false!@repository/packages/theme/src/createAppTheme/createAppTheme.colorsCustom.sandbox.tsx') }
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
              { name: 'unmountOn', code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.unmountOn.sandbox.tsx') },
              { name: 'condition', code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.condition.sandbox.tsx') },
              { name: 'initialState', code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.initialState.sandbox.tsx') },
              { name: 'disabled', code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.disabled.sandbox.tsx') },
              { name: 'dismissed', code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.dismissed.sandbox.tsx') },
              { name: 'dynamicRendering', code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.dynamicRendering.sandbox.tsx') },
              { name: 'externalManagement', code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.externalManagement.sandbox.tsx') },
              { name: 'subsystemsTransitions', code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.subsystemsTransitions.sandbox.tsx') },
              { name: 'scrollList', code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.scrollList.sandbox.tsx') }
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
            name: 'AnimatedX',
            children: [
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/react-animated/src/AnimatedX/AnimatedX.basic.sandbox.tsx') },
              { name: 'options', code: require('!raw-loader?esModule=false!@repository/packages/react-animated/src/AnimatedX/AnimatedX.options.sandbox.tsx') },
              { name: 'disabled', code: require('!raw-loader?esModule=false!@repository/packages/react-animated/src/AnimatedX/AnimatedX.disabled.sandbox.tsx') }
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
        name: '@arwes/core',
        children: [
          {
            name: 'createAppStylesBaseline',
            children: [
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/core/src/createAppStylesBaseline/createAppStylesBaseline.basic.sandbox.tsx') },
              { name: 'light', code: require('!raw-loader?esModule=false!@repository/packages/core/src/createAppStylesBaseline/createAppStylesBaseline.light.sandbox.tsx') }
            ]
          }
        ]
      },
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
        name: '@arwes/frames',
        children: [
          {
            name: 'createFrameOctagonClip',
            children: [
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/frames/src/createFrameOctagonClip/createFrameOctagonClip.basic.sandbox.tsx') },
              { name: 'corners', code: require('!raw-loader?esModule=false!@repository/packages/frames/src/createFrameOctagonClip/createFrameOctagonClip.corners.sandbox.tsx') }
            ]
          },
          {
            name: 'createFrameKranoxClip',
            children: [
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/frames/src/createFrameKranoxClip/createFrameKranoxClip.basic.sandbox.tsx') },
              { name: 'lengths', code: require('!raw-loader?esModule=false!@repository/packages/frames/src/createFrameKranoxClip/createFrameKranoxClip.lengths.sandbox.tsx') }
            ]
          }
        ]
      },
      {
        name: '@arwes/react-frames',
        children: [
          {
            name: 'useFrameSVGRenderer',
            children: [
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/react-frames/src/useFrameSVGRenderer/useFrameSVGRenderer.basic.sandbox.tsx') },
              { name: 'commands', code: require('!raw-loader?esModule=false!@repository/packages/react-frames/src/useFrameSVGRenderer/useFrameSVGRenderer.commands.sandbox.tsx') },
              { name: 'clipping', code: require('!raw-loader?esModule=false!@repository/packages/react-frames/src/useFrameSVGRenderer/useFrameSVGRenderer.clipping.sandbox.tsx') }
            ]
          },
          {
            name: 'FrameSVG',
            children: [
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/react-frames/src/FrameSVG/FrameSVG.basic.sandbox.tsx') }
            ]
          },
          {
            name: 'FrameSVGOctagon',
            children: [
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/react-frames/src/FrameSVGOctagon/FrameSVGOctagon.basic.sandbox.tsx') },
              { name: 'corners', code: require('!raw-loader?esModule=false!@repository/packages/react-frames/src/FrameSVGOctagon/FrameSVGOctagon.corners.sandbox.tsx') },
              { name: 'assembling', code: require('!raw-loader?esModule=false!@repository/packages/react-frames/src/FrameSVGOctagon/FrameSVGOctagon.assembling.sandbox.tsx') }
            ]
          },
          {
            name: 'FrameSVGUnderline',
            children: [
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/react-frames/src/FrameSVGUnderline/FrameSVGUnderline.basic.sandbox.tsx') },
              { name: 'squareSize', code: require('!raw-loader?esModule=false!@repository/packages/react-frames/src/FrameSVGUnderline/FrameSVGUnderline.squareSize.sandbox.tsx') },
              { name: 'assembling', code: require('!raw-loader?esModule=false!@repository/packages/react-frames/src/FrameSVGUnderline/FrameSVGUnderline.assembling.sandbox.tsx') }
            ]
          },
          {
            name: 'FrameSVGCorners',
            children: [
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/react-frames/src/FrameSVGCorners/FrameSVGCorners.basic.sandbox.tsx') },
              { name: 'corners', code: require('!raw-loader?esModule=false!@repository/packages/react-frames/src/FrameSVGCorners/FrameSVGCorners.corners.sandbox.tsx') },
              { name: 'assembling', code: require('!raw-loader?esModule=false!@repository/packages/react-frames/src/FrameSVGCorners/FrameSVGCorners.assembling.sandbox.tsx') }
            ]
          },
          {
            name: 'FrameSVGLines',
            children: [
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/react-frames/src/FrameSVGLines/FrameSVGLines.basic.sandbox.tsx') },
              { name: 'lines', code: require('!raw-loader?esModule=false!@repository/packages/react-frames/src/FrameSVGLines/FrameSVGLines.lines.sandbox.tsx') },
              { name: 'assembling', code: require('!raw-loader?esModule=false!@repository/packages/react-frames/src/FrameSVGLines/FrameSVGLines.assembling.sandbox.tsx') }
            ]
          },
          {
            name: 'FrameSVGNefrex',
            children: [
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/react-frames/src/FrameSVGNefrex/FrameSVGNefrex.basic.sandbox.tsx') },
              { name: 'assembling', code: require('!raw-loader?esModule=false!@repository/packages/react-frames/src/FrameSVGNefrex/FrameSVGNefrex.assembling.sandbox.tsx') }
            ]
          },
          {
            name: 'FrameSVGKranox',
            children: [
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/react-frames/src/FrameSVGKranox/FrameSVGKranox.basic.sandbox.tsx') },
              { name: 'assembling', code: require('!raw-loader?esModule=false!@repository/packages/react-frames/src/FrameSVGKranox/FrameSVGKranox.assembling.sandbox.tsx') }
            ]
          },
          {
            name: 'IlluminatorSVG',
            children: [
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/react-frames/src/IlluminatorSVG/IlluminatorSVG.basic.sandbox.tsx') }
            ]
          },
          {
            name: 'Illuminator',
            children: [
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/react-frames/src/Illuminator/Illuminator.basic.sandbox.tsx') }
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
      },
      {
        name: '@arwes/react-core',
        children: [
          {
            name: 'BleepsOnAnimator',
            children: [
              { name: 'basic', code: require('!raw-loader?esModule=false!@repository/packages/react-core/src/BleepsOnAnimator/BleepsOnAnimator.basic.sandbox.tsx') }
            ]
          }
        ]
      }
    ]
  }
];
