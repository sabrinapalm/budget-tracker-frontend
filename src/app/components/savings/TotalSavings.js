import React, { useState, useCallback } from 'react';
import { ModeEditOutlineOutlined, DeleteOutline } from '@mui/icons-material';
import CategoryIcon from '../expense/CategoryIcon';
import { CURRENT_SAVINGS, savingsCategoryTitles } from '../../constants';
import { formatNumber } from '../../utils/financialUtils';
import { useDeleteInvestmentMutation } from '../../api/savingsApi';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../redux/selectors';
import FormDialog from '../general/FormDialog';
import SavingsForm from '../forms/SavingsForm';

const TotalSavings = ({ sortedSavingsInvestments }) => {
  const userId = useSelector(selectUserId);

  const [isSavingsFormOpen, setIsSavingsFormOpen] = useState();
  const [selectedInvestment, setSelectedInvestment] = useState(null);

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

  return (
    <div>
      <h3>
        <CategoryIcon category={CURRENT_SAVINGS} />
        <p>Totalt sparande</p>
        <p className="description-text">Ditt aktuella innehav</p>
      </h3>
      <ul>
        {sortedSavingsInvestments.map((investment) => (
          <li key={investment._id}>
            <div>
              <p className="expense-title">{savingsCategoryTitles[investment.category]}</p>
              <p className="expense-amount">{formatNumber(investment.amount)} SEK</p>
            </div>

            <div className="category-list-button-wrapper">
              <button onClick={() => handleOpenSavingsForm(investment)} className="edit">
                <ModeEditOutlineOutlined fontSize="small" />
              </button>
              <FormDialog title="Uppdatera investering" isOpen={isSavingsFormOpen} onClose={handleCloseSavingsForm}>
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
  );
};

export default TotalSavings;
