import { BATTLE_PROPS } from "./helpers/getBattleHelper.js";
import { buildInvaderFleet } from "./invaders/buildInvaderFleet.js";
import { buildDefender } from "./defender/buildDefender.js";
import { ScreenHelper } from "./platform/ScreenHelper.js";

export function setupBattleground () {
  const { battleHelper, updateScreen } = ScreenHelper.get();
  const fleetStartPosition = battleHelper.get(BATTLE_PROPS.fleetStartPosition);
  buildInvaderFleet({ fleetStartPosition });
  setupDefender();  
  updateScreen();
}

function setupDefender () {
  const { battleHelper } = ScreenHelper.get();
  const newPos = battleHelper.get('defenderPosition');
  buildDefender({ newPos });
};

