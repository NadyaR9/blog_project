import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import { RouteProps } from 'react-router-dom';

export enum RouteName {
  MAIN = 'main',
  ABOUT = 'about'
}

export const RoutePath: Record<RouteName, string> = {
  [RouteName.MAIN]: '/',
  [RouteName.ABOUT]: '/about',
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
};
