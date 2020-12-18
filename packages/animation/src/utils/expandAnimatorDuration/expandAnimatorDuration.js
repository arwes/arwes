function expandAnimatorDuration (duration) {
  if (typeof duration === 'number') {
    return { enter: duration, exit: duration };
  }

  return duration;
}

export { expandAnimatorDuration };
