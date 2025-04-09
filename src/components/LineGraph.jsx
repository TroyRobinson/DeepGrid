import React, { useState } from 'react';

const LineGraph = ({ data, title, height = 50, width = 150, onChartClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  if (!data || data.length === 0) return null;
  
  const values = data.map(point => point.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  
  // Adjust padding for smaller screens
  const graphPadding = { top: 15, right: 8, bottom: 25, left: 22 };
  const graphHeight = height - graphPadding.top - graphPadding.bottom;
  const graphWidth = width - graphPadding.left - graphPadding.right;
  
  const getY = (value) => {
    return graphPadding.top + graphHeight - ((value - min) / range * graphHeight);
  };
  
  const points = data.map((point, index) => {
    const x = graphPadding.left + (index / (data.length - 1)) * graphWidth;
    const y = getY(point.value);
    return `${x},${y}`;
  }).join(' ');
  
  const handleClick = () => {
    if (onChartClick) {
      onChartClick(data, title);
    }
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  return (
    <div className="mt-2 mb-3">
      <div className="text-xs text-gray-500 mb-1 text-center">{title}</div>
      <div 
        className="relative w-full flex justify-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <svg 
          width={width} 
          height={height} 
          className="bg-white rounded-md cursor-pointer hover:shadow-md transition-shadow duration-200"
          onClick={handleClick}
        >
          <line
            x1={graphPadding.left - 5}
            y1={height - graphPadding.bottom}
            x2={width - graphPadding.right + 2}
            y2={height - graphPadding.bottom}
            stroke="#d1d5db"
            strokeWidth="1"
          />
          
          <line
            x1={graphPadding.left - 2}
            y1={getY(max)}
            x2={width - graphPadding.right}
            y2={getY(max)}
            stroke="#e5e7eb"
            strokeWidth="1"
            strokeDasharray="2,2"
          />
          
          <line
            x1={graphPadding.left - 2}
            y1={getY(min)}
            x2={width - graphPadding.right}
            y2={getY(min)}
            stroke="#e5e7eb"
            strokeWidth="1"
            strokeDasharray="2,2"
          />
          
          <polyline
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            points={points}
          />
          
          {data.map((point, index) => (
            <circle
              key={`point-${index}`}
              cx={graphPadding.left + (index / (data.length - 1)) * graphWidth}
              cy={getY(point.value)}
              r="2.5"
              fill="#3B82F6"
              stroke="#fff"
              strokeWidth="1"
            />
          ))}
          
          {data.map((point, index) => {
            const shouldShowLabel = data.length <= 3 || 
                              index === 0 || 
                              index === data.length - 1;
            
            if (shouldShowLabel) {
              return (
                <text
                  key={`label-${index}`}
                  x={graphPadding.left + (index / (data.length - 1)) * graphWidth}
                  y={height - graphPadding.bottom + 15}
                  fontSize="8"
                  fill="#6b7280"
                  textAnchor="middle"
                >
                  {point.period}
                </text>
              );
            }
            return null;
          })}
          
          <text
            x={graphPadding.left - 5}
            y={getY(max) + 4}
            fontSize="8"
            fill="#6b7280"
            textAnchor="end"
          >
            {max}
          </text>
          
          <text
            x={graphPadding.left - 5}
            y={getY(min) + 4}
            fontSize="8"
            fill="#6b7280"
            textAnchor="end"
          >
            {min}
          </text>
        </svg>
        
        {/* Edit Data label overlay */}
        {isHovered && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 rounded-md transition-opacity duration-200 cursor-pointer"
            onClick={handleClick}
          >
            <div className="bg-orange-500 text-white font-medium px-2 py-1 rounded flex items-center text-xs sm:text-sm">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-3 w-3 mr-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit Data
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LineGraph; 