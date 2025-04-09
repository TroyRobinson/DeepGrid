import React from 'react';
import LineGraph from '../components/LineGraph';
import NumberBar from '../components/NumberBar';
import { getItemAttributes, getPrimaryMetric } from '../data/dataUtils';
import { getRowHeaderBgClass } from '../utils/styleUtils';
import { getAbbreviatedMetricName } from '../utils/styleUtils';
import { hierarchyData, organizationData, activityData } from '../data/mockData';

const DetailView = ({
  selectedItem,
  expandedFamily,
  expandedSpecies,
  handleFamilyClickInDetailView,
  handleSpeciesClickInDetailView,
  handleItemSelectInDetailView,
  closeDetailView,
  expandedColumn,
  mainCategories
}) => {
  const columnCount = expandedColumn 
    ? mainCategories[expandedColumn].subcategories.length 
    : Object.keys(mainCategories).length;
  
  const attributes = getItemAttributes(selectedItem);
  const orgMetrics = selectedItem ? organizationData[selectedItem] : null;
  
  return (
    <>
      <table className="w-full border-collapse border border-gray-300">
        <thead style={{ position: 'relative', zIndex: 30 }}>
          <tr>
            <th className="border border-gray-300 p-3 bg-gray-100 h-14 w-32 relative" style={{ zIndex: 30 }}></th>
            <th colSpan={columnCount} className="border border-gray-300 bg-blue-100 h-14 p-0 relative">
              <div className="relative h-full">
                <button 
                  className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm"
                  onClick={closeDetailView}
                >
                  Back to Table
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-full">
            <td className="w-32 p-0 border-0 align-top">
              <div className="w-full">
                {Object.entries(hierarchyData).map(([familyKey, familyData]) => {
                  const isFamilyExpanded = expandedFamily === familyKey;
                  
                  return (
                    <div key={familyKey} className="w-full">
                      <div 
                        className={`border border-gray-300 p-3 font-bold capitalize w-full cursor-pointer hover:bg-gray-200
                          ${getRowHeaderBgClass('family', isFamilyExpanded)}`}
                        onClick={() => handleFamilyClickInDetailView(familyKey)}
                      >
                        <div className="flex justify-between items-center">
                          <span>
                            {familyData.title}
                            {' '}
                            <span className="font-normal text-gray-600">
                              ({isFamilyExpanded 
                                ? getAbbreviatedMetricName(getPrimaryMetric(familyKey, hierarchyData)) 
                                : getPrimaryMetric(familyKey, hierarchyData)})
                            </span>
                          </span>
                          <span className="text-xs text-gray-500">
                            {isFamilyExpanded ? '▼' : '▶'}
                          </span>
                        </div>
                      </div>
                      
                      {isFamilyExpanded && Object.entries(familyData.species).map(([speciesKey, speciesData]) => {
                        const isSpeciesExpanded = expandedSpecies === speciesKey;
                        
                        return (
                          <div key={speciesKey} className="w-full">
                            <div 
                              className={`border border-gray-300 p-3 pl-6 font-medium capitalize w-full cursor-pointer hover:bg-gray-200
                                ${getRowHeaderBgClass('species', isSpeciesExpanded)}`}
                              onClick={() => handleSpeciesClickInDetailView(familyKey, speciesKey)}
                            >
                              <div className="flex justify-between items-center">
                                <span>{speciesData.title}</span>
                                <span className="text-xs text-gray-500">
                                  {isSpeciesExpanded ? '▼' : '▶'}
                                </span>
                              </div>
                            </div>
                            
                            {isSpeciesExpanded && speciesData.items.map(itemName => (
                              <div 
                                key={`${familyKey}-${speciesKey}-${itemName}`}
                                className={`border border-gray-300 p-3 pl-10 font-normal w-full text-gray-700 cursor-pointer hover:bg-gray-300
                                  ${selectedItem === itemName ? 'bg-gray-300 font-medium' : 'bg-gray-200'}`}
                                onClick={() => handleItemSelectInDetailView(itemName)}
                              >
                                <div className="flex items-center">
                                  <span>{itemName}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </td>
            <td 
              colSpan={columnCount} 
              className="border border-gray-300 bg-blue-50 p-0 h-full relative"
              style={{ height: '100%', minHeight: '600px' }}
            >
              <div className="flex flex-col items-center justify-start w-full h-full absolute inset-0 p-8 overflow-y-auto">
                <h2 className="text-4xl font-bold text-blue-800 mb-4">{selectedItem}</h2>
                
                {orgMetrics && <NumberBar metrics={orgMetrics} />}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
                  {attributes.map((attr, index) => (
                    <div 
                      key={index} 
                      className="bg-white shadow-lg rounded-lg px-7 py-5 flex flex-col items-center border border-gray-100"
                    >
                      <div className="text-blue-700 font-medium text-xl mb-3">{attr}</div>
                      {activityData[attr] && (
                        <LineGraph 
                          data={activityData[attr].data} 
                          title={activityData[attr].title} 
                          width={280}
                          height={150}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4 text-sm text-gray-500">
        <p>Click a different organization to view its activities.</p>
        <p>Click a category name to return to table view with that category expanded.</p>
        <p>Click "Back to Table" to return to the full table view.</p>
      </div>
    </>
  );
};

export default DetailView; 