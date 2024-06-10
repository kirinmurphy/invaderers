import { STATUS } from "../helpers/constants.js";
import { BATTLE_PROPS } from "../helpers/getBattleHelper.js";

export function invaderAttack({ screenHelper }) {
  const { battleHelper, mapCoordinates } = screenHelper;
  const { get } = battleHelper;
  const { liveBullets } = get();

  mapCoordinates.clearStatus(STATUS.invaderShot);

  addNewShootersToLiveBullets({ screenHelper });

  const liveBulletKeys = Array.from(liveBullets.keys());

  for (const bulletPos of liveBulletKeys) {
    moveBullet({ bulletPos, screenHelper });
  }
}


function addNewShootersToLiveBullets ({ screenHelper }) {
  const { battleHelper } = screenHelper;
  const { shooters } = battleHelper.get();

  for (const shooterPos of shooters.values()) {
    addNewShooterToLiveBullet({ shooterPos, screenHelper });
  }

  battleHelper.clearTrackingFor(BATTLE_PROPS.shooters);
}


function addNewShooterToLiveBullet ({ shooterPos, screenHelper}) {
  const { battleHelper, mapObservers } = screenHelper;
  const { updateTrackingFor } = battleHelper;
  const { shipSize } = screenHelper.screenSettings;
  const { getCell } = mapObservers;

  const distanceOffset = { xDistance: shipSize/2, yDistance: shipSize };
  const shipTurretPos = getCell.at(shooterPos, distanceOffset);
  updateTrackingFor(BATTLE_PROPS.liveBullets, { key: shipTurretPos, value: true });    
}


function moveBullet ({ bulletPos, screenHelper }) {
  const { battleHelper, mapCoordinates, mapObservers } = screenHelper;
  const { getCell, isAtOrOver } = mapObservers;
  const { updateTrackingFor, deleteTrackingFor } = battleHelper;

  deleteTrackingFor(BATTLE_PROPS.liveBullets, { key: bulletPos });

  const newPos = getCell.below(bulletPos, { distance: 1 });

  const newPositionStatus = mapCoordinates.getStatus(newPos);

  if ( newPositionStatus === STATUS.defender ) {
    battleHelper.endGame({ winner: STATUS.ship, loser: STATUS.defender});
    console.log('Game Over')
    return;
  }

  const moreToGo = !isAtOrOver.bottomRow({ newPos });

  if (moreToGo) {
    updateTrackingFor(BATTLE_PROPS.liveBullets, { key: newPos, value: true });
    mapCoordinates.setStatus({ position: newPos, status: STATUS.invaderShot });
  } 
}
