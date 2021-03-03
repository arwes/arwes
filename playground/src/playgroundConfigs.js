const playgroundConfigs = [
  {
    name: 'design',
    components: [
      {
        name: 'createTheme',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/design/src/createTheme/createTheme.basic.sandbox.md').default },
          { name: 'dynamic', code: require('repository/packages/design/src/createTheme/createTheme.dynamic.sandbox.md').default }
        ]
      }
    ]
  },
  {
    name: 'animation',
    components: [
      {
        name: 'withAnimator',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/animation/src/withAnimator/withAnimator.basic.sandbox.md').default },
          { name: 'nesting', code: require('repository/packages/animation/src/withAnimator/withAnimator.nesting.sandbox.md').default },
          { name: 'staggering', code: require('repository/packages/animation/src/withAnimator/withAnimator.staggering.sandbox.md').default },
          { name: 'sequence', code: require('repository/packages/animation/src/withAnimator/withAnimator.sequence.sandbox.md').default },
          { name: 'custom-manager', code: require('repository/packages/animation/src/withAnimator/withAnimator.custom-manager.sandbox.md').default }
        ]
      },
      {
        name: 'extendAnimator',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/animation/src/extendAnimator/extendAnimator.basic.sandbox.md').default }
        ]
      },
      {
        name: 'Animator',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/animation/src/Animator/Animator.basic.sandbox.md').default }
        ]
      }
    ]
  },
  {
    name: 'sounds',
    components: [
      {
        name: 'withBleeps',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/sounds/src/withBleeps/withBleeps.basic.sandbox.md').default },
          { name: 'categories', code: require('repository/packages/sounds/src/withBleeps/withBleeps.categories.sandbox.md').default },
          { name: 'loops', code: require('repository/packages/sounds/src/withBleeps/withBleeps.loops.sandbox.md').default },
          { name: 'dynamic', code: require('repository/packages/sounds/src/withBleeps/withBleeps.dynamic.sandbox.md').default }
        ]
      }
    ]
  },
  {
    name: 'core',
    components: [
      {
        name: 'StylesBaseline',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/core/src/StylesBaseline/StylesBaseline.basic.sandbox.md').default }
        ]
      },
      {
        name: 'Text',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/core/src/Text/Text.basic.sandbox.md').default },
          { name: 'multiple', code: require('repository/packages/core/src/Text/Text.multiple.sandbox.md').default },
          { name: 'dynamic', code: require('repository/packages/core/src/Text/Text.dynamic.sandbox.md').default },
          { name: 'intercepting', code: require('repository/packages/core/src/Text/Text.intercepting.sandbox.md').default },
          { name: 'static', code: require('repository/packages/core/src/Text/Text.static.sandbox.md').default }
        ]
      },
      {
        name: 'Table',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/core/src/Table/Table.basic.sandbox.md').default },
          { name: 'static', code: require('repository/packages/core/src/Table/Table.static.sandbox.md').default }
        ]
      },
      {
        name: 'CodeBlock',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/core/src/CodeBlock/CodeBlock.basic.sandbox.md').default },
          { name: 'static', code: require('repository/packages/core/src/CodeBlock/CodeBlock.static.sandbox.md').default }
        ]
      },
      {
        name: 'LoadingBars',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/core/src/LoadingBars/LoadingBars.basic.sandbox.md').default },
          { name: 'determinate', code: require('repository/packages/core/src/LoadingBars/LoadingBars.determinate.sandbox.md').default },
          { name: 'full', code: require('repository/packages/core/src/LoadingBars/LoadingBars.full.sandbox.md').default },
          { name: 'static', code: require('repository/packages/core/src/LoadingBars/LoadingBars.static.sandbox.md').default }
        ]
      },
      {
        name: 'Figure',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/core/src/Figure/Figure.basic.sandbox.md').default },
          { name: 'fluid', code: require('repository/packages/core/src/Figure/Figure.fluid.sandbox.md').default },
          { name: 'responsive', code: require('repository/packages/core/src/Figure/Figure.responsive.sandbox.md').default },
          { name: 'preload', code: require('repository/packages/core/src/Figure/Figure.preload.sandbox.md').default },
          { name: 'static', code: require('repository/packages/core/src/Figure/Figure.static.sandbox.md').default }
        ]
      },
      {
        name: 'FrameUnderline',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/core/src/FrameUnderline/FrameUnderline.basic.sandbox.md').default },
          { name: 'disabled', code: require('repository/packages/core/src/FrameUnderline/FrameUnderline.disabled.sandbox.md').default },
          { name: 'static', code: require('repository/packages/core/src/FrameUnderline/FrameUnderline.static.sandbox.md').default }
        ]
      }
    ]
  }
];

export { playgroundConfigs };
