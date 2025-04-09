import useLocalStorage from './useLocalStorage';

const useTableState = () => {
  const [expandedColumn, setExpandedColumn] = useLocalStorage('compareTableExpCol', null);
  const [expandedFamily, setExpandedFamily] = useLocalStorage('compareTableExpFamily', null);
  const [expandedSpecies, setExpandedSpecies] = useLocalStorage('compareTableExpSpecies', null);
  const [selectedItem, setSelectedItem] = useLocalStorage('compareTableSelectedItem', null);
  const [detailViewActive, setDetailViewActive] = useLocalStorage('compareTableDetailView', false);
  const [deepestLevelView, setDeepestLevelView] = useLocalStorage('compareTableDeepestLevelView', false);
  const [hoveredColumnGroup, setHoveredColumnGroup] = useLocalStorage('compareTableHoveredGroup', null);
  const [lastClickedCell, setLastClickedCell] = useLocalStorage('compareTableLastClickedCell', null);
  const [chartDataVisible, setChartDataVisible] = useLocalStorage('compareTableChartDataVisible', false);
  const [selectedChartData, setSelectedChartData] = useLocalStorage('compareTableSelectedChartData', null);
  const [selectedChartTitle, setSelectedChartTitle] = useLocalStorage('compareTableSelectedChartTitle', null);

  const toggleFamilyExpansion = (familyKey) => {
    if (expandedFamily === familyKey) {
      setExpandedFamily(null);
      setExpandedSpecies(null);
      setDeepestLevelView(false);
    } else {
      setExpandedFamily(familyKey);
      setExpandedSpecies(null);
      setDeepestLevelView(false);
    }
  };

  const toggleSpeciesExpansion = (speciesKey) => {
    if (expandedSpecies === speciesKey) {
      setExpandedSpecies(null);
      setDeepestLevelView(false);
    } else {
      setExpandedSpecies(speciesKey);
      setDeepestLevelView(true);
    }
  };

  const toggleColumnExpansion = (columnKey, event) => {
    if (event) event.stopPropagation();
    setExpandedColumn(expandedColumn === columnKey ? null : columnKey);
  };

  const handleCellClick = (level, familyKey, speciesKey = null, itemName = null, categoryKey, event) => {
    if (event) event.stopPropagation();
    
    const cellIdentifier = `${level}-${familyKey}-${speciesKey || ''}-${itemName || ''}-${categoryKey}`;
    const isSameCell = cellIdentifier === lastClickedCell;
    
    setLastClickedCell(isSameCell ? null : cellIdentifier);
    
    if (isSameCell) {
      if (level === 'item') {
        setExpandedColumn(null);
        setDeepestLevelView(false);
      } else if (level === 'species') {
        setExpandedColumn(null);
        setExpandedSpecies(null);
        setDeepestLevelView(false);
      } else if (level === 'family') {
        setExpandedColumn(null);
        setExpandedSpecies(null);
        setExpandedFamily(null);
        setDeepestLevelView(false);
      }
      return;
    }
    
    if (expandedColumn !== categoryKey) setExpandedColumn(categoryKey);
    
    if (level === 'family') {
      if (expandedFamily !== familyKey) {
        setExpandedFamily(familyKey);
        setExpandedSpecies(null);
        setDeepestLevelView(false);
      }
    } else if (level === 'species') {
      setExpandedFamily(familyKey);
      if (expandedSpecies !== speciesKey) {
        setExpandedSpecies(speciesKey);
        setDeepestLevelView(true);
      }
    } else if (level === 'item') {
      setExpandedFamily(familyKey);
      setExpandedSpecies(speciesKey);
      setDeepestLevelView(true);
    }
  };

  const handleItemNameClick = (familyKey, speciesKey, itemName, event) => {
    if (event) event.stopPropagation();
    setSelectedItem(itemName);
    setDetailViewActive(true);
    setExpandedFamily(familyKey);
    setExpandedSpecies(speciesKey);
    setDeepestLevelView(true);
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
    setDeepestLevelView(false);
  };

  const handleSpeciesClickInDetailView = (familyKey, speciesKey) => {
    setDetailViewActive(false);
    setExpandedFamily(familyKey);
    setExpandedSpecies(speciesKey);
    setDeepestLevelView(true);
  };

  const closeDetailView = () => {
    setDetailViewActive(false);
    setSelectedItem(null);
    setDeepestLevelView(false);
  };

  const handleChartClick = (data, title) => {
    setSelectedChartData(data);
    setSelectedChartTitle(title);
    setChartDataVisible(true);
  };

  const closeChartData = () => {
    setChartDataVisible(false);
  };

  return {
    // State
    expandedColumn,
    expandedFamily,
    expandedSpecies,
    selectedItem,
    detailViewActive,
    deepestLevelView,
    hoveredColumnGroup,
    lastClickedCell,
    chartDataVisible,
    selectedChartData,
    selectedChartTitle,

    // Setters
    setExpandedColumn,
    setExpandedFamily,
    setExpandedSpecies,
    setSelectedItem,
    setDetailViewActive,
    setDeepestLevelView,
    setHoveredColumnGroup,
    setLastClickedCell,
    setChartDataVisible,
    setSelectedChartData,
    setSelectedChartTitle,

    // Actions
    toggleFamilyExpansion,
    toggleSpeciesExpansion,
    toggleColumnExpansion,
    handleCellClick,
    handleItemNameClick,
    handleItemSelectInDetailView,
    handleFamilyClickInDetailView,
    handleSpeciesClickInDetailView,
    closeDetailView,
    handleChartClick,
    closeChartData
  };
};

export default useTableState; 