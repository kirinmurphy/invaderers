import { COLORS } from './constants.js';
import { getbattleHelper } from './getBattleHelper.js';
import { createCoordinateStatusHelper } from './platform/createCoordinateStatusHelper.js';
import { drawCanvas } from './platform/drawCanvas.js';

export function getScreenHelper ({ containerId }) {
  const canvas = document.getElementById(containerId);
  const screenSettings = getScreenSettings({ canvas });

  const coordinateStatus = createCoordinateStatusHelper();
  
  const battleHelper = getbattleHelper({ screenSettings });

  const updateScreen = () => { 
    drawCanvas({ canvas, screenHelper, colors: COLORS });
  }

  const resetGame = () => {
    changeDirection(starterDirection);
    coordinateStatus.resetStatus();
  };

  const screenHelper = {
    screenSettings,
    coordinateStatus,
    battleHelper,
    updateScreen,
    resetGame,
  };
  
  return screenHelper;
}

function getScreenSettings ({ canvas }) {
  const rows = Number(canvas.getAttribute('rows'));
  const columns = Number(canvas.getAttribute('columns'));

  const settings = { 
    rows, 
    columns, 
    cellCount: rows * columns, 
    cellWidth: canvas.width / columns,
    cellHeight: canvas.height / rows,
    shipColumns: Number(canvas.getAttribute('shipColumns')), 
    shipRows: Number(canvas.getAttribute('shipRows')), 
    shipSize: Number(canvas.getAttribute('shipSize')), 
    shipOffset: Number(canvas.getAttribute('shipOffset')),
    bulletLength: 3,
  };

  settings.shipJump = settings.shipOffset+settings.shipRows;

  return settings;
}
