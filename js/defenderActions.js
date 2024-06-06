import { DIRECTIONS, STATUS } from './constants.js';
import { BATTLE_PROPS } from './getBattleHelper.js';
import { buildShip } from './setupBattleground.js';

export function bindDefenderActions({ screenHelper }) {

  document.addEventListener('keydown', function(event) {
    // console.log('Key pressed:', event.key);
    switch (event.key) {
      case 'ArrowLeft':
        moveDefender({ screenHelper, direction: DIRECTIONS.left });
        break;
      case 'ArrowRight':
        moveDefender({ screenHelper, direction: DIRECTIONS.right });
        break;
      case ' ':
        defendYoself({ screenHelper });
        break;
      default:
        // console.log('Other key pressed');
        break;
    }
  });
}

const moveDefenderConfig = {
  [DIRECTIONS.left]: {
    canMove: ({ position, columns }) => position % columns > 1,
    setNewPos: ({ position }) => position-3
  },
  [DIRECTIONS.right]: {
    canMove: ({ position, columns }) => position % columns < columns-1,
    setNewPos: ({ position }) => position+3
  }
}

function moveDefender ({ screenHelper, direction }) {
  const { battleHelper, screenSettings, coordinateStatus } = screenHelper;
  const { columns } = screenSettings;
  const position = battleHelper.get(BATTLE_PROPS.defenderPosition);
  const canMove = moveDefenderConfig[direction].canMove({ position, columns });
  if ( canMove ) {
    coordinateStatus.clearStatus(STATUS.defender);
    const newPos = moveDefenderConfig[direction].setNewPos({ position });
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
