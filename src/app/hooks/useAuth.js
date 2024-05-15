import { useDispatch } from 'react-redux';
import { setLoginError, clearAuthState, loginSuccess } from '../redux/authSlice';
import authApi, { useLoginUserMutation, useLogoutUserMutation } from '../api/authApi';
import expenseApi from '../api/expenseApi';

export const useAuth = () => {
  const dispatch = useDispatch();
  const [loginUser, { isLoading: isLoginLoading }] = useLoginUserMutation();
  const [logoutUser, { isLoading: isLogoutLoading }] = useLogoutUserMutation();

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
      if (!response.error) {
        localStorage.removeItem('token');
        dispatch(clearAuthState());
        authApi.util.resetApiState();
        expenseApi.util.resetApiState();
      } else {
        console.log('Failed to logout:', response.error);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return {
    handleLogin,
    handleLogout,
    isLoginLoading,
    isLogoutLoading,
  };
};

export default useAuth;
