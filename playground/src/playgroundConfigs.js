const playgroundConfigs = [
  {
    name: 'animation',
    components: [
      {
        name: 'withAnimator',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/animation/src/withAnimator/basic.sandbox.md').default },
          { name: 'nested', code: require('repository/packages/animation/src/withAnimator/nested.sandbox.md').default }
        ]
      }
    ]
  },
  {
    name: 'sounds',
    components: [
      {
        name: 'withSounds',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/sounds/src/withSounds/basic.sandbox.md').default }
        ]
      }
    ]
  }
];

export { playgroundConfigs };
