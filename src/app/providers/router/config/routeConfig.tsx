import { UserRole } from '@/entities/User';
import { AboutPage } from '@/pages/AboutPage';
import { AdminPanelPage } from '@/pages/AdminPanel';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { SettingsPage } from '@/pages/SettingsPage';
import { AppRoutesProps } from '@/shared/config/types/router';
import {
  RouteName,
  getRouteAbout,
  getRouteAdmin,
  getRouteArticleDdetails,
  getRouteArticles,
  getRouteForbidden,
  getRouteMain,
  getRouteNotFound,
  getRouteProfile,
  getRouteSettings,
} from '@/shared/const/router';

export const routeConfig: Record<RouteName, AppRoutesProps> = {
  [RouteName.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />,
  },
  [RouteName.SETTINGS]: {
    path: getRouteSettings(),
    element: <SettingsPage />,
  },
  [RouteName.ABOUT]: {
    path: getRouteAbout(),
    element: <AboutPage />,
  },
  [RouteName.PROFILE]: {
    path: getRouteProfile(':id'),
    element: <ProfilePage />,
    authOnly: true,
  },
  [RouteName.ARTICLES]: {
    path: getRouteArticles(),
    element: <ArticlesPage />,
    authOnly: true,
  },
  [RouteName.ARTICLE_DETAILS]: {
    path: getRouteArticleDdetails(':id'),
    element: <ArticleDetailsPage />,
    authOnly: true,
  },
  [RouteName.ADMIN]: {
    path: getRouteAdmin(),
    element: <AdminPanelPage />,
    authOnly: true,
    roles: [UserRole.ADMIN, UserRole.MANAGER],
  },
  [RouteName.FORBIDDEN]: {
    path: getRouteForbidden(),
    element: <ForbiddenPage />,
    authOnly: true,
  },
  [RouteName.NOT_FOUND]: {
    path: getRouteNotFound(),
    element: <NotFoundPage />,
  },
};
