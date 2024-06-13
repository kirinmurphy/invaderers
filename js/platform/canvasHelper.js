import { initializeCanvas } from "./initializeCanvas.js";

const canvasHelpers = {};

export function createCanvasHelper (props) {
  const { containerId } = props;
  canvasHelpers[containerId] = initializeCanvas(props);
};

export function useCanvasHelper({ id }) {
  return canvasHelpers[id];
};
