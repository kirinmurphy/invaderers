import { CANVAS_ID } from "./constants.js";
import { bindSnakeActions } from "./bindSnakeActions.js";
import { bindSnakerRestart } from "./bindSnakerRestart.js";
import { setupGame } from "./setupGame.js";
import { startGame } from "./startGame.js";

setupGame({ containerId: CANVAS_ID }); 
bindSnakerRestart({ containerId: CANVAS_ID });
bindSnakeActions();
startGame();
