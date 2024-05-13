import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddExpenseMutation } from '../../api/expenseApi';
import { selectUserId } from '../../redux/selectors';
import { categoryTitles, categoryOptions } from '../../constants';

const ExpenseForm = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [shareCount, setShareCount] = useState(1);

  const userId = useSelector(selectUserId);
  const [addExpense, { isLoading: isAddingExpense }] = useAddExpenseMutation();

  const handleAddExpense = async (event) => {
    event.preventDefault();
    if (!amount || !description || !category || shareCount < 1) {
      console.log('Fields required');
      return;
    }

    try {
      const result = await addExpense({
        amount,
        description,
        category,
        userId,
        shareCount: Number(shareCount),
      });
      console.log('Expense added successfully:', result);
      setAmount('');
      setDescription('');
      setShareCount(1);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <form className="form" onSubmit={handleAddExpense}>
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
      <button type="submit" disabled={isAddingExpense}>
        {isAddingExpense ? 'Sparar..' : 'Lägg till'}
      </button>
    </form>
  );
};

export default ExpenseForm;
