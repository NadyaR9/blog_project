import { Suspense, lazy } from 'react';
import { ArticleRateProps } from './ArticleRate';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { ToggleFeature } from '@/shared/lib/features';

const ArticleRateLazy = lazy(() => import('./ArticleRate'));

export const ArticleRateAsync = (props: ArticleRateProps) => {
  return (
    <Suspense
      fallback={
        <ToggleFeature
          name="isAppRedesigned"
          on={<SkeletonRedesigned width="100%" height={100} />}
          off={<SkeletonDeprecated width="100%" height={100} />}
        />
      }
    >
      <ArticleRateLazy {...props} />
    </Suspense>
  );
};
