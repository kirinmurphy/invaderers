import { createCoordinateStatusHelper } from './createCoordinateStatusHelper.js';
import { getMapObservers } from './getMapObservers.js';
import { drawCanvas } from './drawCanvas.js';
import { getScreenSettings } from './getScreenSettings.js';

export function initializeCanvas(props) {
  const { 
    containerId, 
    fillColors, 
    bindCustomSettings, 
    bindCustomHelpers 
  } = props;  

  const canvas = document.getElementById(containerId);

  const screenSettings = getScreenSettings({ canvas, bindCustomSettings });

  const mapCoordinates = createCoordinateStatusHelper();

  const mapObservers = getMapObservers({ screenSettings });

  const updateScreen = () => { 
    drawCanvas({ canvas, screenSettings, mapCoordinates, fillColors });
  };

  const resetGame = () => { mapCoordinates.resetStatus(); };  

  const initCanvasProps = { 
    screenSettings, 
    mapCoordinates, 
    mapObservers, 
    updateScreen,
    resetGame
  };

  const customHelpers = !!bindCustomHelpers 
    ? bindCustomHelpers(initCanvasProps) 
    : {};

  return { ...initCanvasProps, ...customHelpers };
}
