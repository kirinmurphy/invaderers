import { STATUS } from "../helpers/constants.js";
import { BATTLE_PROPS } from "../helpers/getBattleHelper.js";

export function invaderAttack({ screenHelper }) {
  const { screenSettings, battleHelper, mapCoordinates, mapObservers } = screenHelper;
  const { shipSize } = screenSettings; 
  const { get, updateState, clearStateMap, deleteFromState } = battleHelper;
  const { getCell, isAt, isAtOrOver } = mapObservers;
  const { shooters, liveBullets } = get();

  mapCoordinates.clearStatus(STATUS.invaderShot);

  for (const shooterPos of shooters.values()) {
    const distanceOffset = { xDistance: shipSize/2, yDistance: shipSize };
    const shipTurretPos = getCell.at(shooterPos, distanceOffset);
    updateState({ map: BATTLE_PROPS.liveBullets, key: shipTurretPos, value: true });    
  }

  clearStateMap({ map: BATTLE_PROPS.shooters });
  console.log('---------ATTTACCK!!!!', liveBullets.size);

  // Create a duplicate of liveBullets.keys() as an array
  const liveBulletKeys = Array.from(liveBullets.keys());

  for (const bulletPos of liveBulletKeys) {
    deleteFromState({ map: BATTLE_PROPS.liveBullets, key: bulletPos });

    // console.log('----------------------');
    const moreToGo = !isAtOrOver.bottomRow({ newPos: bulletPos });
    // console.log('isAt.bott', bulletPos, moreToGo);
    if (moreToGo) {
      const newPos = getCell.below(bulletPos);
      // Update liveBullets directly
      updateState({ map: BATTLE_PROPS.liveBullets, key: newPos, value: true });
      mapCoordinates.setStatus({ position: newPos, status: STATUS.invaderShot });
      // console.log('moved: ', liveBullets.size, newPos);
    } else {
      console.log('DELETEDDDDDD');
    }
  }
}
