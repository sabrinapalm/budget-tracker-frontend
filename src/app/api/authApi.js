import { USER_TAG } from './constants';
import { baseApi } from './baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: 'auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: 'auth/login',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: [USER_TAG],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
      invalidatesTags: [USER_TAG],
    }),
    getUserData: builder.query({
      query: () => 'auth/user',
      providesTags: [USER_TAG],
    }),
    updateUserSettings: builder.mutation({
      query: (updatedSettings) => ({
        url: 'auth/settings',
        method: 'PUT',
        body: updatedSettings,
      }),
      invalidatesTags: [USER_TAG],
    }),
  }),
  overrideExisting: false,
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserDataQuery,
  useUpdateUserSettingsMutation,
} = authApi;

export default authApi;
