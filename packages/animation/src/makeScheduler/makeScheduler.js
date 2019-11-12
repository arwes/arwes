function makeScheduler () {
  const timeouts = {};

  function stop (id) {
    clearTimeout(timeouts[id]);
  }

  function stopAll () {
    Object.values(timeouts).forEach(clearTimeout);
  }

  function start (id, time, callback) {
    stop(id);
    timeouts[id] = setTimeout(callback, time);
  }

  return { stop, stopAll, start };
}

export { makeScheduler };
