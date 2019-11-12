/* eslint-disable */

export default [
  {
    name: 'sounds',
    items: [
      { name: 'withSounds', component: require('../packages/sounds/src/withSounds/withSounds.sandbox.js').default }
    ]
  },
  {
    name: 'animation',
    items: [
      { name: 'withEnergy', component: require('../packages/animation/src/withEnergy/withEnergy.sandbox.js').default },
      { name: 'Stream', component: require('../packages/animation/src/Stream/Stream.sandbox.js').default }
    ]
  }
];
