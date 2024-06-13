# codethings-canvas-helper 
**codethings-canvas-helper** is a library that provides tools to manipulate a canvas instance without touching the canvas layer. 

The library expects a canvas html element with certain properties, and exposes two primary methods: `createCanvasHelper` and `useCanvasHelper`.

At the moment, only one instance of `codethings-canvas-helper` can exist within a set of js modules.

# &lt;canvas&gt;
```html
<canvas 
  id="canvas"
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
required fields include: `id`, `width`, `height`, `rows`, `columns`.    
any other fields can be bound to the html element, or defined in `createCanvasHelper`


# useCanvasHelper
Exposes the properties of the gameHelper, including the custom settings packaged in `createCanvasHelper`.    

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
} = useCanvasHelper();
```

### screenSettings    
stores all config settings for the game

### mapCoordinates    
CRUD actions and other helpers to manage the status of all canvas grid coordinates.     
Each coordinate is an index that equals `rows*columns`.  TODO: remap `rows*columns` index to a `x:y` string, would simplify some of the coordinate calculations

### mapObservers    
helper methods to find coordinates on the map, with access to the `screenSettings` for the project 

### updateScreen    
calling `updateScreen()` executes redraw of canvas screen with whatever coordinates exist in `mapCoordinates`.     
Usually used once to redraw within an `requestAnimationFrame` callback.  

### resetGame    

internally resets `mapCoordiantes` and fires an optional `onReset` callback provided in the `createCanvasHelper` initializer

### someCustomHelper    
all other custom game helpers bound in `createCanvasHelper`



# createCanvasHelper
Initializes the library with the custom elements of the game. 

**note:** `createCanvasHelper()` must be initialized before `useCanvasHelper` gets called.  

```javascript
import { createCanvasHelper } from 'codethings-canvas-mapper'

export const STATUS = {
  active: 'active',
  visited: 'visited',
  ship: 'ship',
  defender: 'defender',
  defenderShot: 'defenderShot',
  invaderShot: 'invaderShot',
}

export const COLORS = {
  [STATUS.active]: '#fff',
  [STATUS.visited]: '#aaa',
  [STATUS.ship]: '#ff6',
  [STATUS.defender]: '#fff',
  [STATUS.defenderShot]: 'orange',
  [STATUS.invaderShot]: 'red',
  default: '#000'  // required
};

export function setupGame ({ containerId }) {
  createCanvasHelper({
    containerId, // id from html canvas element
    fillColors: COLORS, 
    bindCustomSettings,
    bindCustomHelpers,
    onReset
  });
}

// custom properties bound to the canvas element to keep everything in one place
// alternatively anything here could just be set directly 
function bindCustomSettings (canvas) { 
  const shipOffset = Number(canvas.getAttribute('shipOffset'));
  const shipColumns = Number(canvas.getAttribute('shipColumns'));
  const shipRows = Number(canvas.getAttribute('shipRows'));

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
// usually will want to make a state manager for the game status 
function bindCustomHelpers (initCanvasProps) {
  const { screenSettings, mapObservers } = initCanvasProps;
  const battleHelper = getBattleHelper({ screenSettings, mapObservers });
  return { battleHelper };
};

// on reset exposes all the properties of useCanvasHelper, 
// including any custom helpers that need to be reset when game restarts  
function onReset({ battleHelper }) {
  battleHelper.resetGame();
}
```
