import { ReactElement } from 'react';
import { RouteName } from '@/shared/const/router';
import { ScrollToTopTollbar } from '@/widgets/ScrollToTopTollbar';
import { useRouteChange } from '@/shared/lib/router/useRouteChange';

export function useAppToolbar() {
  const appRoute = useRouteChange();
  const toolbarByAppRoute: OptionalRecord<RouteName, ReactElement> = {
    [RouteName.ARTICLES]: <ScrollToTopTollbar />,
    [RouteName.ARTICLE_DETAILS]: <ScrollToTopTollbar />,
  };
  return toolbarByAppRoute[appRoute];
}
