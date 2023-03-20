import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePage } from 'pages/ProfilePage';
import { RouteProps } from 'react-router-dom';

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean,
}

export enum RouteName {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',
  NOT_FOUND = 'error',
}

export const RoutePath: Record<RouteName, string> = {
  [RouteName.MAIN]: '/',
  [RouteName.ABOUT]: '/about',
  [RouteName.PROFILE]: '/profile',
  [RouteName.NOT_FOUND]: '*',
};

export const routeConfig: Record<RouteName, AppRoutesProps> = {
  [RouteName.MAIN]: {
    path: RoutePath[RouteName.MAIN],
    element: <MainPage />,
  },
  [RouteName.ABOUT]: {
    path: RoutePath[RouteName.ABOUT],
    element: <AboutPage />,
  },
  [RouteName.PROFILE]: {
    path: RoutePath[RouteName.PROFILE],
    element: <ProfilePage />,
    authOnly: true,
  },
  [RouteName.NOT_FOUND]: {
    path: RoutePath[RouteName.NOT_FOUND],
    element: <NotFoundPage />,
  },
};
