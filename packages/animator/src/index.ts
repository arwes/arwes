// TODO: Animator with "combine" should have its duration as the total duration
// of its children's durations.

// TODO: The scheduling right now is as follows:
// 1. Animator setup node
// 2. System create node
// 3. System schedules node setup
// 3. Animator schedules control change
// 3. Component subscribes to node
// 4. System node setup
// 5. System node transition
// 6. Machine run control change
// 6. System node transitions if applicable
// The sequence of events is not playing with the React scheduling system.
// And the initial schedules (setup and change) complicates the system.
// There should be a simpler way to sync with the React system to setup and
// properly detect for control changes for transitions.

// TODO: Add createAnimatorManagerSequence support.

export * from './types';
export * from './constants';
export * from './createAnimatorSystem/index';
