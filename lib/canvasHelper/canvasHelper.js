import { initializeCanvas } from "./initializeCanvas.js";

const canvasHelpers = {};

export function createCanvasHelper (props) {
  const { containerId } = props;
  const idAvailable = !canvasHelpers[containerId];
  if ( idAvailable ) { 
    canvasHelpers[containerId] = initializeCanvas(props); 
  } else { 
    console.error(`cannot create two canvases with the same id: ${containerId}`); 
  }
};

export function useCanvasHelper({ id }) {
  return canvasHelpers[id];
};
