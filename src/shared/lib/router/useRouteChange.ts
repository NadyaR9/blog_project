import { matchPath, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RouteName, AppRoutesByPathPattern } from '@/shared/const/router';

export function useRouteChange() {
  const location = useLocation();
  const [appRoute, setAppRoute] = useState<RouteName>(RouteName.MAIN);

  useEffect(() => {
    Object.entries(AppRoutesByPathPattern).every(([pattern, route]) => {
      if (matchPath(pattern, location.pathname)) {
        setAppRoute(route);
        return false;
      }
      return true;
    });
  }, [location.pathname]);

  return appRoute;
}
