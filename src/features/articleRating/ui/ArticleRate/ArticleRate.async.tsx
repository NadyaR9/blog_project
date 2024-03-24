import { Suspense, lazy } from 'react';
import { ArticleRateProps } from './ArticleRate';
import { Skeleton } from '@/shared/ui/Skeleton';

const ArticleRateLazy = lazy(() => import('./ArticleRate'));

export const ArticleRateAsync = (props: ArticleRateProps) => {
  return (
    <Suspense fallback={<Skeleton width="100%" height={100} />}>
      <ArticleRateLazy {...props} />
    </Suspense>
  );
};
