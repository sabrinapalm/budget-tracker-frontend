import React from 'react';
import { formatNumber } from '../utils/financialUtils';

const DashboardItem = ({ title, amount }) => (
  <div className="total">
    <h3>{title}</h3>
    <h2>{formatNumber(amount)} SEK</h2>
  </div>
);

export default DashboardItem;
