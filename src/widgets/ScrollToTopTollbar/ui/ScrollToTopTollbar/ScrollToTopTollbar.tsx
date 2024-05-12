import { memo } from 'react';
import cls from './ScrollToTopTollbar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ScrollToTopButton } from '@/features/scrollToTopButton';
import { VStack } from '@/shared/ui/redesigned/Stack';

interface ScrollToTopTollbarProps {
  className?: string;
}

export const ScrollToTopTollbar = memo((props: ScrollToTopTollbarProps) => {
  const { className } = props;

  return (
    <VStack
      className={classNames(cls.ScrollToTopTollbar, {}, [className])}
      justify="center"
      align="center"
      max
    >
      <ScrollToTopButton />
    </VStack>
  );
});
