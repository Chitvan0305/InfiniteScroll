import React, { useCallback, useRef, useEffect } from 'react';

const useInfiniteScroll = (callBack, dependencies) => {
  const observer = useRef(null);

  const ref = useCallback((node) => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callBack();
      }
    });

    if (node) {
      observer.current.observe(node);
    }
  }, [callBack, ...dependencies]);

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return ref;
};

export default useInfiniteScroll;
