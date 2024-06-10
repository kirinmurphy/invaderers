export function buildEntity (props) {
  const { screenHelper, position, entityStatus, statusIndex = null } = props
  const { screenSettings, mapCoordinates, mapObservers } = screenHelper;
  const { getNextEntityPosition } = mapObservers;
  const { shipSize } = screenSettings;
  
  let allShipCoordinates = new Set();

  for ( let index = 0; index < shipSize*shipSize; index++ ) {
    const nextPos = getNextEntityPosition({ 
      currentPos: position,
      index, 
      entityColumns: shipSize,
    });

    allShipCoordinates.add(nextPos);

    mapCoordinates.setStatus({ 
      position: nextPos, 
      status: entityStatus, 
      statusIndex 
    });    
  }
}
