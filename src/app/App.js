import React, { useEffect, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from './redux/selectors';
import { useGetUserDataQuery } from './api/authApi';
import { setUserSession } from './redux/authSlice';
import RegistrationForm from './components/login/RegistrationForm';
import LoginForm from './components/login/LoginForm';
import Dashboard from './components/user/Dashboard';
import LoadingIndicator from './components/general/LoadingIndicator';
import FormDialog from './components/general/FormDialog';
import { useAuth } from './hooks/useAuth';

const App = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const dispatch = useDispatch();
  const { isLoggedIn, loginError } = useSelector(selectAuth);
  const { handleLogin, handleLogout, isLoginLoading, isLogoutLoading } = useAuth();
  const token = localStorage.getItem('token');

  const { data: userData, isLoading: userIsLoading } = useGetUserDataQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (token && userData?._id) {
      dispatch(setUserSession({ userId: userData._id }));
    }
  }, [dispatch, userData, token]);

  if (userIsLoading || isLoginLoading || isLogoutLoading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="App">
      {isLoggedIn ? (
        <Dashboard onLogout={handleLogout} userData={userData} />
      ) : (
        <div className="startpage-form">
          <div>
            <h1>BudgetBrickan</h1>
            <p>Effektivisera din budget och se alla dina finansiella utgifter på ett bekvämt ställe.</p>
          </div>
          <LoginForm
            onLogin={handleLogin}
            onShowRegistrationForm={() => setShowRegistrationForm(true)}
            error={loginError}
          />
          {showRegistrationForm && (
            <FormDialog
              title="Skapa ett konto"
              isOpen={showRegistrationForm}
              onClose={() => setShowRegistrationForm(false)}
            >
              <RegistrationForm onRegisterSuccess={() => setShowRegistrationForm(false)} />
            </FormDialog>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
