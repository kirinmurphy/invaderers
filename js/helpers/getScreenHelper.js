import { COLORS } from './constants.js';
import { initializeCanvas } from '../platform/initializeCanvas.js';
import { getBattleHelper } from './getBattleHelper.js';

export function getScreenHelper ({ containerId }) {

  return initializeCanvas({ 
    containerId, 
    fillColors: COLORS, 
    bindCustomSettings,
    bindCustomHelpers,
    onReset
  });
}

function bindCustomSettings (canvas) { 
  const shipOffset = Number(canvas.getAttribute('shipOffset'));
  const shipColumns =Number(canvas.getAttribute('shipColumns'));
  const shipRows =Number(canvas.getAttribute('shipRows'));

  return {
    shipRows,
    shipColumns,
    totalShips: shipRows*shipColumns,
    shipSize: Number(canvas.getAttribute('shipSize')), 
    shipOffset: shipOffset,
    shipJump: shipOffset + Number(canvas.getAttribute('shipRows')),
    bulletLength: 3,
    shotsPerFrame: Number(canvas.getAttribute('shotsPerFrame')),
  } 
};

function bindCustomHelpers (initCanvasProps) {
  const { screenSettings, mapObservers } = initCanvasProps;
  const battleHelper = getBattleHelper({ screenSettings, mapObservers });
  return { battleHelper };
};

function onReset({ battleHelper }) {
  battleHelper.resetGame();
}
