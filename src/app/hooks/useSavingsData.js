import { useGetSavingsQuery } from '../api/savingsApi';
import { SAVINGS } from '../constants';
import { calculateTotalAmount, generateMonthlySavings, groupByYear } from '../utils/financialUtils';

const useSavingsData = (userId, groupedExpenses, savingsDate) => {
  const { data: savings, isLoading, isFetching, isError, error } = useGetSavingsQuery(userId);
  const monthlySaving = calculateTotalAmount(groupedExpenses[SAVINGS]);

  const investments = savings?.investments || {};
  const investmentCategories = ['pension', 'funds', 'other', 'buffer'];

  const investmentAmounts = investmentCategories.map((category) => investments[category]?.amount || 0);
  const total = investmentAmounts.reduce((acc, amount) => acc + amount, 0);

  const monthlySavings = generateMonthlySavings(savingsDate, total, monthlySaving);
  const groupedByYear = groupByYear(monthlySavings);

  return { savings, isLoading, isFetching, isError, error, monthlySaving, total, investments, groupedByYear };
};

export default useSavingsData;
