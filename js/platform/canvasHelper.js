import { initializeCanvas } from "./initializeCanvas.js";

let canvasHelper;

export function createCanvasHelper (props) {
  canvasHelper = initializeCanvas(props);
};

export function useCanvasHelper() {
  return canvasHelper;
};
