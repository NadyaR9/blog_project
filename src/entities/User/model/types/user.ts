import { FeaturesFlag } from '@/shared/config/types/featuresFlag';
import { JsonSettings } from './jsonSettings';

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
  jsonSettings?: JsonSettings;
}

export interface UserSchema {
  authData?: User;
  _inited?: boolean;
}
