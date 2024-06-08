import { STATUS } from "./constants.js";
import { BATTLE_PROPS } from "./getBattleHelper.js";

export function checkForDefenderShot ({ screenHelper }) {
  const { coordinateStatus, battleHelper, mapObservers } = screenHelper;
  const { getCell } = mapObservers;
  const { bulletLength } = screenHelper.screenSettings;
  const { defenderShotPosition } = battleHelper.get();
  coordinateStatus.clearStatus(STATUS.defenderShot);

  if ( defenderShotPosition ) {
    buildBullet({ screenHelper, bulletStartPosition: defenderShotPosition });

    const spotInFrontOfBullets = getCell.above(defenderShotPosition);
    const currentPositionStatus = coordinateStatus.getStatus(spotInFrontOfBullets);
    const possibleShipIndex = coordinateStatus.getStatusIndex(spotInFrontOfBullets);
    const isInvader = currentPositionStatus === STATUS.ship && possibleShipIndex !== null;
    if ( isInvader ) { 
      obliterateInvader({ screenHelper, shipIndex: possibleShipIndex });
    } else {
      const nextShotPosition = getNextShotPosition({ mapObservers, defenderShotPosition, bulletLength });
      battleHelper.set(BATTLE_PROPS.defenderShotPosition, nextShotPosition);  
    }
  }
}

function obliterateInvader ({ screenHelper, shipIndex }) {
  const { coordinateStatus, battleHelper } = screenHelper;
  battleHelper.set(BATTLE_PROPS.defenderShotPosition, null);
  battleHelper.addToKillList(shipIndex);
  coordinateStatus.clearAllPositionsWithStatusIndex({ statusIndex: shipIndex });
}

function getNextShotPosition ({ mapObservers, defenderShotPosition, bulletLength }) {
  const { getCell, isAtTopRow } = mapObservers;
  const newPos = getCell.above(defenderShotPosition, { distance: bulletLength });
  const moreBoardToGo = !isAtTopRow({ newPos });
  return moreBoardToGo ? newPos : null;
}

function buildBullet ({ screenHelper, bulletStartPosition }) {
  const { coordinateStatus, screenSettings, mapObservers } = screenHelper;
  const { getCell } = mapObservers;
  const { bulletLength } = screenSettings;
  for (let  i = 0; i < bulletLength; i++) {
    const newPos = getCell.below(bulletStartPosition, { distance: i });
    coordinateStatus.setStatus({ position: newPos, status: STATUS.defenderShot });
  }
}
