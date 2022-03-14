import { useEffect, useRef } from 'react';

const useDidMountEffect = (func: any, deps: any) => {
  const didMount = useRef(false);

  useEffect(() => {
    didMount.current ? func() : (didMount.current = true);
  }, deps);
};

export default useDidMountEffect;
