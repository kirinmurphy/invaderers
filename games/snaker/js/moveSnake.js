import { STATUS_VISITED } from "./constants.js";
import { useSnakerHelper } from "./useSnakerHelper.js";

export function moveSnake ({ lastPosition }) {
  const { mapCoordinates, updateScreen, gameHelper } = useSnakerHelper();
  const { getNextPosition, endGame } = gameHelper;

  const newPos = getNextPosition(lastPosition);

  const notAvailable = newPos === undefined 
    || mapCoordinates.getStatus(newPos) === STATUS_VISITED;

  if ( notAvailable ) {
    const points = mapCoordinates.getFinalCount(STATUS_VISITED);
    endGame({ gameOutcome: 'lost', points });
    return;
  }

  mapCoordinates.setStatus({ position: lastPosition, status: STATUS_VISITED });
  mapCoordinates.setStatus({ position: newPos, status: 'active' });
  updateScreen(); 

  requestAnimationFrame(() => { 
    return moveSnake({ lastPosition: newPos });
  });
}
