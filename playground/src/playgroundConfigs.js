const playgroundConfigs = [
  {
    name: 'design',
    components: [
      {
        name: 'createTheme',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/design/src/createTheme/basic.sandbox.md').default },
          { name: 'dynamic', code: require('repository/packages/design/src/createTheme/dynamic.sandbox.md').default }
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
          { name: 'basic', code: require('repository/packages/animation/src/withAnimator/basic.sandbox.md').default },
          { name: 'nesting', code: require('repository/packages/animation/src/withAnimator/nesting.sandbox.md').default },
          { name: 'staggering', code: require('repository/packages/animation/src/withAnimator/staggering.sandbox.md').default },
          { name: 'sequence', code: require('repository/packages/animation/src/withAnimator/sequence.sandbox.md').default },
          { name: 'custom-manager', code: require('repository/packages/animation/src/withAnimator/custom-manager.sandbox.md').default }
        ]
      },
      {
        name: 'extendAnimator',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/animation/src/extendAnimator/basic.sandbox.md').default }
        ]
      },
      {
        name: 'Animator',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/animation/src/Animator/basic.sandbox.md').default }
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
          { name: 'basic', code: require('repository/packages/sounds/src/withBleeps/basic.sandbox.md').default },
          { name: 'categories', code: require('repository/packages/sounds/src/withBleeps/categories.sandbox.md').default },
          { name: 'loops', code: require('repository/packages/sounds/src/withBleeps/loops.sandbox.md').default },
          { name: 'dynamic', code: require('repository/packages/sounds/src/withBleeps/dynamic.sandbox.md').default }
        ]
      }
    ]
  },
  {
    name: 'core',
    components: [
      {
        name: 'Text',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/core/src/Text/basic.sandbox.md').default },
          { name: 'dynamic', code: require('repository/packages/core/src/Text/dynamic.sandbox.md').default },
          { name: 'intercepting', code: require('repository/packages/core/src/Text/intercepting.sandbox.md').default },
          { name: 'multiple', code: require('repository/packages/core/src/Text/multiple.sandbox.md').default },
          { name: 'static', code: require('repository/packages/core/src/Text/static.sandbox.md').default }
        ]
      }
    ]
  }
];

export { playgroundConfigs };
