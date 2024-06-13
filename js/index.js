import { bindDefenderActions } from './defender/defenderActions.js';
import { setupGame } from './helpers/setupGame.js';
import { startGame } from './startGame.js';
import { bindRestart } from './endGame.js';

setupGame({ containerId: 'canvas' });
bindRestart({ containerId: 'restart' });
bindDefenderActions();
startGame();
