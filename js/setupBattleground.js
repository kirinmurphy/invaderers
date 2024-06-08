import { STATUS } from "./constants.js";
import { BATTLE_PROPS } from "./getBattleHelper.js";

export function setupBattleground ({ screenHelper }) {
  const { battleHelper, updateScreen } = screenHelper;
  const fleetStartPosition = battleHelper.get('startPosition');
  buildFleet({ screenHelper, fleetStartPosition });
  setupDefender({ screenHelper });  
  updateScreen();        
}

function setupDefender ({ screenHelper }) {
  const { battleHelper } = screenHelper;
  const newPos = battleHelper.get('defenderPosition');
  buildShip({ screenHelper, newPos, shipStatus: STATUS.defender });  
};

export function buildFleet ({ screenHelper }) {
  const { screenSettings, battleHelper } = screenHelper;
  const { shipRows, shipColumns, shipSize, columns, shipJump } = screenSettings;
  const deployPosition = battleHelper.get('deployPosition');
  
  for (let i = 0; i < shipRows*shipColumns; i++ ) {
    const fullRows = Math.floor(i / shipColumns);
    const gridPosition = Math.floor(i % shipColumns);
    
    const newPos = deployPosition + (fullRows*columns*shipJump) 
      + (gridPosition*shipJump);
    
    const atRightEdge = (newPos % columns) + shipSize-1 === columns;
    if ( atRightEdge ) { battleHelper.set(BATTLE_PROPS.atRightEdge, true); }
    const atLeftEdge = newPos % columns === 1;
    if ( atLeftEdge ) { battleHelper.set(BATTLE_PROPS.atLeftEdge, true); }

    buildShip({ screenHelper, newPos });
  }
}

export function buildShip ({ screenHelper, newPos, shipStatus = STATUS.ship }) {
  const { screenSettings, coordinateStatus } = screenHelper;
  const { shipSize, columns } = screenSettings;
  
  for ( let i = 0; i < shipSize*shipSize; i++) {
    const fullRows = Math.floor(i / shipSize);
    const gridPosition = Math.floor(i % shipSize);
    const newField = newPos+gridPosition+(columns*fullRows);
    coordinateStatus.setStatus(newField, shipStatus);    
  }  
}
