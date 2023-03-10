import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/route';
import { PageLoader } from 'widgets/PageLoader';

function AppRouter() {
  return (
    <Routes>
      {Object.values(routeConfig).map(({ element, path }) => (
        <Route
          path={path}
          element={(
            <Suspense fallback={<PageLoader />}>
              <div className="page-wrapper">
                {element}
              </div>
            </Suspense>
          )}
          key={path}
        />
      ))}
    </Routes>
  );
}

export default AppRouter;
