import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useUpdateExpenseMutation } from '../../api/expenseApi';
import { categoryTitles, categoryOptions } from '../../constants';
import { selectUserId } from '../../redux/selectors';

const EditExpenseForm = ({ expense, onSuccess }) => {
  const [description, setDescription] = useState(expense?.description || '');
  const [amount, setAmount] = useState(expense?.amount || 0);
  const [shareCount, setShareCount] = useState(expense?.shareCount || 1);
  const [category, setCategory] = useState(expense?.category || '');

  const userId = useSelector(selectUserId);
  const [updateExpense, { isLoading }] = useUpdateExpenseMutation();

  const handleEditExpense = async (event) => {
    event.preventDefault();

    try {
      const result = await updateExpense({
        expenseId: expense._id,
        amount,
        description,
        category,
        userId,
        shareCount: Number(shareCount),
      });
      console.log('Update successful:', result);
      onSuccess();
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  return (
    <form className="form" onSubmit={handleEditExpense}>
      <div>
        <label htmlFor="description">Namn på utgift</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="amount">Summa</label>
        <input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="shareCount">Antal som delar</label>
        <p className="description-text">
          Ange hur många personer som delar på denna kostnad. Beloppet du anger kommer att delas jämnt mellan alla.
        </p>
        <input
          id="shareCount"
          type="number"
          min="1"
          value={shareCount}
          onChange={(e) => setShareCount(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="category">Kategori</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="" disabled>
            Välj en kategori
          </option>
          {categoryOptions.map((category) => (
            <option key={category} value={category}>
              {categoryTitles[category]}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Sparar..' : 'Spara'}
      </button>
    </form>
  );
};

export default EditExpenseForm;
