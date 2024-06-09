import { addShipToFleet } from "./addShipToFleet.js";
import { getRandomizedIndexCollection } from "../platform/getRandomizedIndexCollection.js";

const SHOTS_PER_FRAME = 3;

export function buildInvaderFleet ({ screenHelper }) {
  const { screenSettings, battleHelper } = screenHelper;
  const { shipRows, shipColumns } = screenSettings;
  const { deadBois } = battleHelper.get();
  
  const totalCount = shipRows*shipColumns;

  const randomShooterSet = getRandomizedIndexCollection({ 
    totalCount: totalCount, returnCount: SHOTS_PER_FRAME 
  });  
  
  for (let index = 0; index < totalCount; index++ ) {
    if ( deadBois.has(index) ) {
      if ( randomShooterSet.has(index) ) { randomShooterSet.delete(index); } 
    } else {
      addShipToFleet({ screenHelper, index });
    }
  }

  battleHelper.addShooters({ randomShooterSet });
}
