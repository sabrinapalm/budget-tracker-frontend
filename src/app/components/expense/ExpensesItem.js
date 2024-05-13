import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { DeleteOutline, VisibilityOffOutlined, ShortcutOutlined, ModeEditOutlineOutlined } from '@mui/icons-material';
import { useDeleteExpenseMutation, useUpdateExpenseMutation } from '../../api/expenseApi';
import { categoryTitles, categoryOptions } from '../../constants';
import { selectUserId } from '../../redux/selectors';
import { formatNumber } from '../../utils/financialUtils';
import FormDialog from '../general/FormDialog';
import EditExpenseForm from '../expense/EditExpenseForm';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import CategoryIcon from './CategoryIcon';

const ExpensesItem = ({ expense }) => {
  const userId = useSelector(selectUserId);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [updateExpense] = useUpdateExpenseMutation();
  const [deleteExpense, { isLoading: isDeletingExpense }] = useDeleteExpenseMutation();

  useOutsideClick(dropdownRef, () => {
    if (isDropdownOpen) setIsDropdownOpen(false);
  });

  const handleDeleteExpense = async () => {
    try {
      await deleteExpense({ expenseId: expense._id, userId });
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleToggleVisibility = async () => {
    const updatedExpense = { ...expense, hidden: !expense.hidden };
    try {
      await updateExpense({ expenseId: expense._id, ...updatedExpense, userId });
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelect = async (newCategory) => {
    const updatedExpense = { ...expense, category: newCategory };
    try {
      await updateExpense({ expenseId: expense._id, ...updatedExpense, userId });
    } catch (error) {
      console.error('Error updating expense:', error);
    }
    setIsDropdownOpen(false);
  };

  const handleToggleEdit = () => {
    setIsEditFormOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditFormOpen(false);
  };

  const dropdownStyles = {
    position: 'relative',
  };

  return (
    <li key={expense._id}>
      <div style={expense.hidden ? { opacity: 0.5 } : {}}>
        <p className="expense-title">{expense.description}</p>
        <p className="expense-amount">
          {formatNumber(expense.amount, expense?.shareCount)} SEK{' '}
          <span className="description-text">{expense?.shareCount > 1 ? `(1/${expense?.shareCount})` : ''}</span>
        </p>
      </div>

      <div className="category-list-button-wrapper">
        <button
          onClick={handleToggleEdit}
          className="delete"
          disabled={isDeletingExpense}
          style={expense.hidden ? { opacity: 0.5 } : {}}
        >
          <ModeEditOutlineOutlined fontSize="small" />
        </button>
        <FormDialog title="Ändra utgift" isOpen={isEditFormOpen} onClose={handleCloseEdit}>
          <EditExpenseForm expense={expense} onSuccess={handleCloseEdit} />
        </FormDialog>

        <button
          onClick={handleToggleVisibility}
          className="delete"
          disabled={isDeletingExpense}
          style={expense.hidden ? { opacity: 0.5 } : {}}
        >
          <VisibilityOffOutlined fontSize="small" />
        </button>

        <div style={dropdownStyles} ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="delete"
            disabled={isDeletingExpense}
            style={expense.hidden ? { opacity: 0.5 } : {}}
          >
            <ShortcutOutlined fontSize="small" />
          </button>
          {isDropdownOpen && (
            <ul className="menu-dropdown">
              {categoryOptions.map((category) => (
                <li key={category} onClick={() => handleSelect(category)}>
                  <CategoryIcon category={category} iconProps={{ fontSize: 'small' }} />
                  {categoryTitles[category]}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={handleDeleteExpense}
          className="delete"
          disabled={isDeletingExpense}
          style={expense.hidden ? { opacity: 0.5 } : {}}
        >
          <DeleteOutline fontSize="small" />
        </button>
      </div>
    </li>
  );
};

export default ExpensesItem;
