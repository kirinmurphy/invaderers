export function createCoordinateStatusHelper() {
  const initialStatusMap = new Map();
  const coordinateStatusMap = new Map(initialStatusMap);

  function setStatus(pos, status, shipIndex = null) {
    coordinateStatusMap.set(pos, { status, shipIndex });
  }

  function getStatus(pos) {
    const entry = coordinateStatusMap.get(pos);
    return entry ? entry.status : null;
  }

  function getShipIndex(pos) {
    const entry = coordinateStatusMap.get(pos);
    return entry ? entry.shipIndex : null;
  }

  function hasStatus(pos) {
    return coordinateStatusMap.has(pos);
  }

  function clearStatus(statusToClear) {
    for (let [key, value] of coordinateStatusMap) {
      if (value.status === statusToClear) {
        coordinateStatusMap.delete(key);
      }
    }
  };

  function getFinalCount(status) {
    return [...coordinateStatusMap.values()].reduce((count, value) => {
      return value.status === status ? count + 1 : count;
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
    getShipIndex,
    hasStatus,
    clearStatus,
    resetStatus,
    getFinalCount
  };
}
