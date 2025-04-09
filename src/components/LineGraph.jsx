import React from 'react';

const LineGraph = ({ data, title, height = 50, width = 150 }) => {
  if (!data || data.length === 0) return null;
  
  const values = data.map(point => point.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  
  const graphPadding = { top: 15, right: 12, bottom: 25, left: 25 };
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
  
  return (
    <div className="mt-3 mb-4">
      <div className="text-xs text-gray-500 mb-2 text-center">{title}</div>
      <svg width={width} height={height} className="bg-white rounded-md">
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
          strokeWidth="2.5"
          points={points}
        />
        
        {data.map((point, index) => (
          <circle
            key={`point-${index}`}
            cx={graphPadding.left + (index / (data.length - 1)) * graphWidth}
            cy={getY(point.value)}
            r="3"
            fill="#3B82F6"
            stroke="#fff"
            strokeWidth="1"
          />
        ))}
        
        {data.map((point, index) => {
          const shouldShowLabel = data.length <= 4 || 
                              index === 0 || 
                              index === data.length - 1 || 
                              index === Math.floor(data.length / 2);
          
          if (shouldShowLabel) {
            return (
              <text
                key={`label-${index}`}
                x={graphPadding.left + (index / (data.length - 1)) * graphWidth}
                y={height - graphPadding.bottom + 15}
                fontSize="9"
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
          fontSize="9"
          fill="#6b7280"
          textAnchor="end"
        >
          {max}
        </text>
        
        <text
          x={graphPadding.left - 5}
          y={getY(min) + 4}
          fontSize="9"
          fill="#6b7280"
          textAnchor="end"
        >
          {min}
        </text>
      </svg>
    </div>
  );
};

export default LineGraph; 