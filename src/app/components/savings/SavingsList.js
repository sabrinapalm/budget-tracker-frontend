import React, { useState, useCallback } from 'react';
import { formatNumber } from '../../utils/financialUtils';
import { CURRENT_SAVINGS, FUTURE_SAVINGS, investmentCategories, savingsCategoryTitles } from '../../constants';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../redux/selectors';
import { DeleteOutline, ModeEditOutlineOutlined } from '@mui/icons-material';
import LoadingIndicator from '../../components/general/LoadingIndicator';
import CategoryIcon from '../expense/CategoryIcon';
import DashboardItem from '../DashboardItem';
import SavingsListByYear from './SavingsListByYear';
import useSavingsData from '../../hooks/useSavingsData';
import FormDialog from '../general/FormDialog';
import { useDeleteInvestmentMutation } from '../../api/savingsApi';
import SavingsForm from '../forms/SavingsForm';

const SavingsList = ({ groupedExpenses, savingsDate }) => {
  const [isSavingsFormOpen, setIsSavingsFormOpen] = useState();
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const userId = useSelector(selectUserId);
  const { isLoading, isFetching, isError, error, monthlySaving, total, investments, groupedByYear, savings } =
    useSavingsData(userId, groupedExpenses, savingsDate);
  const [deleteInvestment] = useDeleteInvestmentMutation();

  const handleDelete = async (category) => {
    try {
      await deleteInvestment({ userId, category });
      console.log(`Investment in category ${category} deleted successfully.`);
    } catch (err) {
      console.error('Failed to delete investment:', err);
    }
  };

  const handleOpenSavingsForm = useCallback((investment) => {
    setSelectedInvestment(investment);
    setIsSavingsFormOpen(true);
  }, []);

  const handleCloseSavingsForm = useCallback(() => {
    setIsSavingsFormOpen(false);
    setSelectedInvestment(null);
  }, []);

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
          {investmentCategories.map(
            ({ key, title }) =>
              investments[key]?.amount > 0 && (
                <DashboardItem key={key} title={title} amount={investments[key].amount} />
              ),
          )}
          <DashboardItem title="Ditt månadssparande" amount={monthlySaving} />
        </div>

        <div className="expenses-list">
          <div>
            <h3>
              <CategoryIcon category={CURRENT_SAVINGS} />
              <p>Totalt sparat</p>
              <p className="description-text">Här är ditt innehav idag</p>
            </h3>
            <ul>
              {Object.values(savings.investments).map((investment) => (
                <li key={investment._id}>
                  <div>
                    <p className="expense-title">{savingsCategoryTitles[investment.category]}</p>
                    <p className="expense-amount">{formatNumber(investment.amount)} SEK</p>
                  </div>

                  <div className="category-list-button-wrapper">
                    <button onClick={() => handleOpenSavingsForm(investment)} className="delete">
                      <ModeEditOutlineOutlined fontSize="small" />
                    </button>
                    <FormDialog
                      title="Uppdatera investering"
                      isOpen={isSavingsFormOpen}
                      onClose={handleCloseSavingsForm}
                    >
                      <SavingsForm investment={selectedInvestment} onClose={handleCloseSavingsForm} />
                    </FormDialog>
                    <button onClick={() => handleDelete(investment.category)} className="delete">
                      <DeleteOutline fontSize="small" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="savings-list">
            <CategoryIcon category={FUTURE_SAVINGS} />
            <h3>Månadsvis sparande</h3>
            <p className="description-text">
              Fortsätt spara {formatNumber(monthlySaving)} SEK varje månad och se hur ditt sparande växer!
            </p>
            <SavingsListByYear groupedByYear={groupedByYear} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsList;
