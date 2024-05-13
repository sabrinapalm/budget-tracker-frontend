import React, { useMemo } from 'react';
import { categoryDescriptions, categoryTitles } from '../../constants';
import {
  calculateTotalAmount,
  groupExpensesByCategory,
  sortCategories,
  formatNumber,
} from '../../utils/financialUtils';
import ExpensesItem from './ExpensesItem';
import CategoryIcon from './CategoryIcon';

const ExpensesList = ({ expenses, categoryOrder }) => {
  const groupedExpenses = useMemo(() => groupExpensesByCategory(expenses), [expenses]);
  const sortedCategoriesByUserOrder = useMemo(
    () => sortCategories(Object.keys(groupedExpenses), categoryOrder),
    [groupedExpenses, categoryOrder],
  );

  return (
    <div className="expenses-list">
      {sortedCategoriesByUserOrder.map((category) => (
        <div key={category}>
          <h3>
            <CategoryIcon category={category} />
            <p>
              {categoryTitles[category]} ({formatNumber(calculateTotalAmount(groupedExpenses[category]))} SEK)
            </p>
            <p className="description-text">{categoryDescriptions[category] || 'No description available.'}</p>
          </h3>
          <ul>
            {groupedExpenses[category]
              ?.sort((a, b) => b.amount - a.amount)
              .map((expense) => (
                <ExpensesItem key={expense._id} expense={expense} />
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ExpensesList;
