import React from 'react';
import {
  calculateDaysUntilSalary,
  calculateRemainingBalance,
  calculateTotalAmount,
  formatNumber,
} from '../../utils/financialUtils';

const Header = ({ expenses, totalIncome, salaryDay }) => {
  const allExpenses = calculateTotalAmount(expenses);
  const remainingBalance = calculateRemainingBalance(totalIncome, expenses);
  const daysUntilSalary = salaryDay ? calculateDaysUntilSalary(salaryDay) : null;
  const balanceColor = remainingBalance < 0 ? 'red' : '';

  return (
    <div className="App-header">
      <span className="description-text">Efter skatt*</span>
      <div className="dashboard">
        <div className="total">
          <h3>Månadsinkomst*</h3>
          <h2>{formatNumber(totalIncome)} SEK</h2>
        </div>
        <div className="total">
          <h3>Totala utgifter</h3>
          <h2>-{formatNumber(allExpenses)} SEK</h2>
        </div>
        <div className="total">
          <h3>Återstående belopp</h3>
          <h2 style={{ color: balanceColor }}>{formatNumber(remainingBalance)} SEK</h2>
        </div>
        {daysUntilSalary && (
          <div className="total">
            <h3>Dagar kvar till lön</h3>
            <h2>{daysUntilSalary}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
