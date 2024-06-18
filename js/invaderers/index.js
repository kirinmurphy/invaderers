import { bindDefenderActions } from './defender/defenderActions.js';
import { setupGame } from './helpers/setupGame.js';
import { startGame } from './startGame.js';
import { bindRestart } from './endGame.js';
import { CANVAS_ID } from './helpers/constants.js';

export function playInvaderers () {
  setupGame({ containerId: CANVAS_ID });
  bindRestart({ containerId: 'restart' });
  bindDefenderActions();
  startGame();  
}
