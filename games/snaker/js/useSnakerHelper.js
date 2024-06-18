import { useCanvasHelper } from "../../../lib/canvasHelper/canvasHelper.js";
import { CANVAS_ID } from "./constants.js";

export function useSnakerHelper () {
  return useCanvasHelper({ id: CANVAS_ID });
}
