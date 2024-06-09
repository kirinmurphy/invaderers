import { DIRECTIONS } from "./constants.js";

const OFFSET_TOP_PERCENTAGE_DEFENDER = 90;
const OFFSET_TOP_PERCENTAGE_INVADER_FLEET = 10;

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

export function getBattleHelper ({ screenSettings, mapObservers }) {  
  const battleState = {
    [BATTLE_PROPS.tick]: 0,
    [BATTLE_PROPS.deployPosition]: getFleetGameStartPosition({ screenSettings, mapObservers }),
    [BATTLE_PROPS.defenderPosition]: getDefenderGameStartPosition({ screenSettings, mapObservers }),
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
  const topOffsetPercent = OFFSET_TOP_PERCENTAGE_DEFENDER;
  return getStartPosition({ 
    screenSettings, 
    mapObservers, 
    topOffsetPercent, 
    entityOffset: shipSize 
  });
}

function getFleetGameStartPosition ({ screenSettings, mapObservers }) {
  const topOffsetPercent = OFFSET_TOP_PERCENTAGE_INVADER_FLEET;
  return getStartPosition({ screenSettings, mapObservers, topOffsetPercent });
}

function getStartPosition (props) {
  const { screenSettings, mapObservers, topOffsetPercent, entityOffset = 0 } = props;
  const { getRowByMapPercentage, getPositionByCoordinates } = mapObservers;
  const starterRow = getRowByMapPercentage({ topOffsetPercent, entityOffset });
  const starterColumn = getInvaderStarterColumn({ screenSettings, mapObservers });
  return getPositionByCoordinates({ row: starterRow-1, column: starterColumn });  
}

function getInvaderStarterColumn ({ screenSettings, mapObservers }) {
  const { shipJump, shipColumns, shipOffset } = screenSettings;
  const { getCenteredLeftOffset } = mapObservers;
  const invaderFleetWidth = shipJump*shipColumns-shipOffset-1;
  return getCenteredLeftOffset({ entityColumns: invaderFleetWidth }); 
}
