import { BATTLE_PROPS } from "../helpers/getBattleHelper.js";

const BULLET_DISTANCE = 3;

export function defenderDefend ({ screenHelper }) {
  const { battleHelper, screenSettings, mapObservers } = screenHelper;
  const { shipSize } = screenSettings;
  const { defenderShotPosition, defenderPosition } = battleHelper.get();
  
  const alreadyABulletOnScreen = !!defenderShotPosition;
  if ( alreadyABulletOnScreen ) { return; }
  const bulletStartPos = getBulletStartPos({ defenderPosition, mapObservers, shipSize });
  battleHelper.set(BATTLE_PROPS.defenderShotPosition, bulletStartPos);
}

function getBulletStartPos ({ defenderPosition, mapObservers, shipSize }) {
  const { getCell } = mapObservers;
  const middleOfShip = Math.floor(shipSize/2);
  const shipTurretPos = defenderPosition + middleOfShip;
  return getCell.above(shipTurretPos, { distance: BULLET_DISTANCE });
}
