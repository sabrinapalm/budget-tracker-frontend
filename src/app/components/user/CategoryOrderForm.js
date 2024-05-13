import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReactSortable } from 'react-sortablejs';
import { useUpdateUserSettingsMutation } from '../../api/authApi';
import { selectUserId } from '../../redux/selectors';
import { categoryTitles } from '../../constants';
import CategoryIcon from '../expense/CategoryIcon';

const CategoryOrderForm = ({ options, onSave }) => {
  const userId = useSelector(selectUserId);
  const [categoryOrder, setCategoryOrder] = useState(options);

  const [updateUserSettings, { isLoading: isUpdatingUser }] = useUpdateUserSettingsMutation();

  const handleSaveOrder = async () => {
    try {
      await updateUserSettings({ categoryOrder, userId });
      onSave();
    } catch (error) {
      console.error('Error saving category order:', error);
    }
  };

  useEffect(() => {
    setCategoryOrder(options);
  }, [options]);

  if (!options.length) {
    return <p>Du har ingen budget bricka.</p>;
  }

  return (
    <div className="categories">
      <ReactSortable className="form" list={categoryOrder} setList={setCategoryOrder}>
        {categoryOrder.map((category) => (
          <li className="sortable-item" key={category}>
            <CategoryIcon category={category} />
            {categoryTitles[category]}
          </li>
        ))}
      </ReactSortable>
      <button disabled={isUpdatingUser} onClick={handleSaveOrder}>
        {isUpdatingUser ? 'Sparar..' : 'Spara'}
      </button>
    </div>
  );
};

export default CategoryOrderForm;
