import { UserRole } from '@/entities/User';
import { AboutPage } from '@/pages/AboutPage';
import { AdminPanelPage } from '@/pages/AdminPanel';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { AppRoutesProps } from '@/shared/config/types/router';
import { RouteName, RoutePath } from '@/shared/const/router';

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
  [RouteName.ADMIN]: {
    path: RoutePath[RouteName.ADMIN],
    element: <AdminPanelPage />,
    authOnly: true,
    roles: [UserRole.ADMIN, UserRole.MANAGER],
  },
  [RouteName.FORBIDDEN]: {
    path: RoutePath[RouteName.FORBIDDEN],
    element: <ForbiddenPage />,
    authOnly: true,
  },
  [RouteName.NOT_FOUND]: {
    path: RoutePath[RouteName.NOT_FOUND],
    element: <NotFoundPage />,
  },
};
