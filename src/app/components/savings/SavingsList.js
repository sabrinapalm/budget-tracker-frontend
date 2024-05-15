import React from 'react';
import { formatNumber } from '../../utils/financialUtils';
import { SAVINGS } from '../../constants';
import { calculateTotalAmount, generateMonthlySavings } from '../../utils/financialUtils';
import { useGetSavingsQuery } from '../../api/savingsApi';
import CategoryIcon from '../expense/CategoryIcon';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../redux/selectors';
import LoadingIndicator from '../../components/general/LoadingIndicator';

const SavingsList = ({ groupedExpenses, savingsDate }) => {
  const userId = useSelector(selectUserId);
  const { data: savings, isLoading, isFetching, isError, error } = useGetSavingsQuery(userId);

  const monthlySaving = calculateTotalAmount(groupedExpenses[SAVINGS]);

  const pension = savings?.investments?.pension?.amount || 0;
  const funds = savings?.investments?.funds?.amount || 0;
  const other = savings?.investments?.other?.amount || 0;
  const total = pension + funds + other;

  const monthlySavings = generateMonthlySavings(savingsDate, total, monthlySaving);

  if (isFetching || isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <p>{error}</p>;
  }

  return (
    <div className="App-header">
      <div className="expense-page">
        <div className="dashboard">
          <div className="total">
            <h3>Totalt värde</h3>
            <h2>{formatNumber(total)} SEK</h2>
          </div>

          <div className="total">
            <h3>Fonder</h3>
            <h2>{formatNumber(funds)} SEK</h2>
          </div>

          <div className="total">
            <h3>Pension</h3>
            <h2>{formatNumber(pension)} SEK</h2>
          </div>

          <div className="total">
            <h3>Ditt månadssparande</h3>
            <h2>{formatNumber(monthlySaving)} SEK</h2>
          </div>
        </div>

        <div className="savings-list">
          <CategoryIcon category="CURRENT_SAVINGS" />
          <h3>Månadsvis sparande</h3>
          <p className="description-text">
            Fortsätt spara {formatNumber(monthlySaving)} SEK varje månad och se hur ditt sparande växer!
          </p>

          <ul>
            {monthlySavings.map((entry, index) => (
              <li key={index}>
                <p className="expense-title">
                  {new Date(entry.year, entry.month).toLocaleString('sv-SE', { month: 'long', year: 'numeric' })}
                </p>
                <p className="expense-amount">{formatNumber(entry.amount)} SEK</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SavingsList;
