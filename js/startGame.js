import { STATUS } from "./helpers/constants.js";
import { BATTLE_PROPS } from "./helpers/getBattleHelper.js";
import { buildInvaderFleet } from "./invaders/buildInvaderFleet.js";
import { setNextFleetStartPosition } from "./invaders/setNextFleetStartPosition.js";
import { checkForDefenderShot } from "./defender/checkForDefenderShot.js";
import { invaderAttack } from "./invaders/invaderAttack.js";
import { setupBattleground } from "./setupBattleground.js";
import { ScreenHelper } from "./platform/ScreenHelper.js";

export function startGame() {
  const { battleHelper, updateScreen } = ScreenHelper.get();
  const { increment, get } = battleHelper;
  
  setupBattleground();

  // let shipColor;

  const animate = () => {
    const { invaderVelocityOffset, gameOutcome } = get();

    increment(BATTLE_PROPS.tick);
    const tick = get(BATTLE_PROPS.tick);

    // shipColor = getNextRGBColor({ shipColor });
    if (tick % invaderVelocityOffset === 1) { moveFleet(); } 
    if (tick % 2 == 0) { checkForDefenderShot(); }
    invaderAttack();

    updateScreen();

    if ( !gameOutcome ) { requestAnimationFrame(animate); }
  };
  requestAnimationFrame(animate);
}


function moveFleet () {
  const { mapCoordinates } = ScreenHelper.get();
  mapCoordinates.clearStatus(STATUS.ship);
  setNextFleetStartPosition();
  buildInvaderFleet();
}

// if (tick % invaderVelocityOffset === 1) { invaderAttack({ screenHelper }); }
// TODO:  accelerate fleet speed
// if ( tick % 200 === 0 ) {
//   const newOffset = invaderVelocityOffset > 10 ? invaderVelocityOffset - 10 : 1;
//   console.log('newOffset',invaderVelocityOffset,  newOffset)
//   console.log(tick % invaderVelocityOffset);
//   set(BATTLE_PROPS.invaderVelocityOffset, Math.ceil(newOffset)); 
// }       
