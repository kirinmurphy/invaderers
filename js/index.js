import { bindDefenderActions } from './defenderActions.js';
import { bindRestart } from './endGame.js';
import { getScreenHelper } from './getScreenHelper.js';
import { setupBattleground } from './setupBattleground.js';
import { startGame } from './startGame.js';

(function () {
  const screenHelper = getScreenHelper({ containerId: 'canvas' }); 
  bindRestart({ containerId: 'restart', screenHelper });
  setupBattleground({ screenHelper });
  bindDefenderActions({ screenHelper });
  startGame({ screenHelper });
})();
