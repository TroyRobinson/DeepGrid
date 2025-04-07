import React, { useState, useEffect } from 'react';
import { FlexCol } from './utils.jsx'

/**
 * EnhancedComparisonTable
 * 
 * Data-agnostic hierarchical comparison table with expandable rows/columns,
 * detail view, and localStorage persistence
 */
export var App = () => {
  // Core navigation state
  const [expandedColumn, setExpandedColumn] = useState(null);
  const [expandedFamily, setExpandedFamily] = useState(null);
  const [expandedSpecies, setExpandedSpecies] = useState(null);
  const [hoveredColumnGroup, setHoveredColumnGroup] = useState(null);
  const [lastClickedCell, setLastClickedCell] = useState(null);
  
  // Detail view state
  const [selectedItem, setSelectedItem] = useState(null);
  const [detailViewActive, setDetailViewActive] = useState(false);

  // Example configuration - in production this would be passed as props
  const mainCategories = {
    stats: {
      title: 'Stats',
      subcategories: ['Weight', 'Lifespan']
    },
    costs: { 
      title: 'Costs',
      subcategories: ['Food', 'Maintenance']
    }
  };

  const hierarchyData = {
    mammals: {
      title: 'Mammals',
      species: {
        dogs: {
          title: 'Dogs',
          items: ['Border Collie', 'Golden Retriever']
        },
        cats: {
          title: 'Cats',
          items: ['Siamese', 'Maine Coon']
        }
      }
    },
    reptiles: {
      title: 'Reptiles',
      species: {
        lizards: {
          title: 'Lizards',
          items: ['Bearded Dragon', 'Gecko']
        },
        snakes: {
          title: 'Snakes',
          items: ['Ball Python', 'Corn Snake']
        }
      }
    }
  };

  const itemData = {
    mammals: {
      _general: {
        stats: {
          Weight: 'Varies widely',
          Lifespan: '5-20 years'
        },
        costs: {
          Food: '$20-$100/month',
          Maintenance: '$100-$500/year'
        }
      },
      dogs: {
        _general: {
          stats: {
            Weight: '30-70 pounds',
            Lifespan: '10-13 years'
          },
          costs: {
            Food: '$30-$50/month',
            Maintenance: '$200-$500/year'
          }
        },
        'Border Collie': {
          stats: {
            Weight: '30-45 pounds',
            Lifespan: '12-15 years'
          },
          costs: {
            Food: '$30-$40/month',
            Maintenance: '$200-$400/year'
          },
          attributes: ['Intelligent', 'Energetic']
        },
        'Golden Retriever': {
          stats: {
            Weight: '55-75 pounds',
            Lifespan: '10-12 years'
          },
          costs: {
            Food: '$40-$60/month',
            Maintenance: '$250-$500/year'
          },
          attributes: ['Friendly', 'Loyal']
        }
      },
      cats: {
        _general: {
          stats: {
            Weight: '8-10 pounds',
            Lifespan: '12-18 years'
          },
          costs: {
            Food: '$20-$40/month',
            Maintenance: '$100-$300/year'
          }
        },
        'Siamese': {
          stats: {
            Weight: '8-12 pounds',
            Lifespan: '15-20 years'
          },
          costs: {
            Food: '$25-$35/month',
            Maintenance: '$100-$250/year'
          },
          attributes: ['Vocal', 'Social']
        },
        'Maine Coon': {
          stats: {
            Weight: '12-18 pounds',
            Lifespan: '12-15 years'
          },
          costs: {
            Food: '$30-$50/month',
            Maintenance: '$150-$350/year'
          },
          attributes: ['Large', 'Gentle']
        }
      }
    },
    reptiles: {
      _general: {
        stats: {
          Weight: '0.5-10 pounds',
          Lifespan: '10-50 years'
        },
        costs: {
          Food: '$10-$30/month',
          Maintenance: '$50-$200/year'
        }
      },
      lizards: {
        _general: {
          stats: {
            Weight: '0.5-2 pounds',
            Lifespan: '10-15 years'
          },
          costs: {
            Food: '$10-$20/month',
            Maintenance: '$50-$150/year'
          }
        },
        'Bearded Dragon': {
          stats: {
            Weight: '0.8-1.2 pounds',
            Lifespan: '10-12 years'
          },
          costs: {
            Food: '$15-$25/month',
            Maintenance: '$70-$150/year'
          },
          attributes: ['Docile', 'Hardy']
        },
        'Gecko': {
          stats: {
            Weight: '0.1-0.2 pounds',
            Lifespan: '10-20 years'
          },
          costs: {
            Food: '$5-$15/month',
            Maintenance: '$50-$120/year'
          },
          attributes: ['Nocturnal', 'Agile']
        }
      },
      snakes: {
        _general: {
          stats: {
            Weight: '1-5 pounds',
            Lifespan: '15-30 years'
          },
          costs: {
            Food: '$10-$30/month',
            Maintenance: '$50-$150/year'
          }
        },
        'Ball Python': {
          stats: {
            Weight: '3-5 pounds',
            Lifespan: '20-30 years'
          },
          costs: {
            Food: '$15-$25/month',
            Maintenance: '$70-$150/year'
          },
          attributes: ['Docile', 'Shy']
        },
        'Corn Snake': {
          stats: {
            Weight: '1-2 pounds',
            Lifespan: '15-20 years'
          },
          costs: {
            Food: '$10-$20/month',
            Maintenance: '$50-$120/year'
          },
          attributes: ['Colorful', 'Active']
        }
      }
    }
  };

  // Load state from localStorage on initial render
  useEffect(() => {
    try {
      const storageKeys = {
        expCol: 'compareTableExpCol',
        expFamily: 'compareTableExpFamily', 
        expSpecies: 'compareTableExpSpecies',
        selectedItem: 'compareTableSelectedItem',
        detailView: 'compareTableDetailView'
      };
      
      Object.entries(storageKeys).forEach(([key, storageKey]) => {
        const savedValue = localStorage.getItem(storageKey);
        if (savedValue) {
          const parsedValue = JSON.parse(savedValue);
          
          switch(key) {
            case 'expCol': setExpandedColumn(parsedValue); break;
            case 'expFamily': setExpandedFamily(parsedValue); break;
            case 'expSpecies': setExpandedSpecies(parsedValue); break;
            case 'selectedItem': setSelectedItem(parsedValue); break;
            case 'detailView': setDetailViewActive(parsedValue); break;
            default: break;
          }
        }
      });
    } catch (error) {
      console.error('Error loading state from localStorage:', error);
    }
  }, []);

  // Persist state changes to localStorage
  useEffect(() => {
    localStorage.setItem('compareTableExpCol', JSON.stringify(expandedColumn));
    localStorage.setItem('compareTableExpFamily', JSON.stringify(expandedFamily));
    localStorage.setItem('compareTableExpSpecies', JSON.stringify(expandedSpecies));
    localStorage.setItem('compareTableSelectedItem', JSON.stringify(selectedItem));
    localStorage.setItem('compareTableDetailView', JSON.stringify(detailViewActive));
  }, [expandedColumn, expandedFamily, expandedSpecies, selectedItem, detailViewActive]);

  // Find attributes for a selected item within the data structure
  const getItemAttributes = (itemName) => {
    for (const familyKey in itemData) {
      const family = itemData[familyKey];
      for (const speciesKey in family) {
        if (speciesKey !== '_general' && family[speciesKey][itemName]?.attributes) {
          return family[speciesKey][itemName].attributes;
        }
      }
    }
    return ['Interesting', 'Unique'];
  };

  // Row expansion toggle handlers
  const toggleFamilyExpansion = (familyKey) => {
    setExpandedFamily(expandedFamily === familyKey ? null : familyKey);
    if (expandedFamily !== familyKey) {
      setExpandedSpecies(null);
    }
  };

  const toggleSpeciesExpansion = (speciesKey) => {
    setExpandedSpecies(expandedSpecies === speciesKey ? null : speciesKey);
  };

  const toggleColumnExpansion = (columnKey, event) => {
    if (event) event.stopPropagation();
    setExpandedColumn(expandedColumn === columnKey ? null : columnKey);
  };

  // Cell click handler with smart expansion logic
  const handleCellClick = (level, familyKey, speciesKey = null, itemName = null, categoryKey, event) => {
    if (event) event.stopPropagation();
    
    const cellIdentifier = `${level}-${familyKey}-${speciesKey || ''}-${itemName || ''}-${categoryKey}`;
    const isSameCell = cellIdentifier === lastClickedCell;
    
    setLastClickedCell(isSameCell ? null : cellIdentifier);
    
    if (isSameCell) {
      // Collapse logic on repeat click
      if (level === 'item') {
        setExpandedColumn(null);
      } else if (level === 'species') {
        setExpandedColumn(null);
        setExpandedSpecies(null);
      } else if (level === 'family') {
        setExpandedColumn(null);
        setExpandedSpecies(null);
        setExpandedFamily(null);
      }
      return;
    }
    
    // Expansion logic
    if (expandedColumn !== categoryKey) setExpandedColumn(categoryKey);
    
    if (level === 'family') {
      if (expandedFamily !== familyKey) {
        setExpandedFamily(familyKey);
        setExpandedSpecies(null);
      }
    } else if (level === 'species') {
      setExpandedFamily(familyKey);
      if (expandedSpecies !== speciesKey) setExpandedSpecies(speciesKey);
    } else if (level === 'item') {
      setExpandedFamily(familyKey);
      setExpandedSpecies(speciesKey);
    }
  };

  // Data retrieval helpers
  const getCellData = (level, familyKey, speciesKey = null, itemName = null, category, subCategory) => {
    if (level === 'family') {
      return itemData[familyKey]?._general?.[category]?.[subCategory] || 'N/A';
    } else if (level === 'species') {
      return itemData[familyKey]?.[speciesKey]?._general?.[category]?.[subCategory] || 'N/A';
    } else if (level === 'item') {
      return itemData[familyKey]?.[speciesKey]?.[itemName]?.[category]?.[subCategory] || 'N/A';
    }
    return 'N/A';
  };

  // Gets default cell content for collapsed columns
  const getCellContent = (level, familyKey, speciesKey = null, itemName = null, category) => {
    const primarySubcategory = category === 'stats' ? 'Weight' : 'Food';
    return getCellData(level, familyKey, speciesKey, itemName, category, primarySubcategory);
  };

  // Style utilities
  const getBgClass = (level, isExpandedColumn, isActiveSubcategory) => {
    const baseClasses = {
      family: isExpandedColumn ? 'bg-blue-100' : 'bg-blue-50',
      species: isExpandedColumn ? 'bg-blue-200' : 'bg-blue-100',
      item: (isExpandedColumn && isActiveSubcategory) ? 'bg-blue-300' : 'bg-blue-200'
    };
    
    return baseClasses[level] || 'bg-gray-50';
  };

  const getRowHeaderBgClass = (level, isExpanded) => {
    if (isExpanded) return 'bg-gray-300 hover:bg-gray-300';
    
    const baseClasses = {
      family: 'bg-gray-50 hover:bg-gray-200',
      species: 'bg-gray-100 hover:bg-gray-200',
      item: 'bg-gray-200'
    };
    
    return baseClasses[level] || 'bg-gray-50 hover:bg-gray-200';
  };

  // View navigation handlers
  const handleItemNameClick = (familyKey, speciesKey, itemName, event) => {
    if (event) event.stopPropagation();
    setSelectedItem(itemName);
    setDetailViewActive(true);
    setExpandedFamily(familyKey);
    setExpandedSpecies(speciesKey);
  };
  
  const handleItemSelectInDetailView = (itemName) => {
    if (selectedItem === itemName) {
      setDetailViewActive(false);
    } else {
      setSelectedItem(itemName);
    }
  };
  
  const handleFamilyClickInDetailView = (familyKey) => {
    setDetailViewActive(false);
    setExpandedFamily(familyKey);
    setExpandedSpecies(null);
  };
  
  const handleSpeciesClickInDetailView = (familyKey, speciesKey) => {
    setDetailViewActive(false);
    setExpandedFamily(familyKey);
    setExpandedSpecies(speciesKey);
  };
  
  const closeDetailView = () => {
    setDetailViewActive(false);
    setSelectedItem(null);
  };

  // Render column headers with subcategory awareness
  const renderColumnHeaders = () => {
    return Object.entries(mainCategories).map(([categoryKey, categoryData]) => {
      const isExpanded = expandedColumn === categoryKey;
      
      if (isExpanded) {
        // Expanded subcategory headers
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
      
      // Collapsed category header
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

  // Render data cells with expansion awareness
  const renderRowCells = (level, familyKey, speciesKey = null, itemName = null) => {
    return Object.entries(mainCategories).map(([categoryKey, categoryData]) => {
      const isExpanded = expandedColumn === categoryKey;
      
      if (isExpanded) {
        // Expanded subcategory cells
        return categoryData.subcategories.map(subcategory => {
          const bgClass = getBgClass(level, true, true);
          return (
            <td 
              key={`${level}-${familyKey}-${speciesKey}-${itemName}-${categoryKey}-${subcategory}`} 
              className={`border border-gray-300 p-3 text-center ${bgClass} cursor-pointer`}
              onClick={(e) => handleCellClick(level, familyKey, speciesKey, itemName, categoryKey, e)}
            >
              {getCellData(level, familyKey, speciesKey, itemName, categoryKey, subcategory)}
            </td>
          );
        });
      }
      
      // Collapsed category cell
      const bgClass = getBgClass(level, false, false);
      return (
        <td 
          key={`${level}-${familyKey}-${speciesKey}-${itemName}-${categoryKey}`}
          className={`border border-gray-300 p-3 cursor-pointer ${bgClass}`}
          onClick={(e) => handleCellClick(level, familyKey, speciesKey, itemName, categoryKey, e)}
        >
          {getCellContent(level, familyKey, speciesKey, itemName, categoryKey)}
        </td>
      );
    });
  };

  // Detail view with item attributes
  const renderDetailView = () => {
    const columnCount = expandedColumn 
      ? mainCategories[expandedColumn].subcategories.length 
      : Object.keys(mainCategories).length;
    
    const attributes = getItemAttributes(selectedItem);
    
    return (
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
                      {/* Family row */}
                      <div 
                        className={`border border-gray-300 p-3 font-bold capitalize w-full cursor-pointer hover:bg-gray-200
                          ${getRowHeaderBgClass('family', isFamilyExpanded)}`}
                        onClick={() => handleFamilyClickInDetailView(familyKey)}
                      >
                        <div className="flex justify-between items-center">
                          <span>{familyData.title}</span>
                          <span className="text-xs text-gray-500">
                            {isFamilyExpanded ? '▼' : '▶'}
                          </span>
                        </div>
                      </div>
                      
                      {/* Species rows */}
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
                            
                            {/* Item rows */}
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
              className="border border-gray-300 bg-blue-100 p-0 h-full relative"
              style={{ height: '100%', minHeight: '500px' }}
            >
              <div className="flex flex-col items-center justify-center w-full h-full absolute inset-0">
                <h2 className="text-4xl font-bold text-blue-800 mb-4">{selectedItem}</h2>
                <div className="flex space-x-6">
                  {attributes.map((attr, index) => (
                    <div 
                      key={index} 
                      className="bg-white shadow-md rounded-lg px-6 py-3 text-blue-700 font-medium text-xl"
                    >
                      {attr}
                    </div>
                  ))}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-gray-50 rounded-lg shadow-lg">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-center mb-2 text-blue-600">Pet Comparison Tool</h1>
        <p className="text-gray-600 text-center">Compare different types of pets to find your perfect match</p>
      </div>
      
      {detailViewActive ? (
        <>
          {renderDetailView()}
          <div className="mt-4 text-sm text-gray-500">
            <p>Click a different breed to view its details.</p>
            <p>Click a category name to return to table view with that category expanded.</p>
            <p>Click "Back to Table" to return to the full table view.</p>
          </div>
        </>
      ) : (
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
                  {/* Family row */}
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
                        <span>{familyData.title}</span>
                        <span className="text-xs text-gray-500">
                          {expandedFamily === familyKey ? '▼' : '▶'}
                        </span>
                      </div>
                    </td>
                    
                    {renderRowCells('family', familyKey)}
                  </tr>
                  
                  {/* Species rows */}
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
                      
                      {/* Item rows */}
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
            <p>Click on a breed name to view detailed information.</p>
            <p>Your view preferences are saved automatically between visits.</p>
          </div>
        </>
      )}
    </div>
  );
};