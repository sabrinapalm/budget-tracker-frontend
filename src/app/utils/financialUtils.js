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
  const daysUntilSalary = Math.ceil((nextSalaryDate - currentDate) / (1000 * 60 * 60 * 24));
  const dayOfWeek = nextSalaryDate.toLocaleDateString('sv-SE', { weekday: 'long' });

  return `${daysUntilSalary} dagar (${dayOfWeek})`;
};

export const generateMonthlySavings = (savingsDate, total, monthlySaving) => {
  const today = new Date();
  const savings = [];
  let month = today.getMonth();
  let year = today.getFullYear();
  let savingsCount = 0;

  const addMonthlySavings = (startMonth, startYear) => {
    for (let i = 0; i < 12; i++) {
      if (savingsCount >= 12) break;

      if (startMonth >= 12) {
        startMonth = 0;
        startYear++;
      }

      const t = total + (savings.length + 1) * monthlySaving;
      savings.push({ month: startMonth, year: startYear, amount: t });
      startMonth++;
      savingsCount++;
    }
  };

  addMonthlySavings(today.getDate() < savingsDate ? month : month + 1, year);

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
