import { RouteProps } from 'react-router-dom';
// eslint-disable-next-line eslint-check-relative-path/layers-import
import { UserRole } from '@/entities/User';

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
  roles?: UserRole[];
};
