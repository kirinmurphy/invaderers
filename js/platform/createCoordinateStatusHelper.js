export function createCoordinateStatusHelper() {
  const initialStatusMap = new Map();
  const coordinateStatusMap = new Map(initialStatusMap);

  function setStatus(pos, status) {
    coordinateStatusMap.set(pos, status);
  }

  function getStatus(pos) {
    return coordinateStatusMap.get(pos);
  }

  function hasStatus(pos) {
    return coordinateStatusMap.has(pos);
  }
  
  function clearStatus (statusToClear) {
    for (let [key, value] of coordinateStatusMap) {
      if (value === statusToClear) {
        coordinateStatusMap.delete(key);
      }
    }
  };
  
  function getFinalCount (status) {
    return [...coordinateStatusMap.values()].reduce((count, value) => {
      return value === status ? count + 1 : count;
    }, 0);        
  }

  function resetStatus() {
    coordinateStatusMap.clear();
    for (const [key, value] of initialStatusMap.entries()) {
      coordinateStatusMap.set(key, value);
    }
  }

  return {
    getStatus,
    setStatus,
    hasStatus,
    clearStatus,
    resetStatus,
    getFinalCount
  };
}