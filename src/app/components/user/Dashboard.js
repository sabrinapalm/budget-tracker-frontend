import React, { useState, useMemo } from 'react';
import {
  ExitToAppOutlined,
  AccountCircleOutlined,
  AddCircleOutlineOutlined,
  TocOutlined,
  AccountBalanceOutlined,
} from '@mui/icons-material';
import { useGetExpensesQuery } from '../../api/expenseApi';
import LoadingIndicator from '../general/LoadingIndicator';
import ErrorDisplay from '../general/ErrorDisplay';
import ExpansesList from '../expense/ExpansesList';
import FormDialog from '../general/FormDialog';
import ExpenseForm from '../forms/ExpenseForm';
import { getGreeting } from '../../utils/generalUtils';
import { groupExpensesByCategory, sortCategories } from '../../utils/financialUtils';
import SettingsForm from '../forms/SettingsForm';
import CategoryOrderForm from '../forms/CategoryOrderForm';
import SavingsList from '../savings/SavingsList';
import SavingsForm from '../forms/SavingsForm';
import { APP_TITLE } from '../../constants';

const Dashboard = ({ onLogout, userData }) => {
  const [openDialog, setOpenDialog] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const { data: expenses = [], error, isLoading } = useGetExpensesQuery(userData?._id);

  const greeting = getGreeting(userData?.firstName);

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

  const groupedExpenses = useMemo(() => groupExpensesByCategory(expenses), [expenses]);

  if (isLoading) return <LoadingIndicator />;
  if (error) return <ErrorDisplay errorMessage={error.message} />;

  return (
    <>
      <header className="app-header-wrapper">
        <div>
          <h1>{APP_TITLE}</h1>
          <h2>{greeting}</h2>
        </div>
        <div className="menu">
          <button onClick={() => handleOpenDialog('expense')}>
            <AddCircleOutlineOutlined size="large" />
          </button>
          <button onClick={() => handleOpenDialog('savings')}>
            <AccountBalanceOutlined size="large" />
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

      <div className="tabs">
        <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
          Månadsbudget
        </button>
        <button className={activeTab === 'savings' ? 'active' : ''} onClick={() => setActiveTab('savings')}>
          Sparande
        </button>
      </div>
      <main className="add-expense">
        {activeTab === 'dashboard' && (
          <ExpansesList
            userData={userData}
            expenses={expenses}
            groupedExpenses={groupedExpenses}
            categoryOrder={userData?.categoryOrder}
          />
        )}
        {activeTab === 'savings' && <SavingsList groupedExpenses={groupedExpenses} savingsDate={userData?.salaryDay} />}

        <FormDialog
          title="Lägg till utgift"
          formDescription="Här lägger du till dina utgifter du har per månad"
          isOpen={openDialog === 'expense'}
          onClose={handleCloseDialog}
        >
          <ExpenseForm />
        </FormDialog>
        <FormDialog
          title="Hantera Kategoriordning"
          formDescription="Här hanterar du vilken order du vill att din budgetbricka ska visas"
          isOpen={openDialog === 'categoryOrder'}
          onClose={handleCloseDialog}
        >
          <CategoryOrderForm options={sortedCategoriesByUserOrder} onSave={handleSaveCategoryOrder} />
        </FormDialog>
        <FormDialog title="Användarinställningar" isOpen={openDialog === 'settings'} onClose={handleCloseDialog}>
          <SettingsForm userData={userData} onClose={handleCloseDialog} />
        </FormDialog>
        <FormDialog
          title="Lägg ditt sparade belopp"
          formDescription="Registrera hur mycket du redan har sparat  i respektive kategori"
          isOpen={openDialog === 'savings'}
          onClose={handleCloseDialog}
        >
          <SavingsForm />
        </FormDialog>
      </main>
    </>
  );
};

export default Dashboard;
