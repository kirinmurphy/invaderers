import { bindRestart } from "../lib/canvasHelper/bindRestart.js";
import { startGame } from "./startGame.js";
import { useSnakerHelper } from "./useSnakerHelper.js";

export function bindSnakerRestart({ containerId }) {
  const { gameHelper } = useSnakerHelper();
  bindRestart({ 
    containerId, 
    startGame,
    getGameOutcome: () => gameHelper.getGameOutcome()
  });  
};
