import React, { useState, useEffect } from 'react';
import DetailView from './views/DetailView';
import TableView from './views/TableView';
import ChartDataTable from './components/ChartDataTable';
import useTableState from './hooks/useTableState';
import { mainCategories } from './data/mockData';
import { activityData } from './data/mockData';

export var App = () => {
  // Load saved activity data from localStorage if available, otherwise use default data
  const loadInitialActivityData = () => {
    try {
      const savedData = localStorage.getItem('chartActivityData');
      if (savedData) {
        return JSON.parse(savedData);
      }
    } catch (error) {
      console.error('Error loading saved chart data:', error);
    }
    return {...activityData};
  };
  
  const tableState = useTableState();
  const [updatedActivityData, setUpdatedActivityData] = useState(loadInitialActivityData);
  
  // Save activity data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('chartActivityData', JSON.stringify(updatedActivityData));
    } catch (error) {
      console.error('Error saving chart data:', error);
    }
  }, [updatedActivityData]);
  
  const handleSaveChartData = (updatedData, chartTitle) => {
    // Find which activity this chart belongs to
    const activityKey = Object.keys(updatedActivityData).find(key => 
      updatedActivityData[key].title === chartTitle);
    
    if (activityKey) {
      // Create a new object to ensure reactivity
      const newActivityData = {...updatedActivityData};
      newActivityData[activityKey] = {
        ...newActivityData[activityKey],
        data: updatedData
      };
      
      setUpdatedActivityData(newActivityData);
      
      // Show success message with a small delay so it appears after the panel closes
      setTimeout(() => {
        // Use a toast notification instead of an alert for better UX
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-4 right-4 bg-green-600 text-white p-3 rounded-lg shadow-lg transition-opacity';
        toast.innerHTML = `Data for <strong>${activityKey}</strong> has been updated and saved to browser!`;
        document.body.appendChild(toast);
        
        // Remove the toast after 3 seconds
        setTimeout(() => {
          toast.style.opacity = '0';
          setTimeout(() => {
            document.body.removeChild(toast);
          }, 300);
        }, 3000);
      }, 300);
    }
  };
  
  const resetAllData = () => {
    if (confirm('Reset all chart data to defaults? This cannot be undone.')) {
      setUpdatedActivityData({...activityData});
      localStorage.removeItem('chartActivityData');
      
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-lg shadow-lg transition-opacity';
      toast.innerText = 'All chart data has been reset to defaults';
      document.body.appendChild(toast);
      
      setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 300);
      }, 3000);
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-gray-50 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold mb-2 text-blue-600">Tulsa City Data Dashboard</h1>
          <p className="text-gray-600">Tracking metrics and organizations working to improve Tulsa</p>
        </div>
        <button 
          onClick={resetAllData}
          className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded"
          title="Reset all chart data to default values"
        >
          Reset Data
        </button>
      </div>
      
      {tableState.detailViewActive ? (
        <DetailView 
          {...tableState} 
          mainCategories={mainCategories} 
          activityData={updatedActivityData} 
        />
      ) : (
        <TableView {...tableState} mainCategories={mainCategories} />
      )}
      
      <ChartDataTable 
        chartData={tableState.selectedChartData}
        title={tableState.selectedChartTitle}
        isVisible={tableState.chartDataVisible}
        onClose={tableState.closeChartData}
        onSaveData={handleSaveChartData}
      />
    </div>
  );
};