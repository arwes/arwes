function makeScheduler () {
  const timeouts = {};

  function stop (id) {
    clearTimeout(timeouts[id]);
  }

  function stopAll () {
    Object.values(timeouts).forEach(clearTimeout);
  }

  function start (a, b, c) {
    const id = c ? a : undefined;
    const time = c ? b : a;
    const callback = c || b;

    stop(id);
    timeouts[id] = setTimeout(callback, time);
  }

  return { stop, stopAll, start };
}

export { makeScheduler };
