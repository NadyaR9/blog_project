import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { RouteProps } from 'react-router-dom';

export enum RouteName {
  MAIN = 'main',
  ABOUT = 'about',
  NOT_FOUND = 'error'
}

export const RoutePath: Record<RouteName, string> = {
  [RouteName.MAIN]: '/',
  [RouteName.ABOUT]: '/about',
  [RouteName.NOT_FOUND]: '*',
};

export const routeConfig: Record<RouteName, RouteProps> = {
  [RouteName.MAIN]: {
    path: RoutePath[RouteName.MAIN],
    element: <MainPage />,
  },
  [RouteName.ABOUT]: {
    path: RoutePath[RouteName.ABOUT],
    element: <AboutPage />,
  },
  [RouteName.NOT_FOUND]: {
    path: RoutePath[RouteName.NOT_FOUND],
    element: <NotFoundPage />,
  },
};
