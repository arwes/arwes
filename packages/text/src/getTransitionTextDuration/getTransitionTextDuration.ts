interface GetTransitionTextDurationProps {
  text: string
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
    text,
    maxDuration = 4,
    cps = 400
  } = props;

  // The time it will take to add/remove a character per frame multiplied by
  // the total characters.
  const realDuration = ((1000 / cps) * text.length) / 1000;

  return Math.min(realDuration, maxDuration);
};

export { getTransitionTextDuration };
