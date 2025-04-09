import React from 'react';

const NumberBar = ({ metrics }) => {
  if (!metrics) return null;
  
  return (
    <div className="w-full bg-white rounded-lg shadow-md border border-gray-100 p-4 mb-6 max-w-3xl">
      <div className="flex flex-col sm:flex-row justify-between items-center relative">
        {Object.entries(metrics).map(([key, value], index, array) => {
          const isActivityChange = key === 'Activity Change';
          const isPositive = isActivityChange && value.startsWith('+');
          const isNegative = isActivityChange && value.startsWith('-');
          
          const valueColor = isPositive ? 'text-green-600' : 
                           isNegative ? 'text-red-600' : 
                           'text-gray-800';
          
          return (
            <div key={key} className="flex-1 flex flex-col items-center relative w-full py-2 sm:py-0">
              <div className="text-sm text-gray-500 mb-1">{key}</div>
              <div className={`text-2xl font-semibold ${valueColor}`}>
                {value}
              </div>
              {index < array.length - 1 && (
                <>
                  {/* Horizontal divider for mobile */}
                  <div 
                    className="sm:hidden w-1/2 h-px bg-gray-200 my-2"
                  />
                  {/* Vertical divider for desktop */}
                  <div 
                    className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 h-12 w-px bg-gray-200"
                    style={{ transform: 'translateY(-50%)' }}
                  />
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NumberBar; 