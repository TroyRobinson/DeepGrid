import { itemData } from './mockData';

export const getItemAttributes = (itemName) => {
  for (const familyKey in itemData) {
    const family = itemData[familyKey];
    for (const speciesKey in family) {
      if (speciesKey !== '_general' && family[speciesKey][itemName]?.attributes) {
        return family[speciesKey][itemName].attributes;
      }
    }
  }
  return ['Activity 1', 'Activity 2'];
};

export const getCellData = (level, familyKey, speciesKey = null, itemName = null, category, subCategory) => {
  if (level === 'family') {
    return itemData[familyKey]?._general?.[category]?.[subCategory] || 'N/A';
  } else if (level === 'species') {
    return itemData[familyKey]?.[speciesKey]?._general?.[category]?.[subCategory] || 'N/A';
  } else if (level === 'item') {
    return itemData[familyKey]?.[speciesKey]?.[itemName]?.[category]?.[subCategory] || 'N/A';
  }
  return 'N/A';
};

export const getCellContent = (level, familyKey, speciesKey = null, itemName = null, category) => {
  const primarySubcategory = category === 'comparison' ? 'Vs OKC' : 'Last Month';
  return getCellData(level, familyKey, speciesKey, itemName, category, primarySubcategory);
};

export const getPrimaryMetric = (familyKey, hierarchyData) => {
  if (!hierarchyData || !familyKey) return '';
  
  const family = hierarchyData[familyKey];
  if (family && family.species) {
    const firstSpeciesKey = Object.keys(family.species)[0];
    return family.species[firstSpeciesKey].title;
  }
  return '';
}; 