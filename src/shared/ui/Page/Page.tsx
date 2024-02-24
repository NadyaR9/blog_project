import {
  MutableRefObject, ReactNode, memo, useRef,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useInfinityScroll } from 'shared/config/lib/hooks/useInfinityScroll/useInfinityScroll';
import { classNames } from 'shared/config/lib/classNames/classNames';
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
  useInfinityScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
  });
  return (
    <section
      className={classNames(cls.Page, {}, [className])}
      ref={wrapperRef}
    >
      {children}
      <div ref={triggerRef} />
    </section>
  );
});
