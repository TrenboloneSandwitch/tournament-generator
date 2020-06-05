/**
 * Identical to React.useEffect, except that it never runs on mount. This is the equivalent of
 * the componentDidUpdate lifecycle function.
 *
 * @param {function:function} effect - A useEffect effect.
 * @param {array} dependencies - useEffect dependency list.
 */
import React from "react";

export const useEffectExceptOnMount = (effect, dependencies) => {
  const mounted = React.useRef(false);
  React.useEffect(() => {
    if (mounted.current) {
      const unmount = effect();
      return () => unmount && unmount();
    } else {
      mounted.current = true;
    }
  }, dependencies);

  React.useEffect(() => {
    return () => (mounted.current = false);
  }, []);
};
