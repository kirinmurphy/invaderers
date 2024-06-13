import { useCanvasHelper } from "../platform/canvasHelper.js";
import { CANVAS_ID } from "./constants.js";

export function useInvadererHelper () {
  return useCanvasHelper({ id: CANVAS_ID });
}
