import { FeaturesFlag } from '@/shared/config/types/featuresFlag';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MANAGER = 'MANAGER',
}
export interface User {
  id: string;
  username: string;
  avatar?: string;
  roles?: UserRole[];
  features?: FeaturesFlag;
}

export interface UserSchema {
  authData?: User;
  _inited?: boolean;
}
