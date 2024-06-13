import { BATTLE_PROPS } from "./helpers/getBattleHelper.js";
import { buildInvaderFleet } from "./invaders/buildInvaderFleet.js";
import { buildDefender } from "./defender/buildDefender.js";
import { useCanvasHelper } from "./platform/canvasHelper.js";

export function setupBattleground () {
  const { battleHelper, updateScreen } = useCanvasHelper();
  const fleetStartPosition = battleHelper.get(BATTLE_PROPS.fleetStartPosition);
  buildInvaderFleet({ fleetStartPosition });
  setupDefender();  
  updateScreen();
}

function setupDefender () {
  const { battleHelper } = useCanvasHelper();
  const newPos = battleHelper.get('defenderPosition');
  buildDefender({ newPos });
};

