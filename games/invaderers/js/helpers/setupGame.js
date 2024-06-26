import { createCanvasHelper } from '../../../../lib/canvasHelper/canvasHelper.js';
import { COLORS } from './constants.js';
import { getBattleHelper } from './getBattleHelper.js';

export function setupGame ({ containerId }) {
  createCanvasHelper({
    containerId, 
    fillColors: COLORS, 
    bindCustomSettings,
    bindCustomHelpers,
    onReset
  });
}

function bindCustomSettings (canvas) { 
  const shipOffset = Number(canvas.getAttribute('shipOffset'));
  const shipColumns = Number(canvas.getAttribute('shipColumns'));
  const shipRows = Number(canvas.getAttribute('shipRows'));

  return {
    shipRows,
    shipColumns,
    totalShips: shipRows*shipColumns,
    shipSize: Number(canvas.getAttribute('shipSize')), 
    shipOffset,
    shipJump: shipOffset + Number(canvas.getAttribute('shipRows')),
    defenderBulletLength: Number(canvas.getAttribute('defenderBulletLength')),
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
