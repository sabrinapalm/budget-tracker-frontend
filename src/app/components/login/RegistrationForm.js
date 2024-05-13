import React, { useState } from 'react';
import { useRegisterUserMutation } from '../../api/authApi';
import { passwordCriteria } from '../../utils/generalUtils';

const RegistrationForm = ({ onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordValidation, setPasswordValidation] = useState(passwordCriteria.map(() => false));
  const [registerUser, { isLoading, error }] = useRegisterUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    try {
      const response = await registerUser(formData);
      if (response.error) {
        if (response.error.data && response.error.data.error.includes('E11000')) {
          setPasswordError('A user with this email already exists.');
        } else {
          setPasswordError(response.error.data.error);
        }
      } else {
        setPasswordError('');
        onRegisterSuccess();
      }
    } catch (error) {
      console.error('Registration failed:', error.message);
      if (error.message.includes('E11000')) {
        setPasswordError('A user with this email already exists.');
      } else {
        setPasswordError('An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

    if (name === 'password') {
      const validationResults = passwordCriteria.map((criterion) => criterion.test(value));
      setPasswordValidation(validationResults);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label htmlFor="firstName">Förnamn</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Efternamn</label>
          <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="password">Nytt lösenord</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Upprepa lösenord</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
        </div>
        {passwordError && <div className="description-text">{passwordError}</div>}

        {passwordCriteria.map((criterion, index) => (
          <div key={index} className={passwordValidation[index] ? 'success' : 'error'}>
            {passwordValidation[index] ? '\u2713' : ''} {criterion.message}
          </div>
        ))}

        <button type="submit" disabled={isLoading}>
          Skapa konto
        </button>
        {error && <div>{error.message}</div>}
      </form>
    </div>
  );
};

export default RegistrationForm;
