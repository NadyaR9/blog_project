import { classNames } from '@/shared/config/lib/classNames/classNames';
import cls from './PageLoader.module.scss';
import { HStack } from '@/shared/ui/Stack';
import { Loader } from '@/shared/ui/Loader';

interface PageLoaderProps {
  className?: string,
}

export const PageLoader = ({ className }: PageLoaderProps) => (
  <HStack justify="center" className={classNames(cls.PageLoader, {}, [className])}>
    <Loader />
  </HStack>
);
