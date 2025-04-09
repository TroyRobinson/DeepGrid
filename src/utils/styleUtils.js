export const getBgClass = (level, isExpandedColumn, isActiveSubcategory) => {
  const baseClasses = {
    family: isExpandedColumn ? 'bg-blue-100' : 'bg-blue-50',
    species: isExpandedColumn ? 'bg-blue-200' : 'bg-blue-100',
    item: (isExpandedColumn && isActiveSubcategory) ? 'bg-blue-300' : 'bg-blue-200'
  };
  
  return baseClasses[level] || 'bg-gray-50';
};

export const getRowHeaderBgClass = (level, isExpanded) => {
  if (isExpanded) return 'bg-gray-300 hover:bg-gray-300';
  
  const baseClasses = {
    family: 'bg-gray-50 hover:bg-gray-200',
    species: 'bg-gray-100 hover:bg-gray-200',
    item: 'bg-gray-200'
  };
  
  return baseClasses[level] || 'bg-gray-50 hover:bg-gray-200';
};

export const getAbbreviatedMetricName = (metricName) => {
  const abbreviations = {
    'Poverty Rate': 'P.R.',
    'Unemployment': 'Unemp.',
    'Infant Mortality': 'I.M.',
    'Access to Care': 'A.C.'
  };
  return abbreviations[metricName] || metricName;
}; 