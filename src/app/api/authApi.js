import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { USER_TAG, API_URL } from './apiConstants';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
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
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
    }),
    getUserData: builder.query({
      query: () => ({
        url: 'auth/user',
        method: 'GET',
      }),
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
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserDataQuery,
  useUpdateUserSettingsMutation,
} = authApi;

export default authApi;
