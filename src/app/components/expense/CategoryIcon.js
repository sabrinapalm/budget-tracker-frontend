import React from 'react';
import { categoryIcons } from '../../constants';

const CategoryIcon = ({ category, iconProps }) => {
  const IconComponent = categoryIcons[category];
  return <IconComponent {...iconProps} />;
};

export default CategoryIcon;
