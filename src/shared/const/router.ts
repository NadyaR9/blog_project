export enum RouteName {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',
  NOT_FOUND = 'error',
  ARTICLES = 'articles',
  ARTICLE_DETAILS = 'article_details',
  ADMIN = 'admin',
  FORBIDDEN = 'access_denied'
}

export const RoutePath: Record<RouteName, string> = {
  [RouteName.MAIN]: '/',
  [RouteName.ABOUT]: '/about',
  [RouteName.PROFILE]: '/profile/',
  [RouteName.ARTICLES]: '/articles',
  [RouteName.ARTICLE_DETAILS]: '/articles/',
  [RouteName.ADMIN]: '/admin',
  [RouteName.FORBIDDEN]: '/access_denied',
  [RouteName.NOT_FOUND]: '*',
};
