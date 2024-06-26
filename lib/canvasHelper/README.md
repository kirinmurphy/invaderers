# codethings-canvas-helper 
**codethings-canvas-helper** is a vanilla js library that provides tools to manipulate a `<canvas>` instance without touching the canvas layer. 

The library expects a canvas html element and exposes several primary methods: 
- **createCanvasHelper**: game setup
- **useCanvasHelper**: acceess properties of the `canvasHelper`
- **endGame**: display game end screen
- **bindRestart**: binds restart logic to DOM elements


# &lt;canvas&gt;
```html
<canvas 
  id="space-invaders"
  width="500"
  height="500"
  rows="100"
  columns="100"
  shipRows="5"
  shipColumns="10"
  shipSize="5"
  shipOffset="3"
  shotsPerFrame="8"
></canvas>
```
- required fields include: `id`, `width`, `height`, `rows`, `columns`.    
- any other fields can be bound to the html element, or defined in `createCanvasHelper`    
- `id` must be unique


# useCanvasHelper
Exposes the properties of the `canvasHelper`, including the custom settings packaged in `createCanvasHelper` (below).    

```javascript
import { useCanvasHelper } from 'codethings-canvas-helper';

const { 
  screenSettings,
  mapCoordinates,
  mapObservers,
  updateScreen,
  resetGame, 
  someCustomHelper,
  someOtherCustomHelper
} = useCanvasHelper({ id: 'space-invaders' });
```


| **Property/Method**         | **Description**                                                                                                       |
|----------------------|---------------------------------------------------------------------------------------------------------------------- |
| **screenSettings**   | Stores all config settings for the game                                                                               |
| **mapCoordinates**   | CRUD actions and helpers for canvas grid coordinates. Each coordinate is an index `rows*columns`.                     |
| **mapObservers**     | Helper methods to find coordinates on the map, with access to `screenSettings`                                         |
| **updateScreen**     | Executes redraw of canvas screen with coordinates in `mapCoordinates`. Usually used within `requestAnimationFrame`.    |
| **resetGame**        | Resets `mapCoordinates` and fires optional `onReset` callback in `createCanvasHelper` initializer                      |
| **someCustomHelper** | All other custom game helpers in `createCanvasHelper` are also available                                              |




# wrapping useCanvasHelper 
avoid repetition/inconsistency by wrapping useCanvasHelper with a specific id 
```javascript
import { useCanvasHelper } from 'codethings-canvas-helper';
import { CANVAS_ID } from '../somewhere';

export function useSpecificGameHelper () {
  return useCanvasHelper({ id: CANVAS_ID });
}
```


# createCanvasHelper
Initializes the library with the custom elements of the game. 

**note:** `createCanvasHelper()` must be initialized before `useCanvasHelper` gets called.  

```javascript
import { createCanvasHelper } from 'codethings-canvas-helper'

const CANVAS_ID = 'space-invaders';

// all possible status types of map coordinates
export const STATUS = {
  active: 'active',
  visited: 'visited',
  ship: 'ship',
  defender: 'defender',
  defenderShot: 'defenderShot',
  invaderShot: 'invaderShot',
}

// canvas fill colors for all status types 
export const COLORS = {
  [STATUS.active]: '#fff',
  [STATUS.visited]: '#aaa',
  [STATUS.ship]: '#ff6',
  [STATUS.defender]: '#fff',
  [STATUS.defenderShot]: 'orange',
  [STATUS.invaderShot]: 'red',
  default: '#000'  // map background (required)
};

export function setupGame () {
  createCanvasHelper({
    containerId: CANVAS_ID,
    fillColors: COLORS, 
    bindCustomSettings,
    bindCustomHelpers,
    onReset
  });
}

// custom properties bound to the canvas element to keep everything in one place
// alternatively anything here could just be set directly 
// these properties will be available on useCanvasHelper({ id }).screenSettings;
function bindCustomSettings (canvas) { 
  const shipRows = Number(canvas.getAttribute('shipRows'));
  const shipColumns = Number(canvas.getAttribute('shipColumns'));

  return {
    shipRows,
    shipColumns,
    totalShips: shipRows*shipColumns,
    shipSize: Number(canvas.getAttribute('shipSize')), 
    shipOffset: shipOffset,
    ...
  } 
};

// add any other custom helpers specific to this game 
// usually will want to make at least a state manager for the game status
// these properties will be available on useCanvasHelper({ id }) 
function bindCustomHelpers (initCanvasProps) {
  const { screenSettings, mapObservers } = initCanvasProps;
  const battleHelper = getBattleHelper({ screenSettings, mapObservers });
  return { battleHelper };
};

// on reset exposes all the properties of useCanvasHelper, 
// including the customHelpers bound in bindCustomHelpers 
function onReset({ battleHelper }) {
  battleHelper.resetGame();
}
```

# mapCoordinates 
Map coordinates currently store a `status` and `statusIndex` for each coordinate.    

The `status`, reflected in the `fillColors` map (above), reflects the color assigned to the coordinate.     
The `statusIndex` is an meta identifier that identifies elements within a scope of a specific status 

| Method                         | Description                                                                 |
|----------------------------------|-----------------------------------------------------------------------------|
| getStatus                        | Retrieves the status of a coordinate.                                          |
| setStatus                        | Sets the status and optional status index for a coordinate.                   |
| getStatusIndex                   | Retrieves the status index of a coordinate.                                    |
| hasStatus                        | Checks if a coordinate has a status.                                           |
| clearStatus                      | Clears all coordinates with the specified status.                              |
| resetStatus                      | Resets the status map to its initial state.                                  |
| getFinalCount                    | Returns the count of coordinates with the specified status.                    |
| clearAllPositionsWithStatusIndex | Clears all coordinates with the specified status index.                       |

**TODO:** remap `rows*columns` index to an `x:y` string, would simplify some of the coordinate calculations like in `mapObservers` below.


# mapObservers 
Collection of helpers that will find speicifc coordinates on the map 

| Method                 | Description                                                                 |
|--------------------------|-----------------------------------------------------------------------------|
| getCell\[position\]      | Gets cell positions relative to the current position (`above`, `below`, `toTheLeft`, `toTheRight`).  |
| isAt\[position\]         | Check if a position is at a specific edge or row (`topRow`, `bottomRow`, `rightEdge`, `leftEdge`).   |
| isAtOrOver\[position\]   | Check if a position is at or over the bottom row. (same positions as `isAt`)                          |
| getColumnIndex           | Gets the column index of a given position.                                  |
| getNextEntityPosition    | Calculates the next position of an entity based on its current position.    |
| getRowByMapPercentage    | Gets the row index based on a percentage offset from the top of the map.    |
| getPositionByCoordinates | Converts row and column coordinates to a single position value.             |
| getCenteredLeftOffset    | Calculates the left offset to center an entity on the map.        |
| getMaxColumnIndex        | Gets the maximum column index for an entity of a given size.                |

# endGame
Include a `#restart` element somewhere on the page, with a single restart button.    
Optional outcome html elements can be included `outcome-status` and `score`.          

```html 
<div id="restart">
  <div class="inner">
    <div class="outcome-status won-addl" style="display:none">
      <!-- SUCCECSS CONTENT -->
    </div>
    
    <div class="outcome-status lost-addl" style="display:none">
      <!-- LOST CONTENT -->
    </div>
    
    <div class="score">
      <span class="count"></span> points
    </div>

    <button type="button">Play Again</button>      
  </div>
</div>
```

```javascript
import { endGame } from "../../lib/canvasHelper/endGame.js";

endGame({ points: 100, gameOutcome: 'won' });
```

# bindRestart
depends on the same `#restart` element being present with singe button element


```javascript
import { bindRestart } from "../../lib/canvasHelper/bindRestart.js";

bindRestart({ 
  containerId: 'invaderers',
  startGame: () => someMethodToStartGame(),
  getGameOutcome: () => gameHelper.getGameOutcome()
});
```