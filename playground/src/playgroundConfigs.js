const playgroundConfigs = [
  {
    name: 'animation',
    components: [
      {
        name: 'withEnergy',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/animation/src/withEnergy/basic.sandbox.md').default }
        ]
      },
      {
        name: 'Stream',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/animation/src/Stream/basic.sandbox.md').default }
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
