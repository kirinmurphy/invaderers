import { DIRECTIONS, STATUS } from '../helpers/constants.js';
import { BATTLE_PROPS } from '../helpers/getBattleHelper.js';
import { buildDefender } from './buildDefender.js';

const MOVE_DISTANCE = 3;

export function defenderMove (props) {
  const { event } = props;
  const { key, target } = event;

  moveAction(props);
  target.setAttribute('data-keydown', key);

  const repeatAction = () => {
    if (target.getAttribute('data-keydown') === key) {
      moveAction(props);
      setTimeout(repeatAction, 50); // Adjust timeout as needed
    }
  };

  setTimeout(repeatAction, 50);
};

// function moveAction (event) {
//   switch (event.key) {
//     case 'ArrowLeft':
//       triggerMoveDefender({ screenHelper, direction: DIRECTIONS.left });
//       break;
//     case 'ArrowRight':
//       triggerMoveDefender({ screenHelper, direction: DIRECTIONS.right });
//       break;
//     default:
//       break;
//   }
// }

const directionKeypressOptions = { 
  ArrowLeft: DIRECTIONS.left, 
  ArrowRight: DIRECTIONS.right 
};

function moveAction ({ event: { key }, screenHelper }) {
  const direction = directionKeypressOptions[key];
  !!direction && triggerMoveDefender({ screenHelper, direction });
}

const firstIndex = 1;
const moveDefenderConfig = {
  [DIRECTIONS.left]: {
    canMove: ({ mapObservers: { isAt }, position }) => { 
      return !isAt.leftEdge({ newPos: position, firstIndex });
    },
    getNextPos: ({ position, mapObservers }) => { 
      const { getCell, getColumnIndex } = mapObservers; 
      const nextSpot = getCell.toTheLeft(position, { distance: MOVE_DISTANCE });
      const nextColumnIndex = getColumnIndex({ position: nextSpot });
      const adjustedOffset = MOVE_DISTANCE - firstIndex - nextColumnIndex;
      const adjustedDistance = nextColumnIndex > firstIndex ? MOVE_DISTANCE : adjustedOffset;
      return position - adjustedDistance;
    }
  },
  [DIRECTIONS.right]: {   
    canMove: ({ mapObservers: { isAt }, position, shipSize }) => { 
      return !isAt.rightEdge({ newPos: position, itemOffset:shipSize });
    },
    getNextPos: ({ position, mapObservers, shipSize }) => {
      const { getCell, getColumnIndex, getMaxColumnIndex } = mapObservers; 
      const maxIndex = getMaxColumnIndex({ entitySize: shipSize });
      const nextSpot = getCell.toTheRight(position, { distance: MOVE_DISTANCE });
      const nextColumnIndex = getColumnIndex({ position: nextSpot });
      const adjustedOffset = MOVE_DISTANCE - (nextColumnIndex - maxIndex);
      const adjustedMoveDistance = nextColumnIndex < maxIndex ? MOVE_DISTANCE : adjustedOffset;
      return position + adjustedMoveDistance;
    }
  }
}

function triggerMoveDefender ({ screenHelper, direction }) {
  const { battleHelper, mapObservers, screenSettings } = screenHelper;
  const { shipSize } = screenSettings;
  const currentPos = battleHelper.get(BATTLE_PROPS.defenderPosition);
  const directionConfig = moveDefenderConfig[direction];
  const canMove = directionConfig.canMove({ mapObservers, position: currentPos, shipSize });
  if ( canMove ) { actuallyMoveDefender({ directionConfig, currentPos, screenHelper }); }
};

function actuallyMoveDefender (props) {
  const { directionConfig, currentPos, screenHelper } = props;
  const { mapCoordinates, screenSettings, battleHelper, mapObservers } = screenHelper;
  const { shipSize } = screenSettings;
  mapCoordinates.clearStatus(STATUS.defender);
  const newPos = directionConfig.getNextPos({ position: currentPos, shipSize, mapObservers });
  battleHelper.set(BATTLE_PROPS.defenderPosition, newPos);
  buildDefender({ screenHelper, newPos });
}
