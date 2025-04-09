import React, { useState } from 'react';
import DetailView from './views/DetailView';
import TableView from './views/TableView';
import ChartDataTable from './components/ChartDataTable';
import useTableState from './hooks/useTableState';
import { mainCategories } from './data/mockData';
import { activityData } from './data/mockData';

export var App = () => {
  const tableState = useTableState();
  const [updatedActivityData, setUpdatedActivityData] = useState({...activityData});
  
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
        toast.innerText = `Data for "${activityKey}" has been updated!`;
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
  
  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-gray-50 rounded-lg shadow-lg">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-center mb-2 text-blue-600">Tulsa City Data Dashboard</h1>
        <p className="text-gray-600 text-center">Tracking metrics and organizations working to improve Tulsa</p>
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