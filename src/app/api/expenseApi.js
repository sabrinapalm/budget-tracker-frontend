import { baseApi } from './baseApi';
import { EXPENSE_TAG } from './constants';

const expenseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getExpenses: builder.query({
      query: (userId) => `expenses?userId=${userId}`,
      method: 'GET',
      providesTags: [EXPENSE_TAG],
    }),
    addExpense: builder.mutation({
      query: (expense) => ({
        url: 'expenses',
        method: 'POST',
        body: { ...expense },
      }),
      invalidatesTags: [EXPENSE_TAG],
    }),
    updateExpense: builder.mutation({
      query: ({ expenseId, ...expense }) => ({
        url: `expenses/${expenseId}`,
        method: 'PUT',
        body: { ...expense },
      }),
      invalidatesTags: [EXPENSE_TAG],
    }),
    deleteExpense: builder.mutation({
      query: ({ expenseId, userId }) => ({
        url: `expenses/${expenseId}`,
        method: 'DELETE',
        body: { userId },
      }),
      invalidatesTags: [EXPENSE_TAG],
    }),
  }),
});

export const { useGetExpensesQuery, useAddExpenseMutation, useUpdateExpenseMutation, useDeleteExpenseMutation } =
  expenseApi;

export default expenseApi;
