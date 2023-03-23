import { AboutPage } from 'pages/AboutPage';
import { ArticleDetailsPage } from 'pages/ArticleDetailsPage';
import { ArticlesPage } from 'pages/ArticlesPage';
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
  ARTICLES = 'articles',
  ARTICLE_DETAILS = 'article_details'
}

export const RoutePath: Record<RouteName, string> = {
  [RouteName.MAIN]: '/',
  [RouteName.ABOUT]: '/about',
  [RouteName.PROFILE]: '/profile/',
  [RouteName.ARTICLES]: '/articles',
  [RouteName.ARTICLE_DETAILS]: '/articles/',
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
    path: `${RoutePath[RouteName.PROFILE]}:id`,
    element: <ProfilePage />,
    authOnly: true,
  },
  [RouteName.ARTICLES]: {
    path: RoutePath[RouteName.ARTICLES],
    element: <ArticlesPage />,
    authOnly: true,
  },
  [RouteName.ARTICLE_DETAILS]: {
    path: `${RoutePath[RouteName.ARTICLE_DETAILS]}:id`,
    element: <ArticleDetailsPage />,
    authOnly: true,
  },
  [RouteName.NOT_FOUND]: {
    path: RoutePath[RouteName.NOT_FOUND],
    element: <NotFoundPage />,
  },
};
