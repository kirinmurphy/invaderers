import { bindRestart } from "../../../lib/canvasHelper/bindRestart.js";
import { startGame } from "./startGame.js";
import { useInvadererHelper } from "./helpers/useInvadererHelper.js";

export function bindInvaderersRestart ({ containerId }) {
  const { battleHelper } = useInvadererHelper();
  const getGameOutcome = () => battleHelper.get().gameOutcome;

  bindRestart({ 
    containerId,
    startGame, 
    getGameOutcome
  });
};
