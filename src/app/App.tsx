import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import './styles/index.scss';

import { useTheme } from './providers/ThemeProvider';
import { classNames } from 'shared/config/lib/classNames';
import { AppRouter } from './providers/router';
import { Navbar } from 'widgets/Navbar';

export const App = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={classNames('app', {hidden: true, show: false}, [theme])}>
      <button onClick={toggleTheme}>Change Theme</button>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <AppRouter />
      </Suspense>
    </div>
  )
};
