import React from 'react';
import { formatNumber, getSortedInvestments, getSortedSavingsInvestments } from '../../utils/financialUtils';
import { FUTURE_SAVINGS, investmentCategories } from '../../constants';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../redux/selectors';
import LoadingIndicator from '../../components/general/LoadingIndicator';
import CategoryIcon from '../expense/CategoryIcon';
import DashboardItem from '../DashboardItem';
import SavingsListByYear from './SavingsListByYear';
import useSavingsData from '../../hooks/useSavingsData';
import TotalSavings from './TotalSavings';

const SavingsList = ({ groupedExpenses, savingsDate }) => {
  const userId = useSelector(selectUserId);
  const { isLoading, isFetching, isError, error, monthlySaving, total, investments, groupedByYear } = useSavingsData(
    userId,
    groupedExpenses,
    savingsDate,
  );

  const sortedInvestments = getSortedInvestments(investmentCategories, investments);
  const sortedSavingsInvestments = getSortedSavingsInvestments(investments);

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
          <DashboardItem title="Totalt värde" amount={total} />
          {sortedInvestments.map(({ key, title }) => (
            <DashboardItem key={key} title={title} amount={investments[key].amount} />
          ))}
          <DashboardItem title="Ditt månadssparande" amount={monthlySaving} />
        </div>

        <div className="expenses-list">
          {total > 0 && <TotalSavings sortedSavingsInvestments={sortedSavingsInvestments} />}
          {monthlySaving > 0 && (
            <div className="savings-list">
              <CategoryIcon category={FUTURE_SAVINGS} />
              <h3>Månadsvis sparande (12 mån)</h3>
              <p className="description-text">
                Fortsätt spara {formatNumber(monthlySaving)} SEK varje månad och se hur ditt sparande växer
              </p>
              <SavingsListByYear groupedByYear={groupedByYear} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavingsList;
