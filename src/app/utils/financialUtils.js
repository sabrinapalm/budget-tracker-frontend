export const formatNumber = (number, shareCount) => {
  const dividedNumber = shareCount ? number / Number(shareCount) : number;
  const roundedNumber = Math.ceil(dividedNumber);
  return new Intl.NumberFormat('sv-SE').format(roundedNumber);
};

export const calculateTotalAmount = (expenses = []) => {
  const totalAmount = expenses.reduce((total, expense) => {
    if (!expense.hidden) {
      const amountToCount = expense.shareCount ? expense.amount / expense.shareCount : expense.amount;
      return total + amountToCount;
    }
    return total;
  }, 0);

  return Math.ceil(totalAmount);
};

export const calculateRemainingBalance = (totalIncome, expenses) => {
  const totalExpenses = calculateTotalAmount(expenses);
  return totalIncome - totalExpenses;
};

export const groupExpensesByCategory = (expenses) =>
  expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = [];
    }
    acc[expense.category].push(expense);
    return acc;
  }, {});

export const sortCategories = (categories, categoryOrder) =>
  categories.sort((a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b));

export const calculateDaysUntilSalary = (salaryDay) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  let nextSalaryDate = new Date(currentYear, currentMonth, salaryDay);

  if (nextSalaryDate <= currentDate) {
    nextSalaryDate = new Date(currentYear, currentMonth + 1, salaryDay);

    if (currentMonth === 11) {
      nextSalaryDate = new Date(currentYear + 1, 0, salaryDay);
    }
  }

  const daysUntilSalary = Math.ceil((nextSalaryDate - currentDate) / (1000 * 60 * 60 * 24));
  const dayOfWeek = nextSalaryDate.toLocaleDateString('sv-SE', { weekday: 'long' });

  return `${daysUntilSalary} dagar (${dayOfWeek})`;
};

export const generateMonthlySavings = (savingsDate, total, monthlySaving) => {
  const today = new Date();
  const savings = [];
  let month = today.getMonth();
  let year = today.getFullYear();
  const currentDay = today.getDate();

  if (currentDay >= savingsDate) {
    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
  }

  while (month < 12) {
    const t = total + (savings.length + 1) * monthlySaving;
    savings.push({ month, year, amount: t });
    month++;
  }

  return savings;
};

export const groupByYear = (monthlySavings) => {
  return monthlySavings.reduce((acc, entry) => {
    if (!acc[entry.year]) {
      acc[entry.year] = [];
    }
    acc[entry.year].push(entry);
    return acc;
  }, {});
};

export const getSortedInvestments = (investmentCategories, investments) => {
  return investmentCategories
    .filter(({ key }) => investments?.[key]?.amount > 0)
    .sort((a, b) => investments[b.key].amount - investments[a.key].amount);
};

export const getSortedSavingsInvestments = (investments) => {
  return Object.values(investments)
    .filter((investment) => investment.amount > 0)
    .sort((a, b) => b.amount - a.amount);
};
