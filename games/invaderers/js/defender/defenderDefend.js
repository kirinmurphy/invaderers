import { BATTLE_PROPS } from "../helpers/getBattleHelper.js";
import { useInvadererHelper } from "../helpers/useInvadererHelper.js";

const BULLET_DISTANCE = 3;

export function defenderDefend () {
  const { battleHelper, screenSettings, mapObservers } = useInvadererHelper();
  const { shipSize, defenderBulletLength } = screenSettings;
  const { defenderShotPosition, defenderPosition } = battleHelper.get();
  
  const alreadyABulletOnScreen = !!defenderShotPosition;
  if ( alreadyABulletOnScreen ) { return; }
  const bulletStartPos = getBulletStartPos({ defenderPosition, mapObservers, shipSize, defenderBulletLength });
  battleHelper.set(BATTLE_PROPS.defenderShotPosition, bulletStartPos);
}

function getBulletStartPos ({ defenderPosition, mapObservers, shipSize, defenderBulletLength }) {
  const { getCell } = mapObservers;
  const middleOfShip = Math.floor(shipSize/2);
  const shipTurretPos = defenderPosition + middleOfShip;
  return getCell.above(shipTurretPos, { distance: defenderBulletLength });
}
