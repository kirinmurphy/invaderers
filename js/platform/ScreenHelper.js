import { initializeCanvas } from "./initializeCanvas.js";

let screenHelper;

export const ScreenHelper = {
  init: (props) => screenHelper = initializeCanvas(props),
  get: () => screenHelper,
}
