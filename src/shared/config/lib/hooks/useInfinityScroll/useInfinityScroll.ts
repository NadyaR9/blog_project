/* eslint-disable react-hooks/exhaustive-deps */
import { MutableRefObject, useEffect } from 'react';

export interface useInfinityScrollOptions {
  callback?: () => void; // call when we cross element
  triggerRef: MutableRefObject<HTMLElement>;// crossed element
  wrapperRef : MutableRefObject<HTMLElement>; // ref container
}

export function useInfinityScroll({ callback, triggerRef, wrapperRef }:useInfinityScrollOptions) {
  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    if (callback) {
      const options = {
        root: wrapperRef.current,
        rootMargin: '0px',
        threshold: 1.0,
      };

      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      }, options);
      observer.observe(triggerRef.current);
    }
    return () => {
      if (observer) {
        observer.unobserve(triggerRef.current);
      }
    };
  }, [callback, wrapperRef]);
}
