import { userActions } from 'entites/User';
import { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { classNames } from 'shared/config/lib/classNames/classNames';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { AppRouter } from './providers/router';

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <div className={classNames('app', { hidden: true, show: false })}>
      <Suspense fallback>
        <Navbar />
        <div className="pages-container">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
}
