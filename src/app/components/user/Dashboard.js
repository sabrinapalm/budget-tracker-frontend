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
import { APP_COLORS, APP_TITLE, CATEGORY_ORDER, DASHBOARD, EXPENSE, SAVINGS, SETTINGS } from '../../constants';

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

  const changeColor = (color) => {
    document.documentElement.style.setProperty('--primary-color', color);
  };

  if (isLoading) return <LoadingIndicator />;
  if (error) return <ErrorDisplay errorMessage={error.message} />;

  return (
    <>
      <div className="color-boxes">
        <div
          className="color-box"
          style={{ backgroundColor: APP_COLORS.GREEN }}
          onClick={() => changeColor(APP_COLORS.GREEN)}
        ></div>
        <div
          className="color-box"
          style={{ backgroundColor: APP_COLORS.PINK }}
          onClick={() => changeColor(APP_COLORS.PINK)}
        ></div>
        <div
          className="color-box"
          style={{ backgroundColor: APP_COLORS.YELLOW }}
          onClick={() => changeColor(APP_COLORS.YELLOW)}
        ></div>
        <div
          className="color-box"
          style={{ backgroundColor: APP_COLORS.ORANGE }}
          onClick={() => changeColor(APP_COLORS.ORANGE)}
        ></div>
        <div
          className="color-box"
          style={{ backgroundColor: APP_COLORS.BLUE }}
          onClick={() => changeColor(APP_COLORS.BLUE)}
        ></div>
      </div>
      <header className="app-header-wrapper">
        <div>
          <h1>{APP_TITLE}</h1>
          <h2>{greeting}</h2>
        </div>
        <div className="menu">
          <button onClick={() => handleOpenDialog(EXPENSE)}>
            <AddCircleOutlineOutlined size="large" />
          </button>
          <button onClick={() => handleOpenDialog(SAVINGS)}>
            <AccountBalanceOutlined size="large" />
          </button>
          <button onClick={() => handleOpenDialog(CATEGORY_ORDER)}>
            <TocOutlined size="large" />
          </button>
          <button onClick={() => handleOpenDialog(SETTINGS)}>
            <AccountCircleOutlined size="large" />
          </button>
          <button onClick={onLogout}>
            <ExitToAppOutlined size="large" />
          </button>
        </div>
      </header>

      <div className="tabs">
        <button className={activeTab === DASHBOARD ? 'active' : ''} onClick={() => setActiveTab(DASHBOARD)}>
          Månadsbudget
        </button>
        <button className={activeTab === SAVINGS ? 'active' : ''} onClick={() => setActiveTab(SAVINGS)}>
          Sparande
        </button>
      </div>
      <main className="add-expense">
        {activeTab === DASHBOARD && (
          <ExpansesList
            userData={userData}
            expenses={expenses}
            groupedExpenses={groupedExpenses}
            categoryOrder={userData?.categoryOrder}
          />
        )}
        {activeTab === SAVINGS && <SavingsList groupedExpenses={groupedExpenses} savingsDate={userData?.salaryDay} />}

        <FormDialog
          title="Lägg till utgift"
          formDescription="Här lägger du till dina utgifter du har per månad"
          isOpen={openDialog === EXPENSE}
          onClose={handleCloseDialog}
        >
          <ExpenseForm />
        </FormDialog>
        <FormDialog
          title="Hantera Kategoriordning"
          formDescription="Här hanterar du vilken order du vill att din budgetbricka ska visas"
          isOpen={openDialog === CATEGORY_ORDER}
          onClose={handleCloseDialog}
        >
          <CategoryOrderForm options={sortedCategoriesByUserOrder} onSave={handleSaveCategoryOrder} />
        </FormDialog>
        <FormDialog title="Användarinställningar" isOpen={openDialog === SETTINGS} onClose={handleCloseDialog}>
          <SettingsForm userData={userData} onClose={handleCloseDialog} />
        </FormDialog>
        <FormDialog
          title="Lägg ditt sparade belopp"
          formDescription="Registrera hur mycket du redan har sparat  i respektive kategori"
          isOpen={openDialog === SAVINGS}
          onClose={handleCloseDialog}
        >
          <SavingsForm />
        </FormDialog>
      </main>
    </>
  );
};

export default Dashboard;
