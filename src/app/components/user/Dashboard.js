import React, { useState } from 'react';
import { ExitToAppOutlined, AccountCircleOutlined, AddCircleOutlineOutlined, TocOutlined } from '@mui/icons-material';
import { useGetExpensesQuery } from '../../api/expenseApi';
import LoadingIndicator from '../general/LoadingIndicator';
import ErrorDisplay from '../general/ErrorDisplay';
import Header from './Header';
import ExpansesList from '../expense/ExpansesList';
import FormDialog from '../general/FormDialog';
import ExpenseForm from '../expense/ExpenseForm';
import { getGreeting } from '../../utils/generalUtils';
import { groupExpensesByCategory, sortCategories } from '../../utils/financialUtils';
import SettingsForm from './SettingsForm';
import CategoryOrderForm from './CategoryOrderForm';

const Dashboard = ({ onLogout, userData }) => {
  const { data: expenses = [], error, isLoading } = useGetExpensesQuery(userData?._id);

  const [openDialog, setOpenDialog] = useState(null);

  const greeting = getGreeting(userData.firstName);

  const handleOpenDialog = (dialogName) => {
    setOpenDialog(dialogName);
  };

  const handleCloseDialog = () => {
    setOpenDialog(null);
  };

  const handleSaveCategoryOrder = () => {
    handleCloseDialog();
  };

  const categoryExpenses = Object.keys(groupExpensesByCategory(expenses));
  const sortedCategoriesByUserOrder = sortCategories(categoryExpenses, userData?.categoryOrder);

  if (isLoading) return <LoadingIndicator />;
  if (error) return <ErrorDisplay errorMessage={error.message} />;

  return (
    <>
      <header className="app-header-wrapper">
        <div>
          <h1>BudgetBrickan</h1>
          <h2>{greeting}</h2>
        </div>
        <div className="menu">
          <button onClick={() => handleOpenDialog('expense')}>
            <AddCircleOutlineOutlined size="large" />
          </button>
          <button onClick={() => handleOpenDialog('categoryOrder')}>
            <TocOutlined size="large" />
          </button>
          <button onClick={() => handleOpenDialog('settings')}>
            <AccountCircleOutlined size="large" />
          </button>
          <button onClick={onLogout}>
            <ExitToAppOutlined size="large" />
          </button>
        </div>
      </header>
      <Header expenses={expenses} totalIncome={userData.income || 0} salaryDay={userData?.salaryDay || null} />
      <main className="add-expense">
        <ExpansesList expenses={expenses} categoryOrder={userData?.categoryOrder} />
        <FormDialog title="Lägg till utgift" isOpen={openDialog === 'expense'} onClose={handleCloseDialog}>
          <ExpenseForm />
        </FormDialog>
        <FormDialog title="Hantera Kategoriordning" isOpen={openDialog === 'categoryOrder'} onClose={handleCloseDialog}>
          <CategoryOrderForm options={sortedCategoriesByUserOrder} onSave={handleSaveCategoryOrder} />
        </FormDialog>
        <FormDialog title="Användarinställningar" isOpen={openDialog === 'settings'} onClose={handleCloseDialog}>
          <SettingsForm userData={userData} onClose={handleCloseDialog} />
        </FormDialog>
      </main>
    </>
  );
};

export default Dashboard;
