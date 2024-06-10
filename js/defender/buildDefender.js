import { buildEntity } from "../helpers/buildEntity.js";
import { STATUS } from "../helpers/constants.js";

export function buildDefender ({ screenHelper, newPos }) {
  buildEntity({ 
    screenHelper, 
    position: newPos, 
    entityStatus: STATUS.defender,
  });
}
