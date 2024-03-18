import { classNames } from '@/shared/config/lib/classNames/classNames';
import { HStack, Loader } from '@/shared/ui';
import cls from './PageLoader.module.scss';

interface PageLoaderProps {
  className?: string,
}

export const PageLoader = ({ className }: PageLoaderProps) => (
  <HStack justify="center" className={classNames(cls.PageLoader, {}, [className])}>
    <Loader />
  </HStack>
);
