import { useEffect, useRef } from "react";

export const useInfiniteScroll = (callback: () => void, options: any) => {
  const scrollTargetRef = useRef(null);

  useEffect(() => {
    const scrollTarget = scrollTargetRef.current;
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        // console.log("triggering callback!");
        callback();
      }
    }, options);

    if (scrollTarget) {
      observer.observe(scrollTarget);
    }

    return () => {
      if (scrollTarget) {
        observer.unobserve(scrollTarget);
      }
    };
  }, [scrollTargetRef, callback, options]);

  return scrollTargetRef;
};
