import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from './app/context/ThemeContext';
import expenseApi from './app/api/expenseApi';
import authApi from './app/api/authApi';
import authReducer from './app/redux/authSlice';
import App from './app/App';
import './index.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const store = configureStore({
  reducer: {
    [expenseApi.reducerPath]: expenseApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(expenseApi.middleware, authApi.middleware),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
