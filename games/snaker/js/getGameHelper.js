import { endGame } from "../../../lib/canvasHelper/endGame.js";
import { DIRECTIONS, ELIGIBLE_DIRECTIONS } from "./constants.js";

export function getGameHelper ({ starterDirection, screenSettings }) {
  const { rows, columns, cellCount } = screenSettings;

  let currentDirection = starterDirection;
  let snakeGameOutcome = null;

  const changeDirection = (direction) => {
    const isValidDirection = DIRECTIONS[direction];
    const isEligible = ELIGIBLE_DIRECTIONS[currentDirection].includes(direction);
    const canChange = isValidDirection && isEligible;
    if ( canChange ) { currentDirection = direction; }
  };

  const getNextPosition = (currentPos) => {
    const nextPosition = {
      right: (currentPos) => {
        const stillMoreToGo = currentPos % rows !== 0;
        return stillMoreToGo ? currentPos + 1 : undefined; 
      },
      left: (currentPos) => {
        const stillMoreToGo = currentPos % rows !== 1;
        return stillMoreToGo ? currentPos - 1 : undefined; 
      }, 
      up: (currentPos) => { 
        // TODO: double check if at the last one 
        const stillMoreToGo = currentPos > columns;
        return stillMoreToGo ? currentPos - columns : undefined; 
      },
      down: (currentPos) => { 
        const stillMoreToGo = currentPos - 1 < (cellCount - columns);
        return stillMoreToGo ? (currentPos + columns) : undefined; 
      },
    };

    return nextPosition[currentDirection](currentPos);
  };

  return { 
    changeDirection, 
    getNextPosition,
    getGameOutcome: () => snakeGameOutcome,
    endGame: ({ gameOutcome, points }) => {
      snakeGameOutcome = gameOutcome;
      endGame({ gameOutcome, points });
    },
    resetGame: () => {
      snakeGameOutcome = null;
      currentDirection = starterDirection;
    }
  };
}
