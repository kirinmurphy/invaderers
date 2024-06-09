import { buildEntity } from "../helpers/buildEntity.js";
import { STATUS } from "../helpers/constants.js";
import { BATTLE_PROPS } from "../helpers/getBattleHelper.js";

export function addShipToFleet ({ screenHelper, index }) {
  const { screenSettings, battleHelper, mapObservers } = screenHelper;
  const { getNextEntityPosition, isAtRightEdge, isAtLeftEdge } = mapObservers;
  const { shipColumns, shipSize, shipJump } = screenSettings;
  const { deployPosition } = battleHelper.get();

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