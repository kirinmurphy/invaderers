import { STATUS } from "./constants.js";
import { BATTLE_PROPS } from "./getBattleHelper.js";

export function setupBattleground ({ screenHelper }) {
  const { battleHelper, updateScreen } = screenHelper;
  const fleetStartPosition = battleHelper.get(BATTLE_PROPS.fleetStartPosition);
  buildFleet({ screenHelper, fleetStartPosition });
  setupDefender({ screenHelper });  
  updateScreen();
}

function setupDefender ({ screenHelper }) {
  const { battleHelper } = screenHelper;
  const newPos = battleHelper.get('defenderPosition');
  buildEntity({ screenHelper, position: newPos, entityStatus: STATUS.defender });  
};

export function buildFleet ({ screenHelper }) {
  const { screenSettings, battleHelper, mapObservers } = screenHelper;
  const { getNextEntityPosition, isAtRightEdge, isAtLeftEdge } = mapObservers;
  const { shipRows, shipColumns, shipSize, shipJump } = screenSettings;
  const { deployPosition, deadBois } = battleHelper.get();
  
  for (let index = 0; index < shipRows*shipColumns; index++ ) {
    if ( deadBois.has(index) ) continue;

    const newPos = getNextEntityPosition({ 
      currentPos: deployPosition,
      index, 
      entityColumns: shipColumns,
      itemOffset: shipJump
    }); 
        
    const atRightEdge = isAtRightEdge({ newPos, itemOffset: shipSize });
    if ( atRightEdge ) { battleHelper.set(BATTLE_PROPS.atRightEdge, true); }
    const atLeftEdge = isAtLeftEdge({ newPos });
    if ( atLeftEdge ) { battleHelper.set(BATTLE_PROPS.atLeftEdge, true); }

    buildEntity({ 
      screenHelper, 
      position: newPos, 
      entityStatus: STATUS.ship, 
      statusIndex: index 
    });
  }
}

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
