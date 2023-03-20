import { getUserAuthData } from 'entites/User';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export const RequireAuth = ({ children }: {children: JSX.Element}) => {
  const user = useSelector(getUserAuthData);
  const location = useLocation();
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};
