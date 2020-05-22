import { useEffect, useRef } from 'react';

const noop = () => {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useInterval(callback: () => void, delay: number | null | false) {
  const savedCallback = useRef(noop);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export { useInterval };
