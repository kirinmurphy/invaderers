import { BATTLE_PROPS } from "./helpers/getBattleHelper.js";
import { buildInvaderFleet } from "./invaders/buildInvaderFleet.js";
import { buildDefender } from "./defender/buildDefender.js";
import { useInvadererHelper } from "./helpers/useInvadererHelper.js";

export function setupBattleground () {
  const { battleHelper, updateScreen } = useInvadererHelper();
  const fleetStartPosition = battleHelper.get(BATTLE_PROPS.fleetStartPosition);
  buildInvaderFleet({ fleetStartPosition });
  setupDefender();  
  updateScreen();
}

function setupDefender () {
  const { battleHelper } = useInvadererHelper();
  const newPos = battleHelper.get('defenderPosition');
  buildDefender({ newPos });
};

