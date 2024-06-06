import { DIRECTIONS } from "./constants.js";
import { BATTLE_PROPS } from "./getBattleHelper.js";

export function setNextFleetStartPosition ({ screenHelper }) {
  const { screenSettings, battleHelper } = screenHelper;
  const { columns } = screenSettings;
  const { atRightEdge, atLeftEdge, direction } = battleHelper.get();
    
  const pivotLeft = direction === DIRECTIONS.right && atRightEdge;
  const pivotRight = direction === DIRECTIONS.left && atLeftEdge;
  
  if ( direction === DIRECTIONS.right && !pivotLeft ) { 
    battleHelper.increment(BATTLE_PROPS.deployPosition);
  }
  
  if ( direction === DIRECTIONS.left && !pivotRight ) { 
    battleHelper.decrement(BATTLE_PROPS.deployPosition);
  }
  
  if ( pivotLeft || pivotRight ) {
    const newPos = battleHelper.get(BATTLE_PROPS.deployPosition) + columns*4;
    battleHelper.set(BATTLE_PROPS.deployPosition, newPos);
    battleHelper.set(BATTLE_PROPS.atRightEdge, false);      
    battleHelper.set(BATTLE_PROPS.atLeftEdge, false);
    
    if ( pivotLeft ) {
      battleHelper.set(BATTLE_PROPS.direction, DIRECTIONS.left);  
    }
    
    if ( pivotRight ) {
      battleHelper.set(BATTLE_PROPS.direction, DIRECTIONS.right);  
    }
  }  
}