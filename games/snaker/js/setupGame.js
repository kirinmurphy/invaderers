import { createCanvasHelper } from "../../../lib/canvasHelper/index.js";
import { COLORS, DIRECTIONS } from "./constants.js";
import { getGameHelper } from "./getGameHelper.js";

export function setupGame ({ containerId }) {

  const starterDirection = DIRECTIONS.right;

  const bindCustomHelpers = ({ screenSettings }) => {
    const gameHelper = getGameHelper({ starterDirection, screenSettings });
    return { gameHelper };
  }
  
  const onReset = ({ gameHelper }) => {
    const { changeDirection } = gameHelper;
    changeDirection(starterDirection);
    gameHelper.resetGame();
  };  

  createCanvasHelper({
    containerId, 
    fillColors: COLORS, 
    bindCustomHelpers,
    onReset, 
  });
}
