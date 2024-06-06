import { STATUS } from "./constants.js";
import { BATTLE_PROPS } from "./getBattleHelper.js";
import { setNextFleetStartPosition } from "./setNextFleetStartPosition.js";
import { buildFleet } from "./setupBattleground.js";
import { checkForDefenderShot } from "./checkForDefenderShot.js";

export function startGame({ screenHelper }) {
  const { updateScreen, battleHelper } = screenHelper; 
  const { increment, get } = battleHelper;
  
  const invaderVelocityOffset = get(BATTLE_PROPS.invaderVelocityOffset);

  const animate = () => {
    increment(BATTLE_PROPS.tick);
    const tick = get(BATTLE_PROPS.tick);
    if (tick % invaderVelocityOffset === 1) { moveFleet({ screenHelper }); } 
    if (tick % 2 == 0) { checkForDefenderShot({ screenHelper }); }   
    updateScreen();
    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
}

function moveFleet ({ screenHelper }) {
  const { coordinateStatus } = screenHelper;
  coordinateStatus.clearStatus(STATUS.ship);
  setNextFleetStartPosition({ screenHelper });
  buildFleet({ screenHelper });
}
