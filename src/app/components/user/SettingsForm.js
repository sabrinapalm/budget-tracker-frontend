import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useUpdateUserSettingsMutation } from '../../api/authApi';
import { selectUserId } from '../../redux/selectors';
import { useTheme } from '../../context/ThemeContext';
import { THEMES } from '../../constants';

const SettingsForm = ({ userData, onClose }) => {
  const userId = useSelector(selectUserId);
  const [income, setIncome] = useState(userData?.income || 0);
  const [firstName, setFirstName] = useState(userData?.firstName || '');
  const [lastName, setLastName] = useState(userData?.lastName || '');
  const [salaryDay, setSalaryDay] = useState(userData?.salaryDay || 25);
  const { theme, setTheme } = useTheme();
  const [updateUserSettings, { isLoading: isUpdatingUser }] = useUpdateUserSettingsMutation();

  const handleUpdateUserSettings = async (event) => {
    event.preventDefault();
    const updatedFields = {
      income: income ? Number(income) : undefined,
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      salaryDay: salaryDay || undefined,
    };

    if (Object.values(updatedFields).every((value) => value === undefined)) return;

    try {
      await updateUserSettings({ ...updatedFields, userId });
      setIncome('');
      setFirstName('');
      setLastName('');
      setSalaryDay('');
      onClose();
    } catch (error) {
      console.error('Error updating user settings:', error);
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK));
  };

  const isFormEmpty = !income && !firstName && !lastName && !salaryDay;

  return (
    <form className="form" onSubmit={handleUpdateUserSettings}>
      <div>
        <label htmlFor="firstName">Förnamn</label>
        <input id="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="lastName">Efternamn</label>
        <input id="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="amount">Månadslön (netto)</label>
        <p className="description-text">Efter skatt</p>
        <input id="amount" type="number" value={income} onChange={(e) => setIncome(e.target.value)} />
      </div>
      <div>
        <label htmlFor="salaryDay">Månadens lönedag</label>
        <p className="description-text">Vilken dag i månaden får du din lön?</p>
        <input
          id="salaryDay"
          type="number"
          placeholder="1-31"
          value={salaryDay}
          onChange={(e) => setSalaryDay(e.target.value)}
        />
      </div>
      <div className="switch-container">
        <span>{theme === THEMES.DARK ? 'Dark Mode' : 'Light Mode'}</span>
        <label className="switch">
          <input type="checkbox" checked={theme === THEMES.DARK} onChange={toggleTheme} />
          <span className="slider round"></span>
        </label>
      </div>

      <button type="submit" disabled={isUpdatingUser || isFormEmpty}>
        {isUpdatingUser ? 'Sparar...' : 'Spara'}
      </button>
    </form>
  );
};

export default SettingsForm;
