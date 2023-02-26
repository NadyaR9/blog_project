import { Suspense } from 'react';
import { classNames } from 'shared/config/lib/classNames/classNames';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { AppRouter } from './providers/router';

export function App() {
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
