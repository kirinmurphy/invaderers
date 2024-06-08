import { DIRECTIONS, STATUS } from './constants.js';
import { BATTLE_PROPS } from './getBattleHelper.js';
import { buildShip } from './setupBattleground.js';

export function bindDefenderActions({ screenHelper }) {

  // document.addEventListener('keydown', event => {
  //   moveAction({ event, screenHelper })
  // });

  document.addEventListener('keydown', (event) => {
    if (event.target.getAttribute('data-last-key') !== event.key) {
      console.log('event', event.key);
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

const moveDistance = 3;
const firstIndex = 1;
const moveDefenderConfig = {
  [DIRECTIONS.left]: {
    canMove: ({ position, columns }) => position % columns > firstIndex,
    getNextPos: ({ position, columns }) => { 
      const nextSpot = position - moveDistance;
      const nextColumnIndex = nextSpot % columns;
      const adjustedOffset = moveDistance - firstIndex - nextColumnIndex;
      const adjustedMoveDistance = nextColumnIndex > firstIndex ? moveDistance : adjustedOffset;
      return position - adjustedMoveDistance;
    }
  },
  [DIRECTIONS.right]: {
    canMove: ({ position, columns, shipSize }) => position % columns < columns-shipSize,
    getNextPos: ({ position, columns, shipSize }) => { 
      const maxIndex = columns - shipSize + firstIndex;
      const nextSpot = position + moveDistance;
      const nextColumnIndex = nextSpot % columns;
      const adjustedOffset = moveDistance - (nextColumnIndex - maxIndex);
      const adjustedMoveDistance = nextColumnIndex < maxIndex ? moveDistance : adjustedOffset;
      return position + adjustedMoveDistance;
    }
  }
}

function moveDefender ({ screenHelper, direction }) {
  const { battleHelper, screenSettings, coordinateStatus } = screenHelper;
  const { columns, shipSize, } = screenSettings;
  const position = battleHelper.get(BATTLE_PROPS.defenderPosition);
  const canMove = moveDefenderConfig[direction].canMove({ position, columns, shipSize });
  if ( canMove ) {
    coordinateStatus.clearStatus(STATUS.defender);
    const newPos = moveDefenderConfig[direction].getNextPos({ position, columns, shipSize });
    battleHelper.set(BATTLE_PROPS.defenderPosition, newPos);
    buildShip({ screenHelper, newPos, shipStatus: STATUS.defender });
  }
};

function defendYoself ({ screenHelper }) {
  const { battleHelper, screenSettings } = screenHelper;
  const { columns, shipSize } = screenSettings;
  const { defenderShotPosition } = battleHelper.get();
  if ( !!defenderShotPosition ) { return; }
  const defenderPosition = battleHelper.get(BATTLE_PROPS.defenderPosition);
  const bulletStartPosition = defenderPosition + Math.floor(shipSize/2) - columns*3;
  battleHelper.set(BATTLE_PROPS.defenderShotPosition, bulletStartPosition);
}
