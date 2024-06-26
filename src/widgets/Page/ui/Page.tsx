import { MutableRefObject, ReactNode, UIEvent, memo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StateSchema } from '@/app/providers/StoreProvider';
import { useInfinityScroll } from '@/shared/lib/hooks/useInfinityScroll/useInfinityScroll';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  ScrollSaverActions,
  getScrollSaverByPath,
} from '@/features/ScrollSaver';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import cls from './Page.module.scss';
import { TestingProps } from '@/shared/const/testProps';
import { toggleFeatures } from '@/shared/lib/features';

interface PageProps extends TestingProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

export const Page = memo((props: PageProps) => {
  const { className, children, onScrollEnd } = props;
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const scrollPosition = useSelector((state: StateSchema) =>
    getScrollSaverByPath(state, pathname),
  );

  useInfinityScroll({
    triggerRef,
    wrapperRef: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => undefined,
      off: () => wrapperRef,
    }),
    callback: onScrollEnd,
  });

  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(
      ScrollSaverActions.setSCrollPosition({
        path: pathname,
        position: e.currentTarget.scrollTop,
      }),
    );
  }, 500);

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  });

  return (
    <main
      className={classNames(
        toggleFeatures({
          name: 'isAppRedesigned',
          on: () => cls.PageRedesigned,
          off: () => cls.Page,
        }),
        {},
        [className],
      )}
      ref={wrapperRef}
      onScroll={onScroll}
      data-testid={props['data-testid']}
    >
      {children}
      {onScrollEnd ? <div ref={triggerRef} className={cls.trigger} /> : null}
    </main>
  );
});
