/* eslint-disable react-hooks/exhaustive-deps */
import { MutableRefObject, useEffect } from 'react';

export interface useInfinityScrollOptions {
  callback?: () => void; // call when we cross element
  triggerRef: MutableRefObject<HTMLElement>; // crossed element
  wrapperRef: MutableRefObject<HTMLElement>; // ref container
}

export function useInfinityScroll({
  callback,
  triggerRef,
  wrapperRef,
}: useInfinityScrollOptions) {
  useEffect(() => {
    const wrapperElement = wrapperRef.current;
    const triggerElement = triggerRef.current;
    let observer: IntersectionObserver | null = null;

    if (callback) {
      const options = {
        root: wrapperElement,
        rootMargin: '0px',
        threshold: 1.0,
      };

      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      }, options);
      observer.observe(triggerElement);
    }
    return () => {
      if (observer && triggerElement) {
        observer.unobserve(triggerElement);
      }
    };
  }, [callback, wrapperRef]);
}
