interface GetTransitionTextDurationProps {
  /**
   * Text length.
   */
  length: number
  /**
   * Maximum duration in seconds.
   */
  maxDuration?: number
  /**
   * Characters per second.
   */
  cps?: number
}

const getTransitionTextDuration = (props: GetTransitionTextDurationProps): number => {
  const {
    length,
    maxDuration = 4,
    cps = 400
  } = props;

  // The time it will take to add/remove a character per frame multiplied by
  // the total characters length.
  const realDuration = ((1000 / cps) * length) / 1000;

  return Math.min(realDuration, maxDuration);
};

export { getTransitionTextDuration };
