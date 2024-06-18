import { buildEntity } from "../helpers/buildEntity.js";
import { STATUS } from "../helpers/constants.js";

export function buildDefender ({ newPos }) {
  buildEntity({ 
    position: newPos, 
    entityStatus: STATUS.defender,
  });
}
