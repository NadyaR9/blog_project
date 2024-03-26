import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/config/tests';
import AppRouter from './AppRouter';
import { getRouteAdmin, getRouteMain, getRouteProfile } from '@/shared/const/router';
import { UserRole } from '@/entities/User';

describe('app/router/ui/AppRouter.test', () => {
  test('should render main AppRoute', async () => {
    componentRender(<AppRouter />, {
      route: getRouteMain(),
    });
    const mainPage = await screen.findByTestId('MainPage');
    expect(mainPage).toBeInTheDocument();
  });
  test('should redirect to forbidden page', async () => {
    componentRender(<AppRouter />, {
      route: getRouteAdmin(),
      initialState: { user: { _inited: true, authData: { id: '1', roles: [UserRole.USER] } } },
    });
    const forbiddenPage = await screen.findByTestId('ForbiddenPage');
    expect(forbiddenPage).toBeInTheDocument();
  });
  test('should redirect to admin page', async () => {
    componentRender(<AppRouter />, {
      route: getRouteAdmin(),
      initialState: { user: { _inited: true, authData: { id: '1', roles: [UserRole.ADMIN] } } },
    });
    const adminPage = await screen.findByTestId('AdminPanel');
    expect(adminPage).toBeInTheDocument();
  });
  test('should redirect to main page not authorized user', async () => {
    componentRender(<AppRouter />, {
      route: getRouteProfile('1'),
    });
    const mainPage = await screen.findByTestId('MainPage');
    expect(mainPage).toBeInTheDocument();
  });
  test('should redirect to not found page', async () => {
    componentRender(<AppRouter />, {
      route: '/mmmmmmmmmmm',
    });
    const notFoundPage = await screen.findByTestId('NotFoundPage');
    expect(notFoundPage).toBeInTheDocument();
  });
});
