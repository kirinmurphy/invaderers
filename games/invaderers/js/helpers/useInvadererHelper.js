import { useCanvasHelper } from "../../../../lib/canvasHelper/index.js";
import { CANVAS_ID } from "./constants.js";

export function useInvadererHelper () {
  return useCanvasHelper({ id: CANVAS_ID });
}
