import {
  memo, Suspense, useCallback,
} from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig, AppRoutesProps } from '@/shared/config/route';
import { PageLoader } from '@/widgets/PageLoader';
import { RequireAuth } from './RequireAuth';

function AppRouter() {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense fallback={<PageLoader />}>
        {route.element}
      </Suspense>
    );
    return (
      <Route
        path={route.path}
        key={route.path}
        element={route.authOnly ? <RequireAuth roles={route.roles}>{element}</RequireAuth> : element}
      />
    );
  }, []);

  return (
    <Routes>
      {Object.values(routeConfig).map(renderWithWrapper)}
    </Routes>
  );
}

export default memo(AppRouter);
