import React from 'react';
import { formatPercentageValue } from '../utils/formatters';
import { getBgClass, getRowHeaderBgClass, getAbbreviatedMetricName } from '../utils/styleUtils';
import { getCellContent, getCellData, getPrimaryMetric } from '../data/dataUtils';
import { hierarchyData, organizationData } from '../data/mockData';

const TableView = ({
  expandedColumn,
  expandedFamily,
  expandedSpecies,
  deepestLevelView,
  hoveredColumnGroup,
  toggleFamilyExpansion,
  toggleSpeciesExpansion,
  toggleColumnExpansion,
  handleCellClick,
  handleItemNameClick,
  setHoveredColumnGroup,
  mainCategories
}) => {
  const renderColumnHeaders = () => {
    if (deepestLevelView) {
      const orgColumns = ['Operating Costs', 'Org Size', 'Activity Change'];
      
      return orgColumns.map((columnName) => (
        <th 
          key={columnName}
          className="border border-gray-300 p-3 bg-gray-100 h-14 relative"
          style={{ position: 'relative', zIndex: 20 }}
        >
          <div className="flex items-center justify-center h-full">
            {columnName}
          </div>
        </th>
      ));
    }
    
    return Object.entries(mainCategories).map(([categoryKey, categoryData]) => {
      const isExpanded = expandedColumn === categoryKey;
      
      if (isExpanded) {
        return categoryData.subcategories.map((subcategory, index) => (
          <th 
            key={`${categoryKey}-${subcategory}`} 
            className="border border-gray-300 p-3 bg-gray-300 relative h-14 cursor-pointer"
            style={{ position: 'relative', zIndex: 20 }}
            onMouseEnter={() => setHoveredColumnGroup(categoryKey)}
            onMouseLeave={() => setHoveredColumnGroup(null)}
            onClick={(e) => toggleColumnExpansion(null, e)}
          >
            {index === 0 && (
              <div className="absolute top-1 left-3 text-xs text-gray-600">{categoryData.title}</div>
            )}
            <div className="flex items-center justify-center h-full">
              <span>{subcategory}</span>
            </div>
            {index === categoryData.subcategories.length - 1 && hoveredColumnGroup === categoryKey && (
              <button 
                className="absolute top-1 right-1 w-5 h-5 rounded-full bg-gray-400 text-gray-700 flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleColumnExpansion(null, e);
                }}
                aria-label={`Close expanded ${categoryData.title} columns`}
                title="Collapse columns"
              >
                ×
              </button>
            )}
          </th>
        ));
      }
      
      const primarySubcategory = categoryData.subcategories[0];
      return (
        <th 
          key={categoryKey}
          className="border border-gray-300 p-3 bg-gray-100 cursor-pointer hover:bg-gray-200 h-14 relative"
          style={{ position: 'relative', zIndex: 20 }}
          onClick={(e) => toggleColumnExpansion(categoryKey, e)}
        >
          <div className="flex items-center justify-center h-full">
            {categoryData.title} <span className="font-normal text-gray-600">({primarySubcategory})</span>
            <span className="ml-1 text-xs text-gray-500">▼</span>
          </div>
        </th>
      );
    });
  };

  const renderOrganizationCells = (itemName) => {
    if (!itemName || !organizationData[itemName]) return null;
    
    const orgData = organizationData[itemName];
    
    return ['Operating Costs', 'Org Size', 'Activity Change'].map(columnName => (
      <td 
        key={`${itemName}-${columnName}`} 
        className="border border-gray-300 p-3 text-center bg-blue-200"
      >
        {columnName === 'Activity Change' 
          ? formatPercentageValue(orgData[columnName]) 
          : orgData[columnName]}
      </td>
    ));
  };

  const renderRowCells = (level, familyKey, speciesKey = null, itemName = null) => {
    if (level === 'item' && deepestLevelView) {
      return renderOrganizationCells(itemName);
    }
    
    if (deepestLevelView && level !== 'item') {
      return ['Operating Costs', 'Org Size', 'Activity Change'].map(columnName => (
        <td 
          key={`${level}-${familyKey}-${speciesKey}-${columnName}`} 
          className={`border border-gray-300 p-3 text-center ${getBgClass(level, false, false)}`}
        >
          —
        </td>
      ));
    }
    
    return Object.entries(mainCategories).map(([categoryKey, categoryData]) => {
      const isExpanded = expandedColumn === categoryKey;
      
      if (isExpanded) {
        return categoryData.subcategories.map(subcategory => {
          const bgClass = getBgClass(level, true, true);
          const cellData = getCellData(level, familyKey, speciesKey, itemName, categoryKey, subcategory);
          return (
            <td 
              key={`${level}-${familyKey}-${speciesKey}-${itemName}-${categoryKey}-${subcategory}`} 
              className={`border border-gray-300 p-3 text-center ${bgClass} cursor-pointer`}
              onClick={(e) => handleCellClick(level, familyKey, speciesKey, itemName, categoryKey, e)}
            >
              {formatPercentageValue(cellData)}
            </td>
          );
        });
      }
      
      const bgClass = getBgClass(level, false, false);
      const cellContent = getCellContent(level, familyKey, speciesKey, itemName, categoryKey);
      return (
        <td 
          key={`${level}-${familyKey}-${speciesKey}-${itemName}-${categoryKey}`}
          className={`border border-gray-300 p-3 cursor-pointer ${bgClass}`}
          onClick={(e) => handleCellClick(level, familyKey, speciesKey, itemName, categoryKey, e)}
        >
          {formatPercentageValue(cellContent)}
        </td>
      );
    });
  };

  return (
    <>
      <table className="w-full border-collapse border border-gray-300">
        <thead style={{ position: 'relative', zIndex: 30 }}>
          <tr>
            <th className="border border-gray-300 p-3 bg-gray-100 h-14 w-32 relative" style={{ zIndex: 30 }}></th>
            {renderColumnHeaders()}
          </tr>
        </thead>

        <tbody>
          {Object.entries(hierarchyData).map(([familyKey, familyData]) => (
            <React.Fragment key={familyKey}>
              <tr>
                <td 
                  className={`border border-gray-300 p-3 font-bold capitalize cursor-pointer w-32
                    ${getRowHeaderBgClass('family', expandedFamily === familyKey)}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFamilyExpansion(familyKey);
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span>
                      {familyData.title}
                      {' '}
                      <span className="font-normal text-gray-600">
                        ({expandedFamily === familyKey 
                          ? getAbbreviatedMetricName(getPrimaryMetric(familyKey, hierarchyData)) 
                          : getPrimaryMetric(familyKey, hierarchyData)})
                      </span>
                    </span>
                    <span className="text-xs text-gray-500">
                      {expandedFamily === familyKey ? '▼' : '▶'}
                    </span>
                  </div>
                </td>
                
                {renderRowCells('family', familyKey)}
              </tr>
              
              {expandedFamily === familyKey && Object.entries(familyData.species).map(([speciesKey, speciesData]) => (
                <React.Fragment key={speciesKey}>
                  <tr>
                    <td 
                      className={`border border-gray-300 p-3 pl-6 font-medium capitalize cursor-pointer w-32
                        ${getRowHeaderBgClass('species', expandedSpecies === speciesKey)}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSpeciesExpansion(speciesKey);
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <span>{speciesData.title}</span>
                        <span className="text-xs text-gray-500">
                          {expandedSpecies === speciesKey ? '▼' : '▶'}
                        </span>
                      </div>
                    </td>
                    
                    {renderRowCells('species', familyKey, speciesKey)}
                  </tr>
                  
                  {expandedSpecies === speciesKey && speciesData.items.map(itemName => (
                    <tr key={`${familyKey}-${speciesKey}-${itemName}`}>
                      <td 
                        className="border border-gray-300 p-3 pl-10 font-normal bg-gray-200 w-32 text-gray-700 cursor-pointer hover:bg-gray-300"
                        onClick={(e) => handleItemNameClick(familyKey, speciesKey, itemName, e)}
                      >
                        <div className="flex items-center">
                          <span>{itemName}</span>
                        </div>
                      </td>
                      
                      {renderRowCells('item', familyKey, speciesKey, itemName)}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-sm text-gray-500">
        <p>Click on any data cell to expand its row and column.</p>
        <p>Click on an organization name to view detailed information about their activities.</p>
        <p>Your view preferences are saved automatically between visits.</p>
      </div>
    </>
  );
};

export default TableView; 