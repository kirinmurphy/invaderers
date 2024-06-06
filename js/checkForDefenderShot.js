import { STATUS } from "./constants.js";
import { BATTLE_PROPS } from "./getBattleHelper.js";

export function checkForDefenderShot ({ screenHelper }) {
  const { coordinateStatus, battleHelper } = screenHelper;
  const { columns, bulletLength } = screenHelper.screenSettings;
  const { defenderShotPosition } = battleHelper.get();
  coordinateStatus.clearStatus(STATUS.defenderShot);

  if ( defenderShotPosition ) {
    buildBullet({ screenHelper, bulletStartPosition: defenderShotPosition });

    const spotInFrontOfBullets = defenderShotPosition - columns;
    const currentPositionStatus = coordinateStatus.getStatus(spotInFrontOfBullets);
    if ( currentPositionStatus === STATUS.ship ) {
      battleHelper.set(BATTLE_PROPS.defenderShotPosition, null);
      return;
    }

    const nextShotPosition = getNextShotPosition({ defenderShotPosition, columns, bulletLength });
    battleHelper.set(BATTLE_PROPS.defenderShotPosition, nextShotPosition);
  }
}

function getNextShotPosition ({ defenderShotPosition, columns, bulletLength }) {
  const newBulletPos = defenderShotPosition - columns*bulletLength;
  const moreBoardToGo = newBulletPos / columns > 0;
  return moreBoardToGo ? newBulletPos : null;
}

function buildBullet ({ screenHelper, bulletStartPosition }) {
  const { coordinateStatus, screenSettings } = screenHelper;
  const { bulletLength, columns } = screenSettings;
  for (let  i = 0; i < bulletLength; i++) {
    const bulletPosition = bulletStartPosition + i*columns;
    coordinateStatus.setStatus(bulletPosition, STATUS.defenderShot);
  }
}
