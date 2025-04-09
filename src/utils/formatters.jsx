import React from 'react';

export const formatPercentageValue = (value) => {
  if (!value || typeof value !== 'string') return value;
  
  const sign = value.charAt(0);
  const rest = value.slice(1);
  
  if (sign === '+') {
    return (
      <span>
        <span className="text-green-600">{sign}</span>
        {' '}
        {rest}
      </span>
    );
  } else if (sign === '-') {
    return (
      <span>
        <span className="text-red-600">{sign}</span>
        {' '}
        {rest}
      </span>
    );
  }
  
  return value;
}; 