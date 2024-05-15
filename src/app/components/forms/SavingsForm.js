import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddSavingsMutation } from '../../api/savingsApi';
import { selectUserId } from '../../redux/selectors';
import { savingsCategoryOptions, savingsCategoryTitles } from '../../constants';

const SavingsForm = () => {
  const [investmentCategory, setInvestmentCategory] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');

  const userId = useSelector(selectUserId);
  const [addSavings, { isLoading: isAddingSavings }] = useAddSavingsMutation();

  const handleAddSavings = async (event) => {
    event.preventDefault();
    if (!investmentCategory || !investmentAmount) {
      console.log('All fields are required');
      return;
    }

    try {
      const investments = {
        [investmentCategory]: {
          category: investmentCategory,
          amount: Number(investmentAmount),
        },
      };

      const result = await addSavings({
        investments,
        userId,
      });
      console.log('Savings added successfully:', result);
      setInvestmentCategory('');
      setInvestmentAmount('');
    } catch (error) {
      console.error('Error adding savings:', error);
    }
  };

  return (
    <form className="form" onSubmit={handleAddSavings}>
      <div>
        <label htmlFor="investmentCategory">Investerings kategori</label>
        <select
          id="investmentCategory"
          value={investmentCategory}
          onChange={(e) => setInvestmentCategory(e.target.value)}
          required
        >
          <option value="" disabled>
            Välj en kategori
          </option>
          {savingsCategoryOptions.map((category) => (
            <option key={category} value={category}>
              {savingsCategoryTitles[category]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="investmentAmount">Summa</label>
        <input
          id="investmentAmount"
          type="number"
          value={investmentAmount}
          onChange={(e) => setInvestmentAmount(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={isAddingSavings}>
        {isAddingSavings ? 'Sparar..' : 'Spara'}
      </button>
    </form>
  );
};

export default SavingsForm;
