import React, { useRef, useEffect, useState } from 'react';

const ChartDataTable = ({ chartData, title, isVisible, onClose, onSaveData }) => {
  if (!chartData) return null;
  
  const [chartWidth, setChartWidth] = useState(600);
  const chartContainerRef = useRef(null);
  const height = 220;
  
  // State for editable data
  const [editableData, setEditableData] = useState([]);
  const [modifiedIndices, setModifiedIndices] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);
  
  // Initialize editable data when chart data changes
  useEffect(() => {
    if (chartData) {
      setEditableData([...chartData]);
      setModifiedIndices([]);
      setHasChanges(false);
    }
  }, [chartData]);
  
  useEffect(() => {
    if (chartContainerRef.current) {
      const updateWidth = () => {
        const containerWidth = chartContainerRef.current.clientWidth;
        setChartWidth(containerWidth);
      };
      
      updateWidth();
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
    }
  }, [isVisible]);
  
  const handleValueChange = (index, newValue) => {
    const numValue = parseFloat(newValue);
    
    if (!isNaN(numValue)) {
      const updatedData = [...editableData];
      updatedData[index] = {
        ...updatedData[index],
        value: numValue
      };
      
      setEditableData(updatedData);
      
      if (!modifiedIndices.includes(index)) {
        setModifiedIndices([...modifiedIndices, index]);
      }
      
      setHasChanges(true);
    }
  };
  
  const handleSaveChanges = () => {
    // Call the provided callback with the updated data
    if (onSaveData && typeof onSaveData === 'function') {
      onSaveData(editableData, title);
    }
    
    // Reset modification tracking
    setModifiedIndices([]);
    setHasChanges(false);
    
    // Close the panel after saving
    onClose();
  };
  
  const handleOutsideClick = (e) => {
    // Close the panel if clicking on the dark overlay
    if (e.target.classList.contains('overlay-background')) {
      onClose();
    }
  };
  
  const values = editableData.map(point => point.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  
  // Chart preview parameters
  const padding = { top: 20, right: 30, bottom: 40, left: 50 };
  const graphHeight = height - padding.top - padding.bottom;
  const graphWidth = chartWidth - padding.left - padding.right;
  
  const getY = (value) => {
    return padding.top + graphHeight - ((value - min) / range * graphHeight);
  };
  
  const points = editableData.map((point, index) => {
    const x = padding.left + (index / (editableData.length - 1)) * graphWidth;
    const y = getY(point.value);
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <>
      {/* Dark overlay */}
      {isVisible && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 overlay-background" 
          style={{ zIndex: 35 }}
          onClick={handleOutsideClick}
        ></div>
      )}
      
      {/* Panel */}
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-white border-t-2 border-blue-500 shadow-lg transition-transform duration-300 transform ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ zIndex: 40, maxHeight: '80vh', overflowY: 'auto' }}
      >
        <div className="max-w-4xl mx-auto p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-blue-700">{title}</h3>
            <button 
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center"
              aria-label="Close data table"
            >
              ×
            </button>
          </div>
          
          {/* Chart Preview */}
          <div className="mb-6 w-full" ref={chartContainerRef}>
            <svg width={chartWidth} height={height} className="bg-white rounded-md shadow border border-gray-100">
              <line
                x1={padding.left - 5}
                y1={height - padding.bottom}
                x2={chartWidth - padding.right + 2}
                y2={height - padding.bottom}
                stroke="#d1d5db"
                strokeWidth="1"
              />
              
              <line
                x1={padding.left - 2}
                y1={getY(max)}
                x2={chartWidth - padding.right}
                y2={getY(max)}
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
              
              <line
                x1={padding.left - 2}
                y1={getY(min)}
                x2={chartWidth - padding.right}
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
              
              {editableData.map((point, index) => (
                <circle
                  key={`point-${index}`}
                  cx={padding.left + (index / (editableData.length - 1)) * graphWidth}
                  cy={getY(point.value)}
                  r="4"
                  fill={modifiedIndices.includes(index) ? "#F97316" : "#3B82F6"}
                  stroke="#fff"
                  strokeWidth="1.5"
                />
              ))}
              
              {editableData.map((point, index) => {
                const shouldShowLabel = true;
                
                if (shouldShowLabel) {
                  return (
                    <text
                      key={`label-${index}`}
                      x={padding.left + (index / (editableData.length - 1)) * graphWidth}
                      y={height - padding.bottom + 20}
                      fontSize="11"
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
                x={padding.left - 10}
                y={getY(max) + 4}
                fontSize="11"
                fill="#6b7280"
                textAnchor="end"
              >
                {max}
              </text>
              
              <text
                x={padding.left - 10}
                y={getY(min) + 4}
                fontSize="11"
                fill="#6b7280"
                textAnchor="end"
              >
                {min}
              </text>
              
              {/* Add Y-axis label */}
              <text
                transform={`rotate(-90, ${padding.left - 35}, ${height/2})`}
                x={padding.left - 35}
                y={height/2}
                fontSize="12"
                fill="#6b7280"
                textAnchor="middle"
              >
                Value
              </text>
              
              {/* Add horizontal grid lines for better readability */}
              {[0.25, 0.5, 0.75].map((ratio, idx) => {
                const value = min + range * ratio;
                return (
                  <g key={`grid-${idx}`}>
                    <line
                      x1={padding.left - 2}
                      y1={getY(value)}
                      x2={chartWidth - padding.right}
                      y2={getY(value)}
                      stroke="#e5e7eb"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                    />
                    <text
                      x={padding.left - 10}
                      y={getY(value) + 4}
                      fontSize="11"
                      fill="#6b7280"
                      textAnchor="end"
                    >
                      {Math.round(value)}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b text-left">Period</th>
                  <th className="py-2 px-4 border-b text-right">Value</th>
                </tr>
              </thead>
              <tbody>
                {editableData.map((dataPoint, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-2 px-4 border-b">{dataPoint.period}</td>
                    <td className="py-2 px-4 border-b text-right">
                      <input
                        type="number"
                        value={dataPoint.value}
                        onChange={(e) => handleValueChange(index, e.target.value)}
                        className={`w-20 text-right font-medium p-1 border rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                          modifiedIndices.includes(index) ? 'border-orange-500 text-orange-600' : 'border-gray-200'
                        }`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-gray-500">Click on values to edit. Modified points appear in orange.</p>
            {hasChanges && (
              <button 
                onClick={handleSaveChanges}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium"
              >
                Save Data
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartDataTable; 