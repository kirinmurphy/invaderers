import { STATUS } from "../helpers/constants.js";
import { BATTLE_PROPS } from "../helpers/getBattleHelper.js";
import { ScreenHelper } from "../platform/ScreenHelper.js";

export function checkForDefenderShot () {
  const { mapCoordinates, battleHelper } = ScreenHelper.get();
  const { defenderShotPosition } = battleHelper.get();

  mapCoordinates.clearStatus(STATUS.defenderShot);

  if ( defenderShotPosition ) {
    moveBullet({ defenderShotPosition });
  }
}

function moveBullet ({ defenderShotPosition }) {
  const { mapCoordinates, battleHelper, mapObservers, screenSettings } = ScreenHelper.get();
  const { getCell } = mapObservers;
  const { bulletLength } = screenSettings;

  buildBullet({ 
    bulletStartPosition: defenderShotPosition, 
    status: STATUS.defenderShot 
  });
    
  const invaderIndex = getInvaderIndex({ mapCoordinates, defenderShotPosition, getCell });
  
  if ( invaderIndex !== null) { 
    obliterateInvader({ invaderIndex });
  } else {
    const nextShotPosition = getNextShotPosition({ mapObservers, defenderShotPosition, bulletLength });
    battleHelper.set(BATTLE_PROPS.defenderShotPosition, nextShotPosition);  
  }
};

function getInvaderIndex ({ mapCoordinates, defenderShotPosition, getCell }) {
  const spotInFrontOfBullets = getCell.above(defenderShotPosition);
  const currentPositionStatus = mapCoordinates.getStatus(spotInFrontOfBullets);
  const possibleShipIndex = mapCoordinates.getStatusIndex(spotInFrontOfBullets);
  const isInvader = currentPositionStatus === STATUS.ship && possibleShipIndex !== null;
  return isInvader ? possibleShipIndex : null;
}

function obliterateInvader ({ invaderIndex }) {
  const { mapCoordinates, battleHelper } = ScreenHelper.get();
  battleHelper.set(BATTLE_PROPS.defenderShotPosition, null);
  battleHelper.addToKillList(invaderIndex);
  mapCoordinates.clearAllPositionsWithStatusIndex({ statusIndex: invaderIndex });
}

function getNextShotPosition ({ mapObservers, defenderShotPosition, bulletLength }) {
  const { getCell, isAt } = mapObservers;
  const newPos = getCell.above(defenderShotPosition, { distance: bulletLength });
  const moreBoardToGo = !isAt.topRow({ newPos });
  return moreBoardToGo ? newPos : null;
}

function buildBullet ({ bulletStartPosition, status }) {
  const { mapCoordinates, screenSettings, mapObservers } = ScreenHelper.get();
  const { getCell } = mapObservers;
  const { bulletLength } = screenSettings;
  for (let  i = 0; i < bulletLength; i++) {
    const newPos = getCell.below(bulletStartPosition, { distance: i });
    mapCoordinates.setStatus({ position: newPos, status });
  }
}
