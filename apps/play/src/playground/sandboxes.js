/* eslint-disable import/no-webpack-loader-syntax */

export const sandboxes = [
  {
    name: 'Vanilla',
    children: [
      {
        name: 'Visual',
        children: [
          {
            name: '@arwes/theme',
            children: [
              {
                name: 'createThemeMultiplier',
                code: require('!raw-loader?esModule=false!@repository/packages/theme/src/createThemeMultiplier/createThemeMultiplier.sandbox.tsx')
              },
              {
                name: 'createThemeUnit',
                code: require('!raw-loader?esModule=false!@repository/packages/theme/src/createThemeUnit/createThemeUnit.sandbox.tsx')
              },
              {
                name: 'createThemeColor',
                code: require('!raw-loader?esModule=false!@repository/packages/theme/src/createThemeColor/createThemeColor.sandbox.tsx'),
                children: [
                  {
                    name: 'alpha',
                    code: require('!raw-loader?esModule=false!@repository/packages/theme/src/createThemeColor/createThemeColor.alpha.sandbox.tsx')
                  }
                ]
              },
              {
                name: 'createThemeStyle',
                code: require('!raw-loader?esModule=false!@repository/packages/theme/src/createThemeStyle/createThemeStyle.sandbox.tsx')
              },
              {
                name: 'createThemeBreakpoints',
                code: require('!raw-loader?esModule=false!@repository/packages/theme/src/createThemeBreakpoints/createThemeBreakpoints.sandbox.tsx')
              },
              {
                name: 'createCreateTheme',
                code: require('!raw-loader?esModule=false!@repository/packages/theme/src/createCreateTheme/createCreateTheme.sandbox.tsx')
              }
            ]
          },
          {
            name: '@arwes/styles',
            children: [
              {
                name: 'styleSteps',
                code: require('!raw-loader?esModule=false!@repository/packages/styles/src/styleSteps/styleSteps.sandbox.tsx')
              },
              {
                name: 'styleStrip',
                code: require('!raw-loader?esModule=false!@repository/packages/styles/src/styleStrip/styleStrip.sandbox.tsx')
              },
              {
                name: 'styleSeparator',
                code: require('!raw-loader?esModule=false!@repository/packages/styles/src/styleSeparator/styleSeparator.sandbox.tsx')
              }
            ]
          }
        ]
      },
      {
        name: 'Motion',
        children: [
          {
            name: '@arwes/animator',
            children: [
              {
                name: 'createAnimatorSystem',
                code: require('!raw-loader?esModule=false!@repository/packages/animator/src/createAnimatorSystem/createAnimatorSystem.sandbox.tsx')
              }
            ]
          },
          {
            name: '@arwes/animated',
            children: [
              {
                name: 'createAnimation',
                code: require('!raw-loader?esModule=false!@repository/packages/animated/src/createAnimation/createAnimation.sandbox.tsx'),
                children: [
                  {
                    name: 'easing',
                    code: require('!raw-loader?esModule=false!@repository/packages/animated/src/createAnimation/createAnimation.easing.sandbox.tsx')
                  }
                ]
              },
              {
                name: 'createAnimatedElement',
                code: require('!raw-loader?esModule=false!@repository/packages/animated/src/createAnimatedElement/createAnimatedElement.sandbox.tsx')
              },
              {
                name: 'createAnimatedXElement',
                code: require('!raw-loader?esModule=false!@repository/packages/animated/src/createAnimatedXElement/createAnimatedXElement.sandbox.tsx')
              },
              {
                name: 'animateDraw',
                code: require('!raw-loader?esModule=false!@repository/packages/animated/src/animateDraw/animateDraw.sandbox.tsx')
              }
            ]
          }
        ]
      },
      {
        name: 'Audio',
        children: [
          {
            name: '@arwes/bleeps',
            children: [
              {
                name: 'createBleep',
                code: require('!raw-loader?esModule=false!@repository/packages/bleeps/src/createBleep/createBleep.sandbox.tsx'),
                children: [
                  {
                    name: 'looping',
                    code: require('!raw-loader?esModule=false!@repository/packages/bleeps/src/createBleep/createBleep.looping.sandbox.tsx')
                  },
                  {
                    name: 'sources',
                    code: require('!raw-loader?esModule=false!@repository/packages/bleeps/src/createBleep/createBleep.sources.sandbox.tsx')
                  },
                  {
                    name: 'dynamic',
                    code: require('!raw-loader?esModule=false!@repository/packages/bleeps/src/createBleep/createBleep.dynamic.sandbox.tsx')
                  }
                ]
              },
              {
                name: 'createBleepsManager',
                code: require('!raw-loader?esModule=false!@repository/packages/bleeps/src/createBleepsManager/createBleepsManager.sandbox.tsx'),
                children: [
                  {
                    name: 'categories',
                    code: require('!raw-loader?esModule=false!@repository/packages/bleeps/src/createBleepsManager/createBleepsManager.categories.sandbox.tsx')
                  },
                  {
                    name: 'dynamic',
                    code: require('!raw-loader?esModule=false!@repository/packages/bleeps/src/createBleepsManager/createBleepsManager.dynamic.sandbox.tsx')
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'Text',
        children: [
          {
            name: '@arwes/text',
            children: [
              {
                name: 'animateTextSequence',
                code: require('!raw-loader?esModule=false!@repository/packages/text/src/animateTextSequence/animateTextSequence.sandbox.tsx')
              },
              {
                name: 'animateTextDecipher',
                code: require('!raw-loader?esModule=false!@repository/packages/text/src/animateTextDecipher/animateTextDecipher.sandbox.tsx')
              }
            ]
          }
        ]
      },
      {
        name: 'Frames',
        children: [
          {
            name: '@arwes/frames',
            children: [
              {
                name: 'createFrame',
                code: require('!raw-loader?esModule=false!@repository/packages/frames/src/createFrame/createFrame.sandbox.tsx'),
                children: [
                  {
                    name: 'shapes',
                    code: require('!raw-loader?esModule=false!@repository/packages/frames/src/createFrame/createFrame.shapes.sandbox.tsx')
                  },
                  {
                    name: 'clipping',
                    code: require('!raw-loader?esModule=false!@repository/packages/frames/src/createFrame/createFrame.clipping.sandbox.tsx')
                  },
                  {
                    name: 'masking',
                    code: require('!raw-loader?esModule=false!@repository/packages/frames/src/createFrame/createFrame.masking.sandbox.tsx')
                  },
                  {
                    name: 'patterns',
                    code: require('!raw-loader?esModule=false!@repository/packages/frames/src/createFrame/createFrame.patterns.sandbox.tsx')
                  },
                  {
                    name: 'contextClasses',
                    code: require('!raw-loader?esModule=false!@repository/packages/frames/src/createFrame/createFrame.contextClasses.sandbox.tsx')
                  },
                  {
                    name: 'contextStyles',
                    code: require('!raw-loader?esModule=false!@repository/packages/frames/src/createFrame/createFrame.contextStyles.sandbox.tsx')
                  },
                  {
                    name: 'contextAnimations',
                    code: require('!raw-loader?esModule=false!@repository/packages/frames/src/createFrame/createFrame.contextAnimations.sandbox.tsx')
                  },
                  {
                    name: 'contextAttrs',
                    code: require('!raw-loader?esModule=false!@repository/packages/frames/src/createFrame/createFrame.contextAttrs.sandbox.tsx')
                  },
                  {
                    name: 'animator',
                    code: require('!raw-loader?esModule=false!@repository/packages/frames/src/createFrame/createFrame.animator.sandbox.tsx')
                  },
                  {
                    name: 'drawing',
                    code: require('!raw-loader?esModule=false!@repository/packages/frames/src/createFrame/createFrame.drawing.sandbox.tsx')
                  }
                ]
              },
              {
                name: 'createFrameUnderlineSettings',
                code: require('!raw-loader?esModule=false!@repository/packages/frames/src/createFrameUnderlineSettings/createFrameUnderlineSettings.sandbox.tsx')
              },
              {
                name: 'createFrameLinesSettings',
                code: require('!raw-loader?esModule=false!@repository/packages/frames/src/createFrameLinesSettings/createFrameLinesSettings.sandbox.tsx')
              },
              {
                name: 'createFrameCornersSettings',
                code: require('!raw-loader?esModule=false!@repository/packages/frames/src/createFrameCornersSettings/createFrameCornersSettings.sandbox.tsx')
              },
              {
                name: 'createFrameOctagonSettings',
                code: require('!raw-loader?esModule=false!@repository/packages/frames/src/createFrameOctagonSettings/createFrameOctagonSettings.sandbox.tsx')
              },
              {
                name: 'createFrameNefrexSettings',
                code: require('!raw-loader?esModule=false!@repository/packages/frames/src/createFrameNefrexSettings/createFrameNefrexSettings.sandbox.tsx')
              },
              {
                name: 'createFrameKranoxSettings',
                code: require('!raw-loader?esModule=false!@repository/packages/frames/src/createFrameKranoxSettings/createFrameKranoxSettings.sandbox.tsx')
              },
              {
                name: 'createFrameHeaderSettings',
                code: require('!raw-loader?esModule=false!@repository/packages/frames/src/createFrameHeaderSettings/createFrameHeaderSettings.sandbox.tsx')
              },
              {
                name: 'createFrameCircleSettings',
                code: require('!raw-loader?esModule=false!@repository/packages/frames/src/createFrameCircleSettings/createFrameCircleSettings.sandbox.tsx')
              },
              {
                name: 'animateFrameAssembler',
                code: require('!raw-loader?esModule=false!@repository/packages/frames/src/animateFrameAssembler/animateFrameAssembler.sandbox.tsx')
              },
              {
                name: 'styleFrameClipOctagon',
                code: require('!raw-loader?esModule=false!@repository/packages/frames/src/styleFrameClipOctagon/styleFrameClipOctagon.sandbox.tsx')
              },
              {
                name: 'styleFrameClipKranox',
                code: require('!raw-loader?esModule=false!@repository/packages/frames/src/styleFrameClipKranox/styleFrameClipKranox.sandbox.tsx')
              }
            ]
          }
        ]
      },
      {
        name: 'Backgrounds',
        children: [
          {
            name: '@arwes/bgs',
            children: [
              {
                name: 'createBackgroundDots',
                code: require('!raw-loader?esModule=false!@repository/packages/bgs/src/createBackgroundDots/createBackgroundDots.sandbox.tsx'),
                children: [
                  {
                    name: 'variation',
                    code: require('!raw-loader?esModule=false!@repository/packages/bgs/src/createBackgroundDots/createBackgroundDots.variation.sandbox.tsx')
                  },
                  {
                    name: 'crosses',
                    code: require('!raw-loader?esModule=false!@repository/packages/bgs/src/createBackgroundDots/createBackgroundDots.crosses.sandbox.tsx')
                  },
                  {
                    name: 'tiles',
                    code: require('!raw-loader?esModule=false!@repository/packages/bgs/src/createBackgroundDots/createBackgroundDots.tiles.sandbox.tsx')
                  }
                ]
              },
              {
                name: 'createBackgroundGridLines',
                code: require('!raw-loader?esModule=false!@repository/packages/bgs/src/createBackgroundGridLines/createBackgroundGridLines.sandbox.tsx')
              },
              {
                name: 'createBackgroundMovingLines',
                code: require('!raw-loader?esModule=false!@repository/packages/bgs/src/createBackgroundMovingLines/createBackgroundMovingLines.sandbox.tsx')
              },
              {
                name: 'createBackgroundPuffs',
                code: require('!raw-loader?esModule=false!@repository/packages/bgs/src/createBackgroundPuffs/createBackgroundPuffs.sandbox.tsx'),
                children: [
                  {
                    name: 'customDirection',
                    code: require('!raw-loader?esModule=false!@repository/packages/bgs/src/createBackgroundPuffs/createBackgroundPuffs.customDirection.sandbox.tsx')
                  },
                  {
                    name: 'randomDirections',
                    code: require('!raw-loader?esModule=false!@repository/packages/bgs/src/createBackgroundPuffs/createBackgroundPuffs.randomDirections.sandbox.tsx')
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'Effects',
        children: [
          {
            name: 'createEffectIlluminator',
            code: require('!raw-loader?esModule=false!@repository/packages/effects/src/createEffectIlluminator/createEffectIlluminator.sandbox.tsx')
          },
          {
            name: 'createEffectIlluminatorSVG',
            code: require('!raw-loader?esModule=false!@repository/packages/effects/src/createEffectIlluminatorSVG/createEffectIlluminatorSVG.sandbox.tsx')
          }
        ]
      }
    ]
  },

  //
  // REACT
  //

  {
    name: 'React',
    children: [
      // {
      //   name: 'Visual',
      //   children: []
      // },
      {
        name: 'Motion',
        children: [
          {
            name: '@arwes/react-animator',
            children: [
              {
                name: 'Animator',
                code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.sandbox.tsx'),
                children: [
                  {
                    name: 'nesting',
                    code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.nesting.sandbox.tsx')
                  },
                  {
                    name: 'combine',
                    code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.combine.sandbox.tsx')
                  },
                  {
                    name: 'combineNesting',
                    code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.combineNesting.sandbox.tsx')
                  },
                  {
                    name: 'root',
                    code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.root.sandbox.tsx')
                  },
                  {
                    name: 'managerStagger',
                    code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.managerStagger.sandbox.tsx')
                  },
                  {
                    name: 'managerSequence',
                    code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.managerSequence.sandbox.tsx')
                  },
                  {
                    name: 'managerSwitch',
                    code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.managerSwitch.sandbox.tsx')
                  },
                  {
                    name: 'condition',
                    code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.condition.sandbox.tsx')
                  },
                  {
                    name: 'unmountOn',
                    code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.unmountOn.sandbox.tsx')
                  },
                  {
                    name: 'initialState',
                    code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.initialState.sandbox.tsx')
                  },
                  {
                    name: 'disabled',
                    code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.disabled.sandbox.tsx')
                  },
                  {
                    name: 'dismissed',
                    code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.dismissed.sandbox.tsx')
                  },
                  {
                    name: 'dynamicRendering',
                    code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/Animator/Animator.dynamicRendering.sandbox.tsx')
                  }
                ]
              },
              {
                name: 'AnimatorGeneralProvider',
                code: require('!raw-loader?esModule=false!@repository/packages/react-animator/src/AnimatorGeneralProvider/AnimatorGeneralProvider.sandbox.tsx')
              }
            ]
          },
          {
            name: '@arwes/react-animated',
            children: [
              {
                name: 'Animated',
                code: require('!raw-loader?esModule=false!@repository/packages/react-animated/src/Animated/Animated.sandbox.tsx'),
                children: [
                  {
                    name: 'transition',
                    code: require('!raw-loader?esModule=false!@repository/packages/react-animated/src/Animated/Animated.transition.sandbox.tsx')
                  },
                  {
                    name: 'fade',
                    code: require('!raw-loader?esModule=false!@repository/packages/react-animated/src/Animated/Animated.fade.sandbox.tsx')
                  },
                  {
                    name: 'flicker',
                    code: require('!raw-loader?esModule=false!@repository/packages/react-animated/src/Animated/Animated.flicker.sandbox.tsx')
                  },
                  {
                    name: 'draw',
                    code: require('!raw-loader?esModule=false!@repository/packages/react-animated/src/Animated/Animated.draw.sandbox.tsx')
                  },
                  {
                    name: 'functions',
                    code: require('!raw-loader?esModule=false!@repository/packages/react-animated/src/Animated/Animated.functions.sandbox.tsx')
                  },
                  {
                    name: 'composition',
                    code: require('!raw-loader?esModule=false!@repository/packages/react-animated/src/Animated/Animated.composition.sandbox.tsx')
                  },
                  {
                    name: 'hidden',
                    code: require('!raw-loader?esModule=false!@repository/packages/react-animated/src/Animated/Animated.hidden.sandbox.tsx')
                  },
                  {
                    name: 'disabled',
                    code: require('!raw-loader?esModule=false!@repository/packages/react-animated/src/Animated/Animated.disabled.sandbox.tsx')
                  }
                ]
              },
              {
                name: 'useAnimated',
                code: require('!raw-loader?esModule=false!@repository/packages/react-animated/src/useAnimated/useAnimated.sandbox.tsx')
              },
              {
                name: 'AnimatedX',
                code: require('!raw-loader?esModule=false!@repository/packages/react-animated/src/AnimatedX/AnimatedX.sandbox.tsx'),
                children: [
                  {
                    name: 'disabled',
                    code: require('!raw-loader?esModule=false!@repository/packages/react-animated/src/AnimatedX/AnimatedX.disabled.sandbox.tsx')
                  }
                ]
              },
              {
                name: 'useAnimatedX',
                code: require('!raw-loader?esModule=false!@repository/packages/react-animated/src/useAnimatedX/useAnimatedX.sandbox.tsx'),
                children: [
                  {
                    name: 'hideOnStates',
                    code: require('!raw-loader?esModule=false!@repository/packages/react-animated/src/useAnimatedX/useAnimatedX.hideOnStates.sandbox.tsx')
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'Audio',
        children: [
          {
            name: '@arwes/react-bleeps',
            children: [
              {
                name: 'BleepsProvider',
                code: require('!raw-loader?esModule=false!@repository/packages/react-bleeps/src/BleepsProvider/BleepsProvider.sandbox.tsx')
              }
            ]
          }
        ]
      },
      {
        name: 'Text',
        children: [
          {
            name: '@arwes/react-text',
            children: [
              {
                name: 'Text',
                code: require('!raw-loader?esModule=false!@repository/packages/react-text/src/Text/Text.sandbox.tsx'),
                children: [
                  {
                    name: 'nested',
                    code: require('!raw-loader?esModule=false!@repository/packages/react-text/src/Text/Text.nested.sandbox.tsx')
                  },
                  {
                    name: 'multiple',
                    code: require('!raw-loader?esModule=false!@repository/packages/react-text/src/Text/Text.multiple.sandbox.tsx')
                  },
                  {
                    name: 'blink',
                    code: require('!raw-loader?esModule=false!@repository/packages/react-text/src/Text/Text.blink.sandbox.tsx')
                  },
                  {
                    name: 'managerDecipher',
                    code: require('!raw-loader?esModule=false!@repository/packages/react-text/src/Text/Text.managerDecipher.sandbox.tsx')
                  },
                  {
                    name: 'updates',
                    code: require('!raw-loader?esModule=false!@repository/packages/react-text/src/Text/Text.updates.sandbox.tsx')
                  },
                  {
                    name: 'intercepting',
                    code: require('!raw-loader?esModule=false!@repository/packages/react-text/src/Text/Text.intercepting.sandbox.tsx')
                  },
                  {
                    name: 'static',
                    code: require('!raw-loader?esModule=false!@repository/packages/react-text/src/Text/Text.static.sandbox.tsx')
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'Frames',
        children: [
          {
            name: '@arwes/react-frames',
            code: require('!raw-loader?esModule=false!@repository/packages/react-frames/src/basic.sandbox.tsx'),
            children: [
              {
                name: 'FrameUnderline',
                code: require('!raw-loader?esModule=false!@repository/packages/react-frames/src/FrameUnderline/FrameUnderline.sandbox.tsx')
              },
              {
                name: 'FrameLines',
                code: require('!raw-loader?esModule=false!@repository/packages/react-frames/src/FrameLines/FrameLines.sandbox.tsx')
              },
              {
                name: 'FrameCorners',
                code: require('!raw-loader?esModule=false!@repository/packages/react-frames/src/FrameCorners/FrameCorners.sandbox.tsx')
              },
              {
                name: 'FrameOctagon',
                code: require('!raw-loader?esModule=false!@repository/packages/react-frames/src/FrameOctagon/FrameOctagon.sandbox.tsx')
              },
              {
                name: 'FrameNefrex',
                code: require('!raw-loader?esModule=false!@repository/packages/react-frames/src/FrameNefrex/FrameNefrex.sandbox.tsx')
              },
              {
                name: 'FrameKranox',
                code: require('!raw-loader?esModule=false!@repository/packages/react-frames/src/FrameKranox/FrameKranox.sandbox.tsx')
              },
              {
                name: 'FrameHeader',
                code: require('!raw-loader?esModule=false!@repository/packages/react-frames/src/FrameHeader/FrameHeader.sandbox.tsx')
              },
              {
                name: 'FrameBase',
                code: require('!raw-loader?esModule=false!@repository/packages/react-frames/src/FrameBase/FrameBase.sandbox.tsx')
              },
              {
                name: 'useFrameAssembler',
                code: require('!raw-loader?esModule=false!@repository/packages/react-frames/src/useFrameAssembler/useFrameAssembler.sandbox.tsx')
              }
            ]
          }
        ]
      },
      {
        name: 'Backgrounds',
        children: [
          {
            name: '@arwes/react-bgs',
            code: require('!raw-loader?esModule=false!@repository/packages/react-bgs/src/basic.sandbox.tsx'),
            children: [
              {
                name: 'Dots',
                code: require('!raw-loader?esModule=false!@repository/packages/react-bgs/src/Dots/Dots.sandbox.tsx')
              },
              {
                name: 'Puffs',
                code: require('!raw-loader?esModule=false!@repository/packages/react-bgs/src/Puffs/Puffs.sandbox.tsx')
              },
              {
                name: 'GridLines',
                code: require('!raw-loader?esModule=false!@repository/packages/react-bgs/src/GridLines/GridLines.sandbox.tsx')
              },
              {
                name: 'MovingLines',
                code: require('!raw-loader?esModule=false!@repository/packages/react-bgs/src/MovingLines/MovingLines.sandbox.tsx')
              }
            ]
          }
        ]
      },
      {
        name: 'Effects',
        children: [
          {
            name: 'Illuminator',
            code: require('!raw-loader?esModule=false!@repository/packages/react-effects/src/Illuminator/Illuminator.sandbox.tsx')
          },
          {
            name: 'IlluminatorSVG',
            code: require('!raw-loader?esModule=false!@repository/packages/react-effects/src/IlluminatorSVG/IlluminatorSVG.sandbox.tsx')
          }
        ]
      },
      {
        name: 'General',
        children: [
          {
            name: '@arwes/react-core',
            children: [
              {
                name: 'BleepsOnAnimator',
                code: require('!raw-loader?esModule=false!@repository/packages/react-core/src/BleepsOnAnimator/BleepsOnAnimator.sandbox.tsx')
              }
            ]
          }
        ]
      },
      {
        name: 'Examples',
        children: [
          {
            name: 'button',
            code: require('!raw-loader?esModule=false!../examples/react/button.sandbox.tsx')
          },
          {
            name: 'backgrounds',
            code: require('!raw-loader?esModule=false!../examples/react/backgrounds.sandbox.tsx')
          },
          {
            name: 'alert',
            code: require('!raw-loader?esModule=false!../examples/react/alert.sandbox.tsx')
          },
          {
            name: 'scrollList',
            code: require('!raw-loader?esModule=false!../examples/react/scrollList.sandbox.tsx')
          },
          {
            name: 'subsystems',
            code: require('!raw-loader?esModule=false!../examples/react/subsystems.sandbox.tsx')
          }
        ]
      }
    ]
  }
]
