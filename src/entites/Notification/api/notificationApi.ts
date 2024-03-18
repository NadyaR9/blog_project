import { rtkApi } from '@/shared/api/rtkApi';
import { Notification } from '../model/types/notification';

const notificationApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifiactionList: build.query<Notification[], number>({
      query: (limit) => ({
        params: {
          _limit: limit,
        },
        url: '/notifications',
      }),
    }),
  }),
  overrideExisting: false,
});

export const useNotificationList = notificationApi.useGetNotifiactionListQuery;
