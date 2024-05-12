import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { MainLayout } from '../MainLayout';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import cls from './AppLoaderLayout.module.scss';

export const AppLoaderLayout = () => {
  return (
    <MainLayout
      header={
        <HStack className={cls.header}>
          <Skeleton width={40} height={40} border="50%" />
        </HStack>
      }
      content={
        <VStack gap="16" className={cls.content}>
          <Skeleton width="70%" height={32} border="16px" />
          <Skeleton width="40%" height={20} border="16px" />
          <Skeleton width="50%" height={20} border="16px" />
          <Skeleton width="30%" height={32} border="16px" />
          <Skeleton width="90%" height="40%" border="16px" />
          <Skeleton width="90%" height="40%" border="16px" />
        </VStack>
      }
      sidebar={<Skeleton width="220px" height="100%" border="32px" />}
    />
  );
};
