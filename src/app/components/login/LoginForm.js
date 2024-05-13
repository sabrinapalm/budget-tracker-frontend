import React, { useState } from 'react';

const LoginForm = ({ onLogin, onShowRegistrationForm, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin({ email, password });
  };

  const handleShowRegistrationForm = () => {
    onShowRegistrationForm();
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Logga in</h2>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="username"
        />
      </div>
      <div>
        <label htmlFor="password">Lösenord</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
      </div>
      {error && <p className="description-text">{error}</p>}
      <div className="button-wrapper">
        <button type="submit">Logga in</button>
        <button className="registration-button" type="button" onClick={handleShowRegistrationForm}>
          Skapa ett konto
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
