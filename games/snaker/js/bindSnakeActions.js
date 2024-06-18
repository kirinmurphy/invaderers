import { DIRECTIONS } from "./constants.js";
import { useSnakerHelper } from "./useSnakerHelper.js";

const directionKeypressOptions = { 
  ArrowLeft: DIRECTIONS.left, 
  ArrowRight: DIRECTIONS.right,
  ArrowUp: DIRECTIONS.up,
  ArrowDown: DIRECTIONS.down
};

export function bindSnakeActions () {
  const { gameHelper } = useSnakerHelper();
  const { changeDirection } = gameHelper;

  document.addEventListener('keydown', function(event) {
    const direction = directionKeypressOptions[event.key];
    changeDirection(direction);
  });
}
