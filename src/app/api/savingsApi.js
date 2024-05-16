import { baseApi } from './baseApi';
import { SAVINGS_TAG } from './constants';

const savingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSavings: builder.query({
      query: (userId) => `savings?userId=${userId}`,
      providesTags: [SAVINGS_TAG],
    }),
    addSavings: builder.mutation({
      query: (savingsData) => ({
        url: 'savings',
        method: 'PUT',
        body: savingsData,
      }),
      invalidatesTags: [SAVINGS_TAG],
    }),
    deleteInvestment: builder.mutation({
      query: ({ userId, category }) => ({
        url: `savings/${userId}/${category}`,
        method: 'DELETE',
      }),
      invalidatesTags: [SAVINGS_TAG],
    }),
  }),
});

export const { useGetSavingsQuery, useAddSavingsMutation, useDeleteInvestmentMutation } = savingsApi;

export default savingsApi;
