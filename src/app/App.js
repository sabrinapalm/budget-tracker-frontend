import React, { useEffect, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from './redux/selectors';
import authApi, { useLoginUserMutation, useLogoutUserMutation, useGetUserDataQuery } from './api/authApi';
import expenseApi from './api/expenseApi';
import { setLoginError, clearAuthState, loginSuccess, setUserSession } from './redux/authSlice';
import RegistrationForm from './components/login/RegistrationForm';
import LoginForm from './components/login/LoginForm';
import Dashboard from './components/user/Dashboard';
import LoadingIndicator from './components/general/LoadingIndicator';
import FormDialog from './components/general/FormDialog';

const App = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const dispatch = useDispatch();
  const { loginError, isLoggedIn } = useSelector(selectAuth);
  const [loginUser, { isLoading: isLoginLoading }] = useLoginUserMutation();
  const [logoutUser, { isLoading: isLogoutLoading }] = useLogoutUserMutation();
  const token = localStorage.getItem('token');

  const { data: userData, isLoading: userIsLoading } = useGetUserDataQuery(undefined, {
    skip: !token,
  });

  const handleLogin = async ({ email, password }) => {
    try {
      const response = await loginUser({ email, password });
      if (response.error) {
        dispatch(setLoginError(response.error.data.error));
        console.error('Login failed:', response.error.data.error);
        return;
      }
      const { token, user } = response.data;
      if (token && user?._id) {
        localStorage.setItem('token', token);
        dispatch(loginSuccess({ userId: user._id }));
      } else {
        throw new Error('User data incomplete');
      }
    } catch (error) {
      console.error('Login failed:', error);
      dispatch(setLoginError('Failed to log in. Please try again.'));
    }
  };

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response.error) {
        console.log('Failed to logout');
      } else {
        localStorage.removeItem('token');
        dispatch(clearAuthState());
        dispatch(expenseApi.util.resetApiState());
        dispatch(authApi.util.resetApiState());
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

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
