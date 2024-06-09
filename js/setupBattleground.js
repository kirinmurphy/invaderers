import { buildEntity } from "./helpers/buildEntity.js";
import { BATTLE_PROPS } from "./helpers/getBattleHelper.js";
import { STATUS } from "./helpers/constants.js";
import { buildInvaderFleet } from "./invaders/buildInvaderFleet.js";

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
  buildEntity({ screenHelper, position: newPos, entityStatus: STATUS.defender });  
};
