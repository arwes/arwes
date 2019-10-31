function makeScheduler () {
  let timeout;

  function stop () {
    clearTimeout(timeout);
  }

  function start (time, callback) {
    stop();
    timeout = setTimeout(callback, time);
  }

  return { stop, start };
}

export { makeScheduler };
