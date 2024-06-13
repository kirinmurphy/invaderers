import { bindDefenderActions } from './defender/defenderActions.js';
import { bindRestart } from './endGame.js';
import { initScreenHelper } from './helpers/getScreenHelper.js';
import { startGame } from './startGame.js';

initScreenHelper({ containerId: 'canvas' });
bindRestart({ containerId: 'restart' });
bindDefenderActions();
startGame();
