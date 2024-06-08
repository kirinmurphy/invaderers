import { DIRECTIONS, STATUS } from './constants.js';
import { BATTLE_PROPS } from './getBattleHelper.js';
import { buildShip } from './setupBattleground.js';

const BULLET_DISTANCE = 3;

export function bindDefenderActions({ screenHelper }) {
  document.addEventListener('keydown', (event) => {
    if (event.target.getAttribute('data-last-key') !== event.key) {
      event.target.setAttribute('data-last-key', event.key);
      initMoveAction({ event, screenHelper });
    }
  });
  
  document.addEventListener('keyup', (event) => {
    if (event.target.getAttribute('data-last-key') === event.key) {
      event.target.setAttribute('data-keydown', 'none');
      event.target.removeAttribute('data-last-key');
    }
  });

  document.addEventListener('keydown', function(event) {
    if ( event.key === ' ' ) {
      defendYoself({ screenHelper });
    }
  });
}

function initMoveAction (props) {
  const { event } = props;
  const { key } = event;
  moveAction(props);
  event.target.setAttribute('data-keydown', key);
  const repeatAction = () => {
    if (event.target.getAttribute('data-keydown') === key) {
      moveAction(props);
      setTimeout(repeatAction, 50); // Adjust timeout as needed
    }
  };
  setTimeout(repeatAction, 50);
};

// function moveAction (event) {
//   switch (event.key) {
//     case 'ArrowLeft':
//       moveDefender({ screenHelper, direction: DIRECTIONS.left });
//       break;
//     case 'ArrowRight':
//       moveDefender({ screenHelper, direction: DIRECTIONS.right });
//       break;
//     default:
//       break;
//   }
// }

const directionOptions = { ArrowLeft: DIRECTIONS.left, ArrowRight: DIRECTIONS.right };
function moveAction ({ event: { key }, screenHelper }) {
  const direction = directionOptions[key];
  !!direction && moveDefender({ screenHelper, direction });
}

const firstIndex = 1;
const moveDefenderConfig = {
  [DIRECTIONS.left]: {
    canMove: ({ mapObservers: { isAtLeftEdge }, position }) => { 
      return !isAtLeftEdge({ newPos: position, firstIndex });
    },
    getNextPos: ({ position, mapObservers }) => { 
      const { getCell, getColumnIndex } = mapObservers; 
      const nextSpot = getCell.toTheLeft(position, { distance: BULLET_DISTANCE });
      const nextColumnIndex = getColumnIndex({ position: nextSpot });
      const adjustedOffset = BULLET_DISTANCE - firstIndex - nextColumnIndex;
      const adjustedDistance = nextColumnIndex > firstIndex ? BULLET_DISTANCE : adjustedOffset;
      return position - adjustedDistance;
    }
  },
  [DIRECTIONS.right]: {   
    canMove: ({ mapObservers: { isAtRightEdge }, position, shipSize }) => { 
      return !isAtRightEdge({ newPos: position, itemOffset:shipSize });
    },
    getNextPos: ({ position, mapObservers, shipSize }) => {
      const { getCell, getColumnIndex, getMaxColumnIndex } = mapObservers; 
      const maxIndex = getMaxColumnIndex({ entitySize: shipSize });
      const nextSpot = getCell.toTheRight(position, { distance: BULLET_DISTANCE });
      const nextColumnIndex = getColumnIndex({ position: nextSpot });
      const adjustedOffset = BULLET_DISTANCE - (nextColumnIndex - maxIndex);
      const adjustedMoveDistance = nextColumnIndex < maxIndex ? BULLET_DISTANCE : adjustedOffset;
      return position + adjustedMoveDistance;
    }
  }
}

function moveDefender ({ screenHelper, direction }) {
  const { battleHelper, screenSettings, coordinateStatus, mapObservers } = screenHelper;
  const { shipSize } = screenSettings;
  const position = battleHelper.get(BATTLE_PROPS.defenderPosition);
  const canMove = moveDefenderConfig[direction].canMove({ mapObservers, position, shipSize });
  if ( canMove ) {
    coordinateStatus.clearStatus(STATUS.defender);
    const directionConfig = moveDefenderConfig[direction];
    const newPos = directionConfig.getNextPos({ position, shipSize, mapObservers });
    battleHelper.set(BATTLE_PROPS.defenderPosition, newPos);
    buildShip({ screenHelper, newPos, shipStatus: STATUS.defender });
  }
};

function defendYoself ({ screenHelper }) {
  const { battleHelper, screenSettings, mapObservers } = screenHelper;
  const { getCell } = mapObservers;
  const { shipSize } = screenSettings;
  const { defenderShotPosition } = battleHelper.get();
  const alreadyABulletOnScreen = !!defenderShotPosition;
  if ( alreadyABulletOnScreen ) { return; }
  const defenderPosition = battleHelper.get(BATTLE_PROPS.defenderPosition);
  const middleOfShip = Math.floor(shipSize/2);
  const shipTurretPos = defenderPosition + middleOfShip;
  const bulletStartPos = getCell.above(shipTurretPos, { distance: BULLET_DISTANCE });
  battleHelper.set(BATTLE_PROPS.defenderShotPosition, bulletStartPos);
}
