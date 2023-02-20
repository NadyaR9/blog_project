import { Suspense } from 'react';
import { classNames } from 'shared/config/lib/classNames/classNames';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { useTheme } from './providers/ThemeProvider';
import { AppRouter } from './providers/router';

import './styles/index.scss';

export function App() {
  const { theme } = useTheme();
  return (
    <div className={classNames('app', { hidden: true, show: false }, [theme])}>
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
