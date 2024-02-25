import {
  MutableRefObject, ReactNode, UIEvent, memo, useRef,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useInfinityScroll } from 'shared/config/lib/hooks/useInfinityScroll/useInfinityScroll';
import { classNames } from 'shared/config/lib/classNames/classNames';
import { useAppDispatch } from 'shared/config/lib/hooks/useAppDispatch/useAppDispatch';
import { useLocation } from 'react-router-dom';
import { ScrollSaverActions, getScrollSaverByPath } from 'features/ScrollSaver';
import { useInitialEffect } from 'shared/config/lib/hooks/useInitialEffect/useInitialEffect';
import { useSelector } from 'react-redux';
import { StateSchema } from 'app/providers/StoreProvider';
import { useThrottle } from 'shared/config/lib/hooks/useThrottle/useThrottle';
import cls from './Page.module.scss';

interface PageProps {
  className?: string,
  children: ReactNode,
  onScrollEnd?: () => void;
}

export const Page = memo((props: PageProps) => {
  const { className, children, onScrollEnd } = props;
  const { t } = useTranslation();
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const scrollPosition = useSelector((state: StateSchema) => getScrollSaverByPath(state, pathname));

  useInfinityScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
  });

  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(ScrollSaverActions.setSCrollPosition({
      path: pathname,
      position: e.currentTarget.scrollTop,
    }));
  }, 500);

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  });

  return (
    <section
      className={classNames(cls.Page, {}, [className])}
      ref={wrapperRef}
      onScroll={onScroll}
    >
      {children}
      <div ref={triggerRef} />
    </section>
  );
});
