export function getMapObservers ({ screenSettings }) {
  const { columns: mapColumns, rows: mapRows } = screenSettings;

  const getCell = {
    above: (currentPos, { distance = 1 } = {}) => currentPos - mapColumns * distance,
    below: (currentPos, { distance = 1 } = {}) => currentPos + mapColumns * distance,
    toTheLeft: (currentPos, { distance = 1 } = {}) => currentPos - 1 * distance,
    toTheRight: (currentPos, { distance = 1 } = {}) => currentPos + 1 * distance,
  }

  const getColumnIndex = ({ position }) => position % mapColumns;
  
  const isAtRightEdge = ({ newPos, itemOffset }) => {
    return (newPos % mapColumns) + itemOffset-1 === mapColumns;
  }
  
  const isAtLeftEdge = ({ newPos, firstIndex = 1 }) => {
    return newPos % mapColumns === firstIndex;
  }

  const isAtTopRow =({ newPos }) => {
    return newPos / mapColumns < 1
  }

  const getNextEntityPosition = (props) => {
    const { currentPos, index, entityColumns, itemOffset = 1} = props;
    const fullRows = Math.floor(index / entityColumns);
    const gridPosition = Math.floor(index % entityColumns);
    const rowStartIndex = fullRows * mapColumns * itemOffset;
    const columnOffset = gridPosition * itemOffset;
  
    return currentPos + rowStartIndex + columnOffset;
  }

  const getRowByMapPercentage = ({ topOffsetPercent, entityOffset = 0 }) => {
    return Math.floor(topOffsetPercent/100 * mapRows - entityOffset);
  };

  const getPositionByCoordinates = ({ row, column }) => {
    return (row-1) * mapColumns + column;
  };

  const getCenteredLeftOffset = ({ entityColumns }) => {
    return Math.ceil((mapColumns-entityColumns)/2);
  };

  const getMaxColumnIndex = ({ entitySize, firstIndex = 1 }) => {
    return mapColumns - entitySize + firstIndex;
  }

  return {
    getCell,
    getColumnIndex,
    isAtRightEdge,
    isAtLeftEdge,
    isAtTopRow,
    getNextEntityPosition,
    getRowByMapPercentage,
    getPositionByCoordinates,
    getCenteredLeftOffset,
    getMaxColumnIndex
  }
}
