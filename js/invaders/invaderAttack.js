import { STATUS } from "../helpers/constants.js";

export function invaderAttack({ screenHelper }) {
  console.log('STARRT INVASSSSSION');
  const { screenSettings, battleHelper, mapCoordinates, mapObservers } = screenHelper;
  const { shipSize } = screenSettings; 
  const { getCell } = mapObservers;
  
  const { shooters } = battleHelper.get();
  console.log('---------------------');
  mapCoordinates.clearStatus(STATUS.invaderShot);
  for (const shooterPos of shooters.values()) {
    const distanceOffset = { xDistance: shipSize/2, yDistance: shipSize };
    const shipTurretPos = getCell.at(shooterPos, distanceOffset);
    console.log('xDistance', shipSize/2, 'shipTurretPos', shipTurretPos, 'shooterPos', shooterPos);

    mapCoordinates.setStatus({ position: shipTurretPos, status: STATUS.invaderShot });
  }
}
