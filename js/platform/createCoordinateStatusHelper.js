export function createCoordinateStatusHelper() {
  const initialStatusMap = new Map();
  const coordinateStatusMap = new Map(initialStatusMap);

  function setStatus({ position, status, statusIndex = null }) {
    coordinateStatusMap.set(position, { status, statusIndex });
  }

  function getStatus(position) {
    const entry = coordinateStatusMap.get(position);
    return entry ? entry.status : null;
  }

  function getStatusIndex(position) {
    const entry = coordinateStatusMap.get(position);
    return entry ? entry.statusIndex : null;
  }

  function hasStatus(position) {
    return coordinateStatusMap.has(position);
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

  function clearAllPositionsWithStatusIndex({ statusIndex }) {
    for (let [key, value] of coordinateStatusMap) {
      if (value.statusIndex === statusIndex) {
        coordinateStatusMap.delete(key);
      }
    }
  }

  return {
    getStatus,
    setStatus,
    getStatusIndex,
    hasStatus,
    clearStatus,
    resetStatus,
    getFinalCount,
    clearAllPositionsWithStatusIndex
  };
}
