const playgrounds = [
  {
    packageName: 'sounds',
    components: [
      {
        componentName: 'withSounds',
        playground: require('../../packages/sounds/src/withSounds/withSounds.playground.js')
      }
    ]
  }
  /*
  {
    name: 'animation',
    items: [
      { name: 'withEnergy', component: require('../../packages/animation/src/withEnergy/withEnergy.sandbox.js').default },
      { name: 'Stream', component: require('../../packages/animation/src/Stream/Stream.sandbox.js').default }
    ]
  }
  */
];

export { playgrounds };
