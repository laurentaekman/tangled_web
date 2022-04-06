import { useEffect, useRef } from "react";

export const useInfiniteScroll = (callback: () => void, options: any) => {
  const scrollTargetRef = useRef(null);

  useEffect(() => {
    const scrollTarget = scrollTargetRef.current;
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        callback();
      }
    }, options);

    //If we have a declared scroll ref, observe it so we can log entries as they occur
    if (scrollTarget) {
      observer.observe(scrollTarget);
    }

    //In the case of unmounting a page, stop observing the scroll ref
    return () => {
      if (scrollTarget) {
        observer.unobserve(scrollTarget);
      }
    };
  }, [scrollTargetRef, callback, options]);

  return scrollTargetRef;
};
