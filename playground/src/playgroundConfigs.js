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
      }
    ]
  }
];

export { playgroundConfigs };
