export enum RouteName {
  MAIN = 'main',
  SETTINGS = 'settings',
  ABOUT = 'about',
  PROFILE = 'profile',
  NOT_FOUND = 'error',
  ARTICLES = 'articles',
  ARTICLE_DETAILS = 'article_details',
  ADMIN = 'admin',
  FORBIDDEN = 'access_denied',
}

export const getRouteMain = () => '/';
export const getRouteSettings = () => '/settings';
export const getRouteAbout = () => '/about';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteArticles = () => '/articles';
export const getRouteArticleDdetails = (id: string) => `/articles/${id}`;
export const getRouteAdmin = () => '/admin';
export const getRouteForbidden = () => '/access_denied';
export const getRouteNotFound = () => '*';

export const AppRoutesByPathPattern: Record<string, RouteName> = {
  [getRouteMain()]: RouteName.MAIN,
  [getRouteSettings()]: RouteName.SETTINGS,
  [getRouteAbout()]: RouteName.ABOUT,
  [getRouteProfile(':id')]: RouteName.PROFILE,
  [getRouteArticles()]: RouteName.ARTICLES,
  [getRouteArticleDdetails(':id')]: RouteName.ARTICLE_DETAILS,
  [getRouteAdmin()]: RouteName.ADMIN,
  [getRouteForbidden()]: RouteName.FORBIDDEN,
  [getRouteNotFound()]: RouteName.NOT_FOUND,
};
