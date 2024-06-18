import { bindDefenderActions } from './defender/defenderActions.js';
import { setupGame } from './helpers/setupGame.js';
import { startGame } from './startGame.js';
import { bindInvaderersRestart } from './bindInvadersRestart.js';
import { CANVAS_ID } from './helpers/constants.js';

setupGame({ containerId: CANVAS_ID });
bindInvaderersRestart({ containerId: CANVAS_ID });
bindDefenderActions();
startGame();
