import React from 'react';
import DetailView from './views/DetailView';
import TableView from './views/TableView';
import useTableState from './hooks/useTableState';
import { mainCategories } from './data/mockData';

export var App = () => {
  const tableState = useTableState();
  
  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-gray-50 rounded-lg shadow-lg">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-center mb-2 text-blue-600">Tulsa City Data Dashboard</h1>
        <p className="text-gray-600 text-center">Tracking metrics and organizations working to improve Tulsa</p>
      </div>
      
      {tableState.detailViewActive ? (
        <DetailView {...tableState} mainCategories={mainCategories} />
      ) : (
        <TableView {...tableState} mainCategories={mainCategories} />
      )}
    </div>
  );
};