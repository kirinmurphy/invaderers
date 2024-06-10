## initializeCanvas() returns
screenSettings: default map settings, extended by bindCustomSettings
mapCoordinates: coordinate helper to get/set values of game map 
mapObservers: helper methods to get relative coordinates of game map
updateScreen: redraws map with whatever properties in mapCoordinates 

### general idea:  
mapCoordinates can be updated by any part of the game 
updateScreen should be called once in a requestAnimationFrame loop 
whatever is in mapCoordinates will be drawn in that frame 

### extending:
**bindCustomSettings** 
passes the customGame sattings to the global screenSettings so they can be accessed from the same object with the default props (rows, columns, etc.)

**bindCustomHelpers**
allows you to pass other custom state closures or helper methods into init allowing you to access these properties from the same master screenHelper state 

**onReset** 
any cleanup from the custom helpers (incl clearing data) can be done in the onReset method 

```javascript
  const body = document.getElementById('body');
```