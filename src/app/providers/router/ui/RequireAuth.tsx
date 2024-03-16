import { getUserAuthData } from 'entites/User';
import { getUserRoles } from 'entites/User/model/selectors/rolesSelector';
import { UserRole } from 'entites/User/model/types/user';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from 'shared/config/route/routeConfig/routeConfig';

interface RequireAuthProps {
  children: JSX.Element,
  roles?: UserRole[],
}
export const RequireAuth = ({ children, roles }: RequireAuthProps) => {
  const auth = useSelector(getUserAuthData);
  const location = useLocation();
  const userRoles = useSelector(getUserRoles);

  const hasRequeiredRoles = useMemo(() => {
    if (!roles) return true;
    return roles.some((requireRole) => {
      const hasRole = userRoles?.includes(requireRole);
      return hasRole;
    });
  }, [roles, userRoles]);

  if (!hasRequeiredRoles) {
    return <Navigate to={RoutePath.access_denied} state={{ from: location }} replace />;
  }
  if (!auth) {
    return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
  }
  return children;
};
