export function buildEntity (props) {
  const { screenHelper, position, entityStatus, statusIndex = null } = props
  const { screenSettings, mapCoordinates, mapObservers } = screenHelper;
  const { getNextEntityPosition } = mapObservers;
  const { shipSize } = screenSettings;
  
  for ( let index = 0; index < shipSize*shipSize; index++ ) {
    const nextPos = getNextEntityPosition({ 
      currentPos: position,
      index, 
      entityColumns: shipSize,
    });

    mapCoordinates.setStatus({ 
      position: nextPos, 
      status: entityStatus, 
      statusIndex 
    });    
  }  
}
