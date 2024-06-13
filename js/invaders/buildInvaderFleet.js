import { getRandomizedIndexCollection } from "../platform/getRandomizedIndexCollection.js";
import { buildEntity } from "../helpers/buildEntity.js";
import { STATUS } from "../helpers/constants.js";
import { BATTLE_PROPS } from "../helpers/getBattleHelper.js";
import { ScreenHelper } from "../platform/ScreenHelper.js";

export function buildInvaderFleet () {
  const { screenSettings, battleHelper, mapObservers } = ScreenHelper.get();
  const { shipColumns, totalShips, shipSize, shipJump, shotsPerFrame } = screenSettings;
  const { getNextEntityPosition, isAt } = mapObservers;
  const { deployPosition, deadBois } = battleHelper.get();
  
  const randomShooterSet = getRandomizedIndexCollection({ 
    totalCount: totalShips, returnCount: shotsPerFrame
  });
  
  const allKilled = deadBois.size === totalShips;

  if ( allKilled ) {
    battleHelper.endGame({ gameOutcome: 'won' });
  }

  for (let index = 0; index < totalShips; index++ ) {
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
        position: newPos, 
        entityStatus: STATUS.ship, 
        statusIndex: index 
      });
    }
  }

  battleHelper.addShooters({ randomShooterSet });
}
