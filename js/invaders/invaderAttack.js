import { STATUS } from "../helpers/constants.js";
import { BATTLE_PROPS } from "../helpers/getBattleHelper.js";
import { useCanvasHelper } from "../platform/canvasHelper.js";

export function invaderAttack() {
  const { battleHelper, mapCoordinates } = useCanvasHelper();
  const { get } = battleHelper;
  const { liveBullets } = get();

  mapCoordinates.clearStatus(STATUS.invaderShot);

  addNewShootersToLiveBullets();

  const liveBulletKeys = Array.from(liveBullets.keys());

  for (const bulletPos of liveBulletKeys) {
    moveBullet({ bulletPos });
  }
}


function addNewShootersToLiveBullets () {
  const { battleHelper } = useCanvasHelper();
  const { shooters } = battleHelper.get();

  for (const shooterPos of shooters.values()) {
    addNewShooterToLiveBullet({ shooterPos });
  }

  battleHelper.clearTrackingFor(BATTLE_PROPS.shooters);
}


function addNewShooterToLiveBullet ({ shooterPos }) {
  const { battleHelper, mapObservers, screenSettings } = useCanvasHelper();
  const { updateTrackingFor } = battleHelper;
  const { shipSize } = screenSettings;
  const { getCell } = mapObservers;

  const distanceOffset = { xDistance: shipSize/2, yDistance: shipSize };
  const shipTurretPos = getCell.at(shooterPos, distanceOffset);
  updateTrackingFor(BATTLE_PROPS.liveBullets, { key: shipTurretPos, value: true });    
}


function moveBullet ({ bulletPos }) {
  const { battleHelper, mapCoordinates, mapObservers } = useCanvasHelper();
  const { getCell, isAtOrOver } = mapObservers;
  const { updateTrackingFor, deleteTrackingFor } = battleHelper;

  deleteTrackingFor(BATTLE_PROPS.liveBullets, { key: bulletPos });

  // TODO: make different speed for different bullets 
  const newPos = getCell.below(bulletPos, { distance: 1 });
  const newPositionStatus = mapCoordinates.getStatus(newPos);

  if ( newPositionStatus === STATUS.defender ) {
    battleHelper.endGame({ gameOutcome: 'lost' });
    return;
  }

  const moreToGo = !isAtOrOver.bottomRow({ newPos });

  if (moreToGo) {
    updateTrackingFor(BATTLE_PROPS.liveBullets, { key: newPos, value: true });
    mapCoordinates.setStatus({ position: newPos, status: STATUS.invaderShot });
  } 
}
