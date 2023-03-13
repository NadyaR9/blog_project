import { profileActions, profileReducer } from './model/slice/profileSlice';
import { ProfileSchema, Profile } from './model/types/profile';
import { fetchProfileData } from './model/services/fetchProfileData/fetchProfileData';
import { ProfileCard } from './ui/ProfileCard/ProfileCard';

export {
  profileActions,
  profileReducer,
  ProfileSchema,
  Profile,
  fetchProfileData,
  ProfileCard,
};
