import { BATTLE_PROPS } from "./helpers/getBattleHelper.js";
import { buildInvaderFleet } from "./invaders/buildInvaderFleet.js";
import { buildDefender } from "./defender/buildDefender.js";

export function setupBattleground ({ screenHelper }) {
  const { battleHelper, updateScreen } = screenHelper;
  const fleetStartPosition = battleHelper.get(BATTLE_PROPS.fleetStartPosition);
  buildInvaderFleet({ screenHelper, fleetStartPosition });
  setupDefender({ screenHelper });  
  updateScreen();
}

function setupDefender ({ screenHelper }) {
  const { battleHelper } = screenHelper;
  const newPos = battleHelper.get('defenderPosition');
  buildDefender({ screenHelper, newPos });
};

