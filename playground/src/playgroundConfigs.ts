const playgroundConfigs = [
  // TODO: Example sandboxes to test the application. Remove after TypeScript migration.
  {
    name: 'animation',
    components: [
      {
        name: 'withAnimator',
        sandboxes: [
          {
            name: 'basic',
            code: 'render(<h1 style={{ color: "cyan" }}>Basic</h1>);'
          },
          {
            name: 'complex',
            code: 'render(<h1 style={{ color: "green" }}>Complex</h1>);'
          }
        ]
      }
    ]
  }
  /*
  {
    name: 'animation',
    components: [
      {
        name: 'withAnimator',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/animation/src/withAnimator/basic.sandbox.md').default },
          { name: 'nested', code: require('repository/packages/animation/src/withAnimator/nested.sandbox.md').default },
          { name: 'staggering', code: require('repository/packages/animation/src/withAnimator/staggering.sandbox.md').default },
          { name: 'sequence', code: require('repository/packages/animation/src/withAnimator/sequence.sandbox.md').default },
          { name: 'custom-manager', code: require('repository/packages/animation/src/withAnimator/custom-manager.sandbox.md').default }
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
  */
];

export { playgroundConfigs };
