import { getRandomizedIndexCollection } from "../platform/getRandomizedIndexCollection.js";
import { buildEntity } from "../helpers/buildEntity.js";
import { STATUS } from "../helpers/constants.js";
import { BATTLE_PROPS } from "../helpers/getBattleHelper.js";

const SHOTS_PER_FRAME = 10;

export function buildInvaderFleet ({ screenHelper }) {
  const { screenSettings, battleHelper, mapObservers } = screenHelper;
  const { shipRows, shipColumns, shipSize, shipJump } = screenSettings;
  const { getNextEntityPosition, isAt } = mapObservers;
  const { deployPosition, deadBois } = battleHelper.get();
  
  const totalCount = shipRows*shipColumns;

  const randomShooterSet = getRandomizedIndexCollection({ 
    totalCount: totalCount, returnCount: SHOTS_PER_FRAME 
  });
  
  for (let index = 0; index < totalCount; index++ ) {
    if ( deadBois.has(index) ) {
      if ( randomShooterSet.has(index) ) { randomShooterSet.delete(index); } 

    } else {
      const newPos = getNextEntityPosition({ 
        currentPos: deployPosition,
        index, 
        entityColumns: shipColumns,
        itemOffset: shipJump
      }); 
      
      if ( randomShooterSet.has(index) ) {
        randomShooterSet.set(index, newPos);
      }

      const atRightEdge = isAt.rightEdge({ newPos, itemOffset: shipSize });
      if ( atRightEdge ) { battleHelper.set(BATTLE_PROPS.atRightEdge, true); }
      const atLeftEdge = isAt.leftEdge({ newPos });
      if ( atLeftEdge ) { battleHelper.set(BATTLE_PROPS.atLeftEdge, true); }
    
      buildEntity({ 
        screenHelper, 
        position: newPos, 
        entityStatus: STATUS.ship, 
        statusIndex: index 
      });
    }
  }

  battleHelper.addShooters({ randomShooterSet });
}
