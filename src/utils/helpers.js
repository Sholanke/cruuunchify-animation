export const debounce = fn => {
  let timeOut;
  let alreadyRanOnUpdate = false;
  const setAlreadyRanOnUpdate = bool => (alreadyRanOnUpdate = bool);

  function caller(args) {
    clearTimeout(timeOut);

    !alreadyRanOnUpdate && fn(args);

    setAlreadyRanOnUpdate(true);

    timeOut = setTimeout(() => {
      setAlreadyRanOnUpdate(false);
    }, 40);
  }
  return caller;
};

export const wheelDirection = event => {
  return event.deltaY >= 0 ? "BOTTOM" : "TOP";
};

export const INCREMENTER = (n, max = Infinity) => (n < max ? n + 1 : n);
export const DECREMENTER = (n, min = 0) => (n > min ? n - 1 : n);
