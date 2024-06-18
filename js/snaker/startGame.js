import { moveSnake } from "./moveSnake.js";
import { useSnakerHelper } from "./useSnakerHelper.js";

export function startGame () {
  const { screenSettings } = useSnakerHelper();
  const starterPosition = getStarterPosition({ screenSettings });
  setStarterPosition({ starterPosition })
  moveSnake({ lastPosition: starterPosition });  
}

function getStarterPosition ({ screenSettings }) {
  const { rows, columns } = screenSettings;
  return Math.floor(rows/2)*columns + Math.floor(columns/2);  
}

function setStarterPosition ({ starterPosition }) {
  const { mapCoordinates, updateScreen } = useSnakerHelper();
  mapCoordinates.setStatus({ position: starterPosition, status: 'active' });
  updateScreen();    
}
