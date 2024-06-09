import { STATUS } from "./constants.js";
import { BATTLE_PROPS } from "./getBattleHelper.js";

export function checkForDefenderShot ({ screenHelper }) {
  const { mapCoordinates, battleHelper, mapObservers } = screenHelper;
  const { getCell } = mapObservers;
  const { bulletLength } = screenHelper.screenSettings;
  const { defenderShotPosition } = battleHelper.get();
  mapCoordinates.clearStatus(STATUS.defenderShot);

  if ( defenderShotPosition ) {
    buildBullet({ screenHelper, bulletStartPosition: defenderShotPosition });
    
    const invaderIndex = getInvaderIndex({ mapCoordinates, defenderShotPosition, getCell });
    
    if ( invaderIndex !== null) { 
      obliterateInvader({ screenHelper, invaderIndex });
    } else {
      const nextShotPosition = getNextShotPosition({ mapObservers, defenderShotPosition, bulletLength });
      battleHelper.set(BATTLE_PROPS.defenderShotPosition, nextShotPosition);  
    }
  }
}

function getInvaderIndex ({ mapCoordinates, defenderShotPosition, getCell }) {
  const spotInFrontOfBullets = getCell.above(defenderShotPosition);
  const currentPositionStatus = mapCoordinates.getStatus(spotInFrontOfBullets);
  const possibleShipIndex = mapCoordinates.getStatusIndex(spotInFrontOfBullets);
  const isInvader = currentPositionStatus === STATUS.ship && possibleShipIndex !== null;
  return isInvader ? possibleShipIndex : null;
}

function obliterateInvader ({ screenHelper, invaderIndex }) {
  const { mapCoordinates, battleHelper } = screenHelper;
  battleHelper.set(BATTLE_PROPS.defenderShotPosition, null);
  battleHelper.addToKillList(invaderIndex);
  mapCoordinates.clearAllPositionsWithStatusIndex({ statusIndex: invaderIndex });
}

function getNextShotPosition ({ mapObservers, defenderShotPosition, bulletLength }) {
  const { getCell, isAtTopRow } = mapObservers;
  const newPos = getCell.above(defenderShotPosition, { distance: bulletLength });
  const moreBoardToGo = !isAtTopRow({ newPos });
  return moreBoardToGo ? newPos : null;
}

function buildBullet ({ screenHelper, bulletStartPosition }) {
  const { mapCoordinates, screenSettings, mapObservers } = screenHelper;
  const { getCell } = mapObservers;
  const { bulletLength } = screenSettings;
  for (let  i = 0; i < bulletLength; i++) {
    const newPos = getCell.below(bulletStartPosition, { distance: i });
    mapCoordinates.setStatus({ position: newPos, status: STATUS.defenderShot });
  }
}
