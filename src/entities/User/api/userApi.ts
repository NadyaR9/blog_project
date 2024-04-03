import { rtkApi } from '@/shared/api/rtkApi';
import { JsonSettings } from '../model/types/jsonSettings';
import { User } from '../model/types/user';

interface PatchSettingsArgs {
  userId: string;
  jsonSettings: JsonSettings;
}
const userApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    setJsonSettings: build.mutation<User, PatchSettingsArgs>({
      query: ({ jsonSettings, userId }: PatchSettingsArgs) => ({
        body: { jsonSettings },
        method: 'PATCH',
        url: `/users/${userId}`,
      }),
    }),
    getUserDataById: build.mutation<User, string>({
      query: (userId) => ({
        method: 'GET',
        url: `/users/${userId}`,
      }),
    }),
  }),
  overrideExisting: false,
});

export const setJsonSettingsMutation =
  userApi.endpoints.setJsonSettings.initiate;
export const getUserDataById = userApi.endpoints.getUserDataById.initiate;
