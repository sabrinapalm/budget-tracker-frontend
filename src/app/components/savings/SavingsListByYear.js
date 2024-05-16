import React from 'react';
import { formatNumber } from '../../utils/financialUtils';

const SavingsListByYear = ({ groupedByYear }) => (
  <>
    {Object.entries(groupedByYear).map(([year, entries]) => (
      <div key={year}>
        <ul>
          <h3>{year}</h3>
          {entries.map((entry, index) => (
            <li key={index}>
              <p className="expense-title">
                {new Date(entry.year, entry.month).toLocaleString('sv-SE', { month: 'long', year: 'numeric' })}
              </p>
              <p className="expense-amount">{formatNumber(entry.amount)} SEK</p>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </>
);

export default SavingsListByYear;
