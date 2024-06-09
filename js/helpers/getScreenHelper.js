import { COLORS } from './constants.js';
import { initializeCanvas } from '../platform/initializeCanvas.js';
import { getBattleHelper } from './getBattleHelper.js';

export function getScreenHelper ({ containerId }) {
  // initializeCanvas returns
  // screenSettings: default map settings, extended by bindCustomSettings
  // mapCoordinates: coordinate helper to get/set properties of game map 
  // mapObservers: helper methods to get relative coordinates of game map
  // updateScreen: redraws map with whatever properties in mapCoordinates 
  // ... and all properties returned by bindCustomHelpers 
  return initializeCanvas({ 
    containerId, 
    fillColors: COLORS, 
    bindCustomSettings,
    bindCustomHelpers
  });
}

function bindCustomSettings (canvas) { 
  const shipOffset = Number(canvas.getAttribute('shipOffset'));
  return {
    shipColumns: Number(canvas.getAttribute('shipColumns')), 
    shipRows: Number(canvas.getAttribute('shipRows')), 
    shipSize: Number(canvas.getAttribute('shipSize')), 
    shipOffset: shipOffset,
    shipJump: shipOffset + Number(canvas.getAttribute('shipRows')),
    bulletLength: 3,
  } 
};

function bindCustomHelpers (initCanvasProps) {
  const { screenSettings, mapObservers } = initCanvasProps;
  const battleHelper = getBattleHelper({ screenSettings, mapObservers });
  return { battleHelper };
};
