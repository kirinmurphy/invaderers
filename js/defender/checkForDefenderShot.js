import { STATUS } from "../helpers/constants.js";
import { BATTLE_PROPS } from "../helpers/getBattleHelper.js";
import { useInvadererHelper } from "../helpers/useInvadererHelper.js";

export function checkForDefenderShot () {
  const { mapCoordinates, battleHelper } = useInvadererHelper();
  const { defenderShotPosition } = battleHelper.get();

  mapCoordinates.clearStatus(STATUS.defenderShot);

  if ( defenderShotPosition ) {
    moveBullet({ defenderShotPosition });
  }
}

function moveBullet ({ defenderShotPosition }) {
  const { mapCoordinates, battleHelper, mapObservers, screenSettings } = useInvadererHelper();
  const { getCell } = mapObservers;
  const { defenderBulletLength } = screenSettings;

  buildBullet({ 
    bulletStartPosition: defenderShotPosition, 
    status: STATUS.defenderShot 
  });
    
  const invaderIndex = getInvaderIndex({ mapCoordinates, defenderShotPosition, getCell });
  
  if ( invaderIndex !== null) { 
    obliterateInvader({ invaderIndex });
  } else {
    const nextShotPosition = getNextShotPosition({ mapObservers, defenderShotPosition, defenderBulletLength });
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
  const { mapCoordinates, battleHelper } = useInvadererHelper();
  battleHelper.set(BATTLE_PROPS.defenderShotPosition, null);
  battleHelper.addToKillList(invaderIndex);
  mapCoordinates.clearAllPositionsWithStatusIndex({ statusIndex: invaderIndex });
}

function getNextShotPosition ({ mapObservers, defenderShotPosition, defenderBulletLength }) {
  const { getCell, isAt } = mapObservers;
  const newPos = getCell.above(defenderShotPosition, { distance: defenderBulletLength });
  const moreBoardToGo = !isAt.topRow({ newPos });
  return moreBoardToGo ? newPos : null;
}

function buildBullet ({ bulletStartPosition, status }) {
  const { mapCoordinates, screenSettings, mapObservers } = useInvadererHelper();
  const { getCell } = mapObservers;
  const { defenderBulletLength } = screenSettings;
  for (let  i = 0; i < defenderBulletLength; i++) {
    const newPos = getCell.below(bulletStartPosition, { distance: i });
    mapCoordinates.setStatus({ position: newPos, status });
  }
}
