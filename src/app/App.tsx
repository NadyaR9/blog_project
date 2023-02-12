import { useTheme } from './providers/ThemeProvider';
import { classNames } from 'shared/config/lib/classNames';
import { AppRouter } from './providers/router';
import { Navbar } from 'widgets/Navbar';

import './styles/index.scss';

export const App = () => {
  const { theme } = useTheme();
  return (
    <div className={classNames('app', {hidden: true, show: false}, [theme])}>
      <Navbar />
      <AppRouter />
    </div>
  )
};
