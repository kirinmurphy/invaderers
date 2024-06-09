import { bindDefenderActions } from './defender/defenderActions.js';
import { bindRestart } from './endGame.js';
import { getScreenHelper } from './helpers/getScreenHelper.js';
import { setupBattleground } from './setupBattleground.js';
import { startGame } from './startGame.js';

(function () {
  const screenHelper = getScreenHelper({ containerId: 'canvas' }); 
  bindRestart({ containerId: 'restart', screenHelper });
  setupBattleground({ screenHelper });
  bindDefenderActions({ screenHelper });
  startGame({ screenHelper });
})();
