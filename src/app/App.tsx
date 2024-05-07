import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserInited, initAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { AppRouter } from './providers/router';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { PageLoader } from '@/widgets/PageLoader';
import { ToggleFeature } from '@/shared/lib/features';
import { MainLayout } from '@/shared/layouts/MainLayout';

export function App() {
  const dispatch = useAppDispatch();
  const inited = useSelector(getUserInited);

  useEffect(() => {
    dispatch(initAuthData());
  }, [dispatch]);

  if (!inited) {
    return <PageLoader />;
  }

  return (
    <ToggleFeature
      name="isAppRedesigned"
      off={
        <div
          className={classNames('app', { hidden: true, show: false })}
          id="app"
        >
          <Suspense fallback>
            <Navbar />
            <div className="pages-container">
              <Sidebar />
              {inited && <AppRouter />}
            </div>
          </Suspense>
        </div>
      }
      on={
        <div
          className={classNames('app_redesigned', {
            hidden: true,
            show: false,
          })}
          id="app"
        >
          <Suspense fallback>
            <MainLayout
              header={<Navbar />}
              content={<AppRouter />}
              sidebar={<Sidebar />}
            />
          </Suspense>
        </div>
      }
    />
  );
}
