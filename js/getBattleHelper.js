import { DIRECTIONS } from "./constants.js";

const DEFENDER_GRID_OFFSET_TOP = .9;
const INVADER_GRID_OFFSET_TOP = .1;

export const BATTLE_PROPS = {
  tick: 'tick',
  deployPosition: 'deployPosition',
  defenderPosition: 'defenderPosition',
  direction: 'direction',
  atRightEdge: 'atRightEdge',
  atLeftEdge: 'atLeftEdge',
  invaderVelocityOffset: 'invaderVelocityOffset',
  defenderShotPosition: 'defenderShotPosition',
  deadBois: 'deadBois',
};

export function getBattleHelper (props) {
  const { screenSettings, mapObservers } = props;
  
  const battleState = {
    [BATTLE_PROPS.tick]: 0,
    [BATTLE_PROPS.deployPosition]: getFleetGameStartPosition(props),
    [BATTLE_PROPS.defenderPosition]: getDefenderGameStartPosition(props),
    [BATTLE_PROPS.defenderShotPosition]: null,
    [BATTLE_PROPS.direction]: DIRECTIONS.right,
    [BATTLE_PROPS.atRightEdge]: false,
    [BATTLE_PROPS.atLeftEdge]: false,
    [BATTLE_PROPS.invaderVelocityOffset]: 40,
    [BATTLE_PROPS.deadBois]: new Map(),
  };

  return {
    get: (prop) => { 
      if (prop) return battleState[prop];
      else return { ...battleState };
    },
    set: (prop, value) => battleState[prop] = value,
    increment: (prop) => battleState[prop] = battleState[prop]+1,
    decrement: (prop) => battleState[prop] = battleState[prop]-1,
    addToKillList: (shipIndex) => battleState[BATTLE_PROPS.deadBois].set(shipIndex, true),
  }  
}

function getDefenderGameStartPosition ({ screenSettings, mapObservers }) {
  const { shipSize } = screenSettings;
  const topOffset = DEFENDER_GRID_OFFSET_TOP;
  return getStartPosition({ screenSettings, mapObservers, topOffset, entityOffset: shipSize });
}

function getFleetGameStartPosition ({ screenSettings, mapObservers }) {
  const topOffset = INVADER_GRID_OFFSET_TOP;
  return getStartPosition({ screenSettings, mapObservers, topOffset });
}

function getStartPosition (props) {
  const { screenSettings, mapObservers, topOffset, entityOffset = 0 } = props;
  const { getRowByPercentage, getPositionByCoordinates } = mapObservers;
  const starterRow = getRowByPercentage({ topOffset, entityOffset });
  const starterColumn = getInvaderStarterColumn({ screenSettings, mapObservers });
  return getPositionByCoordinates({ row: starterRow-1, column: starterColumn });  
}

function getInvaderStarterColumn ({ screenSettings, mapObservers }) {
  const { shipJump, shipColumns, shipOffset } = screenSettings;
  const { getCenteredLeftOffset } = mapObservers;
  const invaderFleetWidth = shipJump*shipColumns-shipOffset-1;
  return getCenteredLeftOffset({ entityColumns: invaderFleetWidth }); 
}
